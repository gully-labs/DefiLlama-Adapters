<!-- gully-header:start -->
<p align="center">
  <a href="https://gullychain.xyz">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset=".github/assets/gullychain-badge-dark.png">
      <img alt="Powered by GullyChain" src=".github/assets/gullychain-badge-light.png" width="360" height="96">
    </picture>
  </a>
</p>

<p align="center"><b>The social chain where your profile is your wallet. Arbitrum Orbit L3, testnet chain 485590.</b></p>

<p align="center">DefiLlama TVL adapters, including the Gully Chain apps.</p>

<p align="center">
  <a href="https://gullychain.xyz"><img src="https://img.shields.io/badge/gullychain.xyz-01D9FA?style=for-the-badge&labelColor=000000&logo=googlechrome&logoColor=000000" alt="Website"></a>
  <a href="https://docs.gullychain.xyz"><img src="https://img.shields.io/badge/Docs-0A0F1A?style=for-the-badge&labelColor=000000&logo=readthedocs&logoColor=01D9FA" alt="Docs"></a>
  <a href="https://t.me/GullyChain"><img src="https://img.shields.io/badge/Telegram-0A0F1A?style=for-the-badge&labelColor=000000&logo=telegram&logoColor=26A5E4" alt="Telegram"></a>
  <a href="https://discord.com/invite/tY2ErsNNBp"><img src="https://img.shields.io/badge/Discord-0A0F1A?style=for-the-badge&labelColor=000000&logo=discord&logoColor=5865F2" alt="Discord"></a>
  <a href="https://x.com/Gully_Labs"><img src="https://img.shields.io/badge/@Gully__Labs-0A0F1A?style=for-the-badge&labelColor=000000&logo=x&logoColor=white" alt="X"></a>
</p>

<p align="center"><sub>A Gully Chain fork of <a href="https://github.com/DefiLlama/DefiLlama-Adapters">DefiLlama/DefiLlama-Adapters</a>, maintained by <a href="https://gullylabs.xyz">Gully Labs</a>. It is upstream publishes no licence file, so all rights stay with the upstream authors. The upstream README follows below as published. Not affiliated with or endorsed by DefiLlama.</sub></p>

---
<!-- gully-header:end -->

# Defillama Adapters

Follow [this guide](https://docs.llama.fi/submit-a-project) to create an adapter and submit a PR with it.

Also, don't hesitate to send a message on [our discord](https://discord.defillama.com/) if we're late to merge your PR.

> This repo is for **TVL** adapters.
> For other metrics such as `volume`, `fees`, `revenue`, `aggregators`, `open-interest`, `active-users`, etc. submit the PR to [DefiLlama/dimension-adapters](https://github.com/DefiLlama/dimension-adapters).

1. PLEASE PLEASE **enable "Allow edits by maintainers" while putting up the PR.**
2. Once your adapter has been merged, it takes time to show on the UI. No need to notify us on Discord.
3. TVL must be computed from blockchain data (reason: https://github.com/DefiLlama/DefiLlama-Adapters/discussions/432), if you have trouble with creating the adapter, please hop onto our discord, we are happy to assist you.
4. **For updating listing info** Please send a mail to metadata@defillama.com
5. Do not edit/push `pnpm-lock.yaml` or `pnpm-workspace.yaml` files as part of your changes, that messes up our CI.
6. No need to go to our discord and announce that you've created a PR, we monitor all PRs and will review it asap

## Getting listed

Please send answers to questions there https://github.com/DefiLlama/DefiLlama-Adapters/blob/main/pull_request_template.md when creating a PR.

## Agent skill

This repo includes an agent skill at `skills/adapter-author/` for AI-assisted DefiLlama TVL adapter authoring. It helps coding agents validate whether a request belongs in `DefiLlama-Adapters`, choose existing adapter patterns, implement TVL adapters in repo style, run `node test.js`, and prepare PR metadata. See `skills/adapter-author/SKILL.md` for usage.

## Work in progress

This is a work in progress. DefiLlama aims to be transparent, accurate, and open source.

If you have any suggestions, want to contribute or want to chat, please join [our discord](https://discord.defillama.com/) and drop a message.

## Testing adapters
```bash
node test.js projects/pangolin/index.js
# Add a timestamp at the end to run the adapter at a historical timestamp
node test.js projects/aave/v3.js 1729080692
# or using YYYY-MM-DD
node test.js projects/aave/v3.js 2024-10-16
```

## Changing RPC providers
If you want to change RPC providers because you need archive node access or because the default ones don't work well enough you can do so by creating an `.env` file and filling it with the env variables to overwrite:
```
ETHEREUM_RPC="..."
BSC_RPC="..."
POLYGON_RPC="..."
```

The name of each rpc is `{CHAIN-NAME}_RPC`, and the name we use for each chain can be found [here](https://unpkg.com/@defillama/sdk@latest/build/providers.json). If you run into issues with a chain make sure to update the sdk with `npm update @defillama/sdk`.

## Adapter rules
- Never add extra npm packages, if you need a chain-level package for your chain, ask us, and we'll consider it, but we can't accept any npm package that is project-specific


<!-- gully-footer:start -->
---

<p align="center">
  <a href="https://gullylabs.xyz">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset=".github/assets/powered-by-gully-labs-dark-2x.png">
      <img alt="Powered by Gully Labs" src=".github/assets/powered-by-gully-labs-light-2x.png" width="254" height="64">
    </picture>
  </a>
</p>
<!-- gully-footer:end -->
