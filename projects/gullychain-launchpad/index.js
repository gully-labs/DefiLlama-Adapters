const { nullAddress } = require("../helper/tokenMapping");
const { sumTokens2 } = require("../helper/unwrapLPs");

// Gully Launchpad on Gully Chain (Arbitrum Orbit L3, chain id 485590): pump.fun-style bonding curves with virtual
// reserves. A token trades against its curve until it has raised `graduationEth`; the raised ETH and the reserved
// tokens then move into a Uniswap v3 pool (1% tier) on the chain's own Uniswap v3 deployment, whose LP NFT is held
// forever by a GullyLPLocker (v1.0 burned it). Every deployment is listed with its deploy block in
// gully-ops/l3/generated/launchpad.json and on https://docs.gullychain.xyz/contracts/
const LAUNCHPADS = [
  "0xCe2c3Ac523EfF3Bec8D3894f7e5C5F519638326b", // GullyLaunchpad v2.1, block 100 (new launches)
  "0x3378b659f6ddA7F13D87599B383b3995f82D0974", // GullyLaunchpad v2.0, block 61
  "0x89350b316cF592813FCcB8719AA275E776501aCa", // GullyLaunchpad v1.0, block 56
];

async function tvl(api) {
  // The launchpad holds the real ETH of every curve that has not graduated yet, plus the 1% trade fees the treasury
  // has not claimed yet (feesAccrued). The fees belong to the protocol, so they are taken out of the TVL.
  const feesAccrued = await api.multiCall({ abi: "uint256:feesAccrued", calls: LAUNCHPADS });
  await api.sumTokens({ owners: LAUNCHPADS, tokens: [nullAddress] });
  const totalFees = feesAccrued.reduce((sum, fee) => sum + BigInt(fee), 0n);
  if (totalFees > 0n) api.add(nullAddress, (-totalFees).toString());
  return sumTokens2({ api }); // applies the chain's token mapping (ETH is priced as ethereum)
}

module.exports = {
  methodology:
    "ETH held by every GullyLaunchpad deployment on Gully Chain: the real ETH reserve of each bonding curve that has not graduated yet, minus the accrued 1% trade fees that belong to the treasury. Once a curve graduates, its ETH and tokens become liquidity of a Uniswap v3 pool on Gully Swap (counted by the gully-swap adapter), so they are not counted here again.",
  start: "2026-10-25",
  gullychain: { tvl },
};
