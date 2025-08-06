import { AIService } from '@/lib/ai/service';
import { GitClient } from '@/lib/git';
import { Data, Effect } from 'effect';

export class EmptyDiff extends Data.TaggedError('EmptyDiff')<{
  cause: Error;
}> {}

export const generateCommitMessageFromDiff = Effect.fn(function* () {
  const github = yield* GitClient;
  const ai = yield* AIService;

  const diff = yield* github.getStagedDiff();

  if (!diff)
    return yield* new EmptyDiff({
      cause: {
        name: 'EmptyDiff',
        message: 'No diff found. Please commit your changes first.',
      },
    });
  const generatedCommitMessage = yield* ai.generateCommitMessage(diff);

  return generatedCommitMessage;
});

export const applyCommitMessage = Effect.fn(function* (message: string) {
  const github = yield* GitClient;

  yield* github.commit(message);
});
