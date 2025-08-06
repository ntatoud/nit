import { Command, CommandExecutor } from '@effect/platform';
import { NodeContext } from '@effect/platform-node';
import { Data, Effect } from 'effect';

export class CouldNotGetDiff extends Data.TaggedError('CouldNotGetDiff')<{
  cause: Error;
}> {}

export class CouldNotCommit extends Data.TaggedError('CouldNotCommit')<{
  exitCode: CommandExecutor.ExitCode;
}> {}

export class GitClient extends Effect.Service<GitClient>()('GitClient', {
  dependencies: [NodeContext.layer],
  effect: Effect.gen(function* () {
    const executor = yield* CommandExecutor.CommandExecutor;

    return {
      getStagedDiff: Effect.fn('getStagedDiff')(function* () {
        const getDiffCommand = Command.make('git', 'diff', '--staged');

        const diff = yield* executor
          .string(getDiffCommand)
          .pipe(Effect.mapError((e) => new CouldNotGetDiff({ cause: e })));

        return diff.trim();
      }),

      commit: Effect.fn('commit')(function* (message: string) {
        const commitCommand = Command.make('git', 'commit', '-m', message);

        const exitCode = yield* executor.exitCode(commitCommand);

        if (exitCode !== 0) {
          return yield* Effect.fail(new CouldNotCommit({ exitCode }));
        }
      }),
    };
  }),
}) {}
