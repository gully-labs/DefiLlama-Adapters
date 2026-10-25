const { uniV3Export } = require("../helper/uniswapV3");

// Gully Swap is the Uniswap v3 deployment of Gully Chain (Arbitrum Orbit L3, chain id 485590), deployed with
// Uniswap's own deploy-v3 tool. GullyFeeController owns the factory and GullySwapRouter is the app's router; neither
// holds liquidity, so TVL is the standard "every pool of the factory" sum.
// Factory and deploy block: gully-ops/l3/generated/uniswap-v3.json, https://docs.gullychain.xyz/contracts/
module.exports = {
  methodology:
    "Token balances of every pool created by the UniswapV3Factory on Gully Chain (PoolCreated events), including the graduated Gully Launchpad pools whose LP NFTs are locked in a GullyLPLocker.",
  start: "2026-10-25",
  ...uniV3Export({
    gullychain: { factory: "0x1787a3bA8C8D7a2439cfA2EFaFc683ECAC623950", fromBlock: 22 },
  }),
};
