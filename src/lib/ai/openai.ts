import { Env } from '@/env';
import {
  CouldNotGetAIProviderResponse,
  EMPTY_RESPONSE_CONTENT,
} from '@/lib/ai/provider';
import { Effect } from 'effect';
import { OpenAI } from 'openai';

const PREFERED_MODEL = 'gpt-4o-mini';

export class OpenAIService extends Effect.Service<OpenAIService>()(
  'OpenAIService',
  {
    dependencies: [Env.Default],
    effect: Effect.gen(function* () {
      const env = yield* Env;

      const openaiClient = new OpenAI({
        apiKey: env.OPENAI_API_KEY,
      });

      return {
        ...openaiClient,
        ask: Effect.fn(function* (content: string) {
          const response = yield* Effect.tryPromise(async () => {
            return openaiClient.chat.completions.create({
              model: PREFERED_MODEL,
              messages: [{ role: 'user', content }],
            });
          }).pipe(
            Effect.mapError((e) => {
              return new CouldNotGetAIProviderResponse({
                provider: 'openai',
                cause: e,
              });
            })
          );

          if (!response.choices[0]?.message?.content) {
            return yield* Effect.fail(
              new CouldNotGetAIProviderResponse({
                provider: 'openai',
                cause: EMPTY_RESPONSE_CONTENT,
              })
            );
          }
          return response.choices[0]?.message?.content
            ?.trim()
            .replaceAll('`', '');
        }),
      };
    }),
  }
) {}
