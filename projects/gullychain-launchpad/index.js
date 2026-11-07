const { nullAddress } = require("../helper/tokenMapping");
const { sumTokens2 } = require("../helper/unwrapLPs");

// Gully Launchpad on Gully Chain (Arbitrum Orbit L3 by Gully Labs): bonding curves with virtual reserves. A token trades
// against its curve until it has raised `graduationEth`; the raised ETH and the reserved tokens then move into a
// Uniswap v3 pool (1% tier) on Gully Swap, whose LP NFT is held forever by a GullyLPLocker. v3 adds fair launches: a
// batch auction (GullyFairLaunch) collects ETH commitments and buys on the curve at one clearing price.
// Addresses: https://docs.gullychain.xyz/contracts/
const { gullychain: config } = require("./config");

async function tvl(api) {
  const { launchpads, fairLaunches } = config;
  // Every launchpad holds the real ETH of each curve that has not graduated, plus the 1% trade fees the treasury has
  // not claimed yet (feesAccrued). The fees belong to the protocol, so they are taken out.
  const feesAccrued = await api.multiCall({ abi: "uint256:feesAccrued", calls: launchpads });
  // GullyFairLaunch holds the ETH committed to auctions that have not cleared yet and the refunds owed to committers
  // after clearing (totalOwedEth). Both are user deposits, so its whole ETH balance counts.
  await api.sumTokens({ owners: [...launchpads, ...fairLaunches], tokens: [nullAddress] });
  const totalFees = feesAccrued.reduce((sum, fee) => sum + BigInt(fee), 0n);
  if (totalFees > 0n) api.add(nullAddress, (-totalFees).toString());
  return sumTokens2({ api }); // applies the chain's token mapping (ETH is priced as ethereum)
}

module.exports = {
  methodology:
    "ETH held by every Gully Launchpad deployment on Gully Chain (the real ETH reserve of each bonding curve that has not graduated yet, minus the accrued 1% trade fees that belong to the treasury) plus the ETH committed to fair-launch auctions that have not settled. Once a curve graduates, its ETH and tokens become liquidity of a Uniswap v3 pool on Gully Swap (counted by the gully-swap adapter), so they are not counted here again.",
  ...(config ? { start: config.start, gullychain: { tvl } } : {}),
};
