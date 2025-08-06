import { Context, Data, Effect } from 'effect';

type AllowedAIProvider = 'openai';

export class CouldNotGetAIProviderResponse extends Data.TaggedError(
  'CouldNotGetAIProviderResponse'
)<{
  provider: AllowedAIProvider;
  cause: Error;
}> {}

export const EMPTY_RESPONSE_CONTENT: Error = {
  name: 'empty',
  message: 'The received response is empty',
};
export class AIProvider extends Context.Tag('MyRandomService')<
  AIProvider,
  {
    readonly ask: (
      content: string
    ) => Effect.Effect<string, CouldNotGetAIProviderResponse, never>;
  }
>() {}
