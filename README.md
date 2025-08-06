# nit - AI Powered Git assistant

## Usage
To have a list of all available commands, you can run 
```sh
nit --help
```

## 🚧 Install from npm registry (SOON)

## Install by cloning the repository (Temporary)
### Installation
```sh
git clone git@github.com:ntatoud/nit.git
cd nit
pnpm i
pnpm run build
pnpm link -g
```

### Configuration
This tool requires a Google AI API key to function. You must set the GOOGLE_AI_API_KEY environment variable for the application to work.

You can export the variable in your shell. Note that this is not the most secure method for long-term use.

```
export OPENAI_API_KEY="your-api-key-here"
```
To make it persist between sessions, you can add this line to your shell's configuration file (e.g., ~/.zshrc, ~/.bashrc).

_Recommended: Using a Secret Manager_

For better security, it is highly recommended to use a secret manager to handle your API key. This prevents storing secrets in plain text.

The application will automatically read the environment variable if it's provided by a secret manager's CLI.

#### Example with Bitwarden CLI:

The `bw run` command injects the secret into the command's environment
```
bw run -- nit commit
```
#### Example with Doppler:
The `doppler run` command works similarly
```
doppler run -- nit commit
```
Using this wrapper pattern is the most secure way to provide credentials to the application.