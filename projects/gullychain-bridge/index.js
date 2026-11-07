const { sumTokens2, nullAddress } = require("../helper/unwrapLPs");
const { getLogs2 } = require("../helper/cache/getLogs");
const { arbitrum: config } = require("./config");

// Gully Chain's canonical bridge: the Arbitrum Nitro Bridge and token gateways on the parent chain, Arbitrum One. ETH of
// the chain sits in the Bridge (the WETH gateway unwraps into it); ERC-20s sit in the gateway they were deposited through;
// USDC backing USDC.e sits in the L1 USDC gateway. The token list comes from each gateway's own deposits.
const DEPOSIT_INITIATED =
  "event DepositInitiated(address l1Token, address indexed _from, address indexed _to, uint256 indexed _sequenceNumber, uint256 _amount)";

async function tvl(api) {
  const { bridge, gateways, usdcGateway, usdc, fromBlock } = config;
  const ownerTokens = [[[nullAddress], bridge]];
  for (const gateway of gateways) {
    const logs = await getLogs2({ api, target: gateway, fromBlock, eventAbi: DEPOSIT_INITIATED });
    const tokens = [...new Set(logs.map((log) => log.l1Token.toLowerCase()))];
    if (tokens.length) ownerTokens.push([tokens, gateway]);
  }
  ownerTokens.push([[usdc], usdcGateway]);
  return sumTokens2({ api, ownerTokens, permitFailure: true });
}

module.exports = {
  methodology:
    "ETH held by the Gully Chain Bridge contract on Arbitrum One, ERC-20s held by the chain's token gateways (every token deposited through them), and USDC held by the L1 USDC gateway behind USDC.e.",
  ...(config ? { start: config.start, arbitrum: { tvl } } : {}),
};
