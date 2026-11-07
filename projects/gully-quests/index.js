const { sumTokens2 } = require("../helper/unwrapLPs");
const { getLogs2 } = require("../helper/cache/getLogs");
const config = require("./config");

// Gully Quests: on-chain quests with escrowed rewards. QuestEscrow holds every quest's reward pool, ETH or an ERC-20, and
// can only pay a reward, refund the creator or pay out a failed push. The 5% platform fee goes to the treasury at funding
// and never enters the pool, so everything the escrow holds belongs to quest creators and their players.
const DEPOSITED =
  "event Deposited(uint256 indexed questId, address indexed from, address indexed asset, uint256 gross, uint256 fee, uint256 net)";

async function tvl(api) {
  const { escrow, fromBlock } = config[api.chain];
  const logs = await getLogs2({ api, target: escrow, fromBlock, eventAbi: DEPOSITED });
  const tokens = [...new Set(logs.map((log) => log.asset.toLowerCase()))];
  return sumTokens2({ api, owner: escrow, tokens, permitFailure: true });
}

module.exports = {
  methodology:
    "Quest reward pools: the QuestEscrow contract's balance of every asset ever deposited into a quest. The platform fee is sent to the treasury at funding and is not in the escrow.",
};

for (const [chain, { start }] of Object.entries(config)) module.exports[chain] = { tvl, start };
