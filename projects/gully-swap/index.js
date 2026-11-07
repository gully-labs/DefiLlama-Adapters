const { uniV3Export } = require("../helper/uniswapV3");
const { gullychain } = require("./config");

// Gully Swap is the Uniswap v3 deployment of Gully Chain (Arbitrum Orbit L3 by Gully Labs, settling to Arbitrum One),
// deployed with Uniswap's own deploy-v3 tool. The GullySwapRouter (the app's router) and the fee controller hold no
// liquidity, so TVL is the standard "every pool of the factory" sum.
// Addresses: https://docs.gullychain.xyz/contracts/
module.exports = {
  methodology:
    "Token balances of every pool created by the UniswapV3Factory on Gully Chain (PoolCreated events).",
  ...(gullychain ? { start: gullychain.start, ...uniV3Export({ gullychain }) } : {}),
};
