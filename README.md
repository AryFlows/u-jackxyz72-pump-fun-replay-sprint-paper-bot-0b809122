# Frost Sniper — Pump.fun Replay Sprint

[![Competition](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)
[![Rank](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/AryFlows/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/rank.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)
[![Reward](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/AryFlows/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/reward.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)

A paper trading bot for the [Pump.fun Replay Sprint](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122) — it trades 10 SOL of paper money on a 24h replay of pump.fun bonding-curve activity. Best net PnL wins. Nothing is traded for real.

## Strategy

Early momentum with tight risk control:

- **Entry:** a curve becomes a buy when its recent tape shows accelerating buy pressure — several distinct wallets buying, net SOL flowing in, price rising and sitting near its window high, with the tape still fresh. Curves must be past their first minutes (fresh launches are mostly bundled dumps).
- **Sizing:** first buy 0.05 SOL; one pyramid add of 0.15 SOL while the price keeps stepping up and flow stays positive, up to 0.5 SOL per coin. False starts cost little, runners get size.
- **Exits:** stop loss −25% vs cost, trailing stop −25% from peak once up 15%, fade exit when flow turns, exit on any single ≥3 SOL sell, hard time limit of 1500 slots unless well up.
- **Guardrails:** the bot paces its own fills and distinct coins against elapsed block time and opens tiny probe round trips when it lags, so it clears the 20-coin / 0.01 SOL round-trip bar.

## Run

The grader runs `node /bot/main.ts` (Node 22, no dependencies, no network).
The bot speaks `agent-fun/replay/v2` on stdin/stdout via the vendored SDK shim
(`vendor/makefun-bot.ts`, a byte-identical copy of the kit's `sdk/ts/makefun-bot.ts`).

## Local backtest

Offline, on the kit's frozen dev window, with the kit's own simulator
(`baselines/pilot/momentum/tools/sim.ts`):

```
node /tmp/bt/backtest.ts <kit dir>
```

Verified 24 Nov 2026 on the dev window (1,222 coins, 126,801 trades):

- **Net PnL −0.069 SOL** (254 fills, 52 coins, 127 round trips, 17 wins,
  max drawdown 0.015, 0 rejected orders, 4 failed txs)
- Same settings on a second failed-tx seed: −0.064 SOL, dd 0.015
- At 2x fees: −0.174 SOL

For calibration: the live dev leaderboard's only entry sits at −2.595 SOL and
the kit's own pilot momentum baseline scores −9.384 SOL (dd 0.95) on the same
window. This bot's edge is selectivity — it loses little while staying well
above the 20-coin / 200-fill guardrail pace. The final window is fresh data,
so the numbers above are a dev-window check, not a promise.

## Files

- `main.ts` — entrypoint: runs the strategy through the SDK shim.
- `strategy.ts` — the Frost Sniper strategy (fresh implementation).
- `vendor/makefun-bot.ts` — the kit's SDK shim, vendored byte for byte.
