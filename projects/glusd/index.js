const ADDRESSES = require("../helper/coreAssets.json");
const { sumTokens2 } = require("../helper/unwrapLPs");

// glUSD (Gully USD) on Gully Chain (Arbitrum Orbit L3, chain id 485590) is minted 1:1 against bridged USDC (USDC.e)
// by the GlUSDPsm, the only contract that can mint or burn it. The PSM always holds at least as much USDC.e as the
// glUSD in circulation plus the mint/redeem fees it has collected (0 bps today, capped at 50 bps).
// https://docs.gullychain.xyz/stablecoins/ and gully-ops/l3/generated/glusd.json
const PSM = "0xe1Ae51036ede1b244c532A81FaC196f19fa5E28e";
const USDC_E = ADDRESSES.gullychain.USDC_e;

async function tvl(api) {
  const [reserve, accruedFees] = await Promise.all([
    api.call({ abi: "erc20:balanceOf", target: USDC_E, params: PSM }),
    api.call({ abi: "uint256:accruedFees", target: PSM }),
  ]);
  // the collected fees sit in the same USDC.e balance but belong to the treasury, not to glUSD holders
  api.add(USDC_E, (BigInt(reserve) - BigInt(accruedFees)).toString());
  return sumTokens2({ api }); // applies the chain's token mapping (USDC.e is priced as usd-coin)
}

module.exports = {
  methodology:
    "USDC.e held by the glUSD peg stability module (the 1:1 reserve backing every glUSD in circulation), minus the mint/redeem fees it has collected for the treasury.",
  start: "2026-10-25",
  gullychain: { tvl },
};
