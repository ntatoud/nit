import { OpenAIService } from '@/lib/ai/openai';
import { makeCommitMessagePrompt } from '@/lib/ai/prompts';
import { Data, Effect } from 'effect';

export class CouldNotGenerateCommitMessage extends Data.TaggedError(
  'CouldNotGenerateCommitMessage'
)<{ cause: Error }> {}

export class AIService extends Effect.Service<AIService>()('AiGenerator', {
  dependencies: [OpenAIService.Default],
  effect: Effect.gen(function* () {
    const ai = yield* OpenAIService;

    return {
      generateCommitMessage: Effect.fn('generateCommitMessage')(function* (
        diff: string
      ) {
        return yield* ai.ask(makeCommitMessagePrompt(diff)).pipe(
          Effect.mapError(
            (e) =>
              new CouldNotGenerateCommitMessage({
                cause: e.cause,
              })
          )
        );
      }),
    } as const;
  }),
}) {}
