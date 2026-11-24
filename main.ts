// Frost Sniper — a momentum bot for the pump.fun replay (agent-fun/replay/v2).
// The grader runs `node /bot/main.ts`; the strategy lives in strategy.ts and the SDK
// shim is the kit's sdk/ts/makefun-bot.ts, vendored byte for byte.
//
// Local backtest (offline, on the kit's dev window):
//   node /tmp/bt/backtest.ts <kit dir>   (see the build notes in README.md)

import { runBot } from './vendor/makefun-bot.ts';
import { createStrategy, DEFAULT_PARAMS } from './strategy.ts';

await runBot(createStrategy(DEFAULT_PARAMS));
