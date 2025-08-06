import path from 'node:path';
import {
  applyCommitMessage,
  generateCommitMessageFromDiff,
} from '@/features/git/commit';
import { AIService } from '@/lib/ai/service';
import { GitClient } from '@/lib/git';
import { Command, Prompt } from '@effect/cli';
import { NodeContext, NodeRuntime } from '@effect/platform-node';
import { config } from 'dotenv';
import { ConfigProvider, Effect, Layer } from 'effect';

config({
  path: path.resolve(import.meta.dirname, '../../.env'),
});

const MainCommand = Command.make('nit').pipe(
  Command.withSubcommands([
    Command.make(
      'commit',
      {},
      Effect.fn(function* () {
        const generatedCommitMessage = yield* generateCommitMessageFromDiff();

        yield* Effect.logInfo(generatedCommitMessage);

        const isOkay = yield* Prompt.confirm({
          message: 'Is this okay ?',
        });

        if (!isOkay) {
          return yield* Effect.log('Aborted.');
        }

        yield* applyCommitMessage(generatedCommitMessage);
      })
    ),
  ])
);

const cli = Command.run(MainCommand, {
  name: 'NT Git Assistant',
  version: 'v1.0.0',
  executable: 'nit',
});

const MainLayer = Layer.mergeAll(
  AIService.Default,
  GitClient.Default,
  NodeContext.layer
);

cli(process.argv).pipe(
  Effect.withConfigProvider(ConfigProvider.fromEnv()),
  Effect.provide(MainLayer),
  NodeRuntime.runMain
);
