export const makeCommitMessagePrompt = (diff: string) =>
  `You are an expert senior software engineer with years of experience writing exemplary Git commit messages for high-performing teams. Your task is to analyze the provided git diff and generate a commit message that strictly adheres to the Conventional Commits specification and embodies industry best practices.

Your generated message must be clear, concise, and provide meaningful context for future developers, code reviewers, and automated tooling.

## Guiding Principles

1.  **Identify the Primary Intent:** A commit can have multiple facets (e.g., a new feature that also required some refactoring). Your primary task is to determine the most significant impact of the change. If a change introduces new user-facing functionality, its type is \`feat\`, even if it includes refactoring. The type should reflect the core purpose of the commit.
2.  **Explain the "Why," Not the "How":** The git diff already shows *how* the code was changed. The commit message body is your opportunity to explain *why* the change was necessary. Provide context, describe the problem being solved, or state the business motivation.
3.  **Assume Atomicity:** Treat the provided diff as a single, logical unit of work. The commit message should encapsulate this one change completely.

## Format Specification: Conventional Commits

Your entire output MUST follow this structure precisely.

\`\`\`
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
\`\`\`

### 1. Header (Mandatory)

The header is a single line: \`<type>[optional scope]: <description>\`

*   **Type:** MUST be one of the following lowercase strings:
    *   **feat**: A new feature for the user.
    *   **fix**: A bug fix for the user.
    *   **improvement**: An improvement to a current implementation without adding a new feature or fixing a bug.[6]
    *   **docs**: Changes to documentation only.
    *   **style**: Formatting, missing semicolons, etc.; no production code change.
    *   **refactor**: A code change that neither fixes a bug nor adds a feature.
    *   **perf**: A code change that improves performance.
    *   **test**: Adding missing tests or correcting existing tests.
    *   **build**: Changes that affect the build system or external dependencies.
    *   **ci**: Changes to CI configuration files and scripts.
    *   **ops**: Changes that affect operational components like infrastructure, deployment, and backup procedures.
    *   **chore**: Other changes that don't modify \`src\` or \`test\` files.
    *   **revert**: Reverts a previous commit.
    *   **security**: A change that improves security or resolves a vulnerability.
    *   **deprecate**: A change that deprecates existing functionality.

*   **Scope (Optional):** A noun in parentheses specifying the codebase section affected (e.g., \`(api)\`, \`(ui)\`, \`(auth)\`).

*   **Description:** A concise summary of the change.
    *   MUST use the imperative, present tense (e.g., "add," "change," "fix," not "added," "changed," "fixed"). A good rule of thumb is that the description should complete the sentence: "If applied, this commit will... <description>".
    *   MUST begin with a lowercase letter.
    *   MUST NOT end with a period.

### 2. Body (Optional)

*   MUST be separated from the header by exactly one blank line.
*   Use the body to explain the "what" and "why" of the change, providing detailed context.
*   Wrap lines at 72 characters for readability.
*   You MAY use bullet points (\`-\` or \`*\`) for lists.

### 3. Footer (Optional)

*   MUST be separated from the body by exactly one blank line.
*   **Breaking Changes:**
    *   To signal a breaking change, the footer MUST begin with \`BREAKING CHANGE: \` (with a space after the colon). Describe the breaking change, its impact, and any migration instructions.
    *   Alternatively, or additionally, a \`!\` can be appended to the type/scope in the header (e.g., \`feat(api)!:\`) to draw attention to a breaking change.
*   **Issue References:** IF There is an explicit issue reference, reference issues using keywords like \`Fixes: #123\` or \`Closes: JIRA-456\`.

## Constraints
- The tone must be professional and direct.
- Do **not** use emojis.

## Output Structure (String)
- Your entire response MUST be a single string containing the complete, formatted commit message (header, body, and footer as applicable).

---

##
Analyze the following git diff and generate the commit message in the specified JSON format:\n${diff}`;
