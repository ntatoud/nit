import { Config, Effect } from 'effect';

export class Env extends Effect.Service<Env>()('Env', {
  effect: Effect.gen(function* () {
    const OPENAI_API_KEY = yield* Config.string('OPENAI_API_KEY');

    return {
      OPENAI_API_KEY,
    } as const;
  }),
}) {}
