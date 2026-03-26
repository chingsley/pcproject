# AI Chat Interface

A modern web desktop AI chat interface built with React, TypeScript, and Redux. Features a ChatGPT/Gemini-style layout with a toggleable sidebar and responsive design.

## Features

- **Persuasive & Gamification Design:** Prompt scoring, engagement options (Summarize, Quiz), Copy/Share friction, points system, and stars. See [Persuasive & Gamification Design](#persuasive--gamification-design) for details.
- **Operant conditioning (output delay):** After a configurable number of **passive** (0-point) main replies within a time window, further passive replies show a timed delay loader before the assistant text appears—without letting users “reset” the limit by sending a high-scoring prompt. See [Operant conditioning (output delay loader)](#operant-conditioning-output-delay-loader).
- **Modern Tech Stack:** React 18, TypeScript, Vite, Redux Toolkit
- **Styled Components:** CSS-in-JS with constants-based design system
- **Responsive Layout:** Toggleable sidebar with smooth animations
- **Type-Safe:** Full TypeScript support with typed Redux hooks
- **Code Quality:** ESLint and Prettier configured and integrated
- **Fast Development:** Vite for instant HMR and optimized builds
- **Production Ready:** Vercel deployment configuration included

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository (if applicable)
git clone <your-repo-url>

# Navigate to project directory
cd pcproject

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5173/
```

### Demo Mode (No API Setup Needed)

Use this mode when you want to run a full product walkthrough with pre-written demo responses (no real AI API calls).

#### What Demo Mode does

- Uses built-in scripted data instead of live model calls
- Lets you demo prompt scoring and engagement scoring reliably
- Works without configuring model API keys

#### Step-by-step (beginner friendly)

1. Open your project folder in Cursor (or your terminal).
2. Open a terminal in the project root (`pcproject`).
3. Install dependencies (only needed once):

```bash
npm install
```

1. Start demo mode:

```bash
npm run demo
```

1. When you see a local URL (usually `http://localhost:5173`), open it in your browser.
2. Use the exact demo prompts from:

- `src/data/demo/DEMO_DATA.md`

#### Important

- Use the prompts exactly as written in `src/data/demo/DEMO_DATA.md` for best results.
- If you run normal dev mode (`npm run dev`), demo mapping is not guaranteed unless the provider is set to simulation.

#### Stop demo mode

- In the terminal, press `Ctrl + C`.

### Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Run linter
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting
npm run format:check
```

## Project Structure

```
pcproject/
├── src/
│   ├── components/          # React components
│   │   └── Layout/          # Layout components
│   │       ├── Layout.tsx
│   │       ├── Sidebar/     # Sidebar components
│   │       └── MainView/    # Main content area
│   ├── constants/           # Design tokens and constants
│   │   ├── colors.constants.ts
│   │   ├── engagement.constants.ts  # UI behavior: engagement feature
│   │   ├── operant.constants.ts     # Passive output delay / operant loader
│   │   └── fonts.constants.ts
│   ├── store/              # Redux store
│   │   ├── index.ts        # Store configuration
│   │   ├── hooks.ts        # Typed Redux hooks
│   │   └── slices/         # Redux slices
│   │       └── uiSlice.ts  # UI state management
│   ├── App.tsx             # Root component
│   ├── main.tsx            # App entry point
│   └── GlobalStyles.ts     # Global CSS styles
├── .prettierrc             # Prettier configuration
├── .prettierignore         # Prettier ignore file
├── eslint.config.js        # ESLint configuration
├── vercel.json            # Vercel deployment config
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── PLAN.md                # Development plan
└── README.md              # This file
```

## Architecture

### Component Structure

The app follows a component-per-unit architecture where each UI element is a separate component:

- **Layout:** Main wrapper that orchestrates sidebar and main view
- **Sidebar:** Left panel with toggle functionality and smooth animations
- **SidebarToggle:** Button component for toggling sidebar visibility
- **MainView:** Main content area with responsive margins; hosts the right **agent panel** (`RightAgentPanel`, full-height slide-in rail)

### State Management

Redux Toolkit is used for global state management:

- **UI Slice:** Manages sidebar open/closed state and the right collapsible agent panel (`rightPanelOpen` via `toggleRightPanel` / `setRightPanelOpen`), which includes the inline leaderboard. Panel width: `LAYOUT.RIGHT_PANEL_WIDTH` in `layout.constants.ts`. Also stores **`passiveZeroPromptQuota`** (global operant delay window + count for 0-point main replies).
- **Typed Hooks:** Custom hooks (`useAppDispatch`, `useAppSelector`) for type-safe Redux usage

### Styling

styled-components with a constants-based design system:

- All colors defined in `colors.constants.ts`
- All fonts defined in `fonts.constants.ts`
- No magic strings or hardcoded values in components
- Global styles applied via styled-components

## Persuasive & Gamification Design

The app uses persuasive computing and gamification to encourage deeper learning and critical thinking when interacting with AI.

### Persuasive Components

| Component                       | How it works                                                                                                                                                                                                               |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prompt scoring (0–5 points)** | Prompts are scored by how active they are. Passive prompts (e.g. "write for me") earn 0; active prompts (e.g. "critique my draft") earn 4–5. This nudges users toward reflective, critical prompts.                        |
| **Engagement options**          | After AI responses, users can **Summarize** or **Ask Questions** (quiz). Summaries are scored 0–4 by quality (paraphrasing vs. near-copy). The quiz awards bonus points only if all answers are correct.                   |
| **Feedback**                    | Category-specific feedback (e.g. "Add your own view and ask for critique") guides users toward better prompts and deeper engagement.                                                                                       |
| **Friction (Copy/Share)**       | Copy and Share buttons are disabled on AI messages that qualify for engagement. They unlock only after the user answers all 3 quiz questions correctly. Clicking Copy or Share when disabled opens the quiz panel instead. |
| **Operant output delay**        | For **main** chat sends only (not engagement evaluations), when the user exceeds a **global** quota of passive (0-point) replies inside a rolling time window, the assistant reply is held behind a **delay loader** for a fixed duration. Higher-point replies do **not** reset the quota—closing the loophole of saving one strong prompt to repeatedly clear the limit. |

### Points System

Points come from assistant messages and are summed across all chats:

- **Prompt scoring:** 0–5 points based on prompt quality (passive → active).
- **Summarize engagement:** 0–4 points based on summary quality (near-copy → strong synthesis).
- **Quiz bonus:** 5 points if all 3 questions correct; 0 otherwise.

Total points = sum of all `promptPoint` values from assistant messages.

### Stars & Progress

- **Stars:** Earned at 100 points each (first star at 100, second at 200, third at 300, etc.). Configurable via `POINTS_PER_STAR` in `src/utils/gamePoints.ts`.
- **Points ring:** Shows progress toward the next star (0–100%).
- **Motivating message:** "You are X points away from earning your first/next star."

## Engagement Constants

UI behavior for the "Engage for bonus points" feature is controlled by constants in:

**Location:** `src/constants/engagement.constants.ts`

| Variable                                           | Purpose                                                                                                                                              | How to use                                                                              |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `ALLOW_ENGAGEMENT_ON_PREVIOUS_MESSAGES`            | When `false`, only the last assistant message shows engagement options. When `true`, all assistant messages (except engagement responses) show them. | Set to `true` to allow engagement on older messages.                                    |
| `MIN_AI_RESPONSE_CHAR_LENGTH_FOR_ENGAGEMENT_BONUS` | Minimum character length for an assistant response to show engagement options. Short replies (e.g. "Hello, how can I help you today") are excluded.  | Increase to hide engagement on shorter responses; decrease to allow it on shorter ones. |
| `MIN_SENTENCES_FOR_ENGAGEMENT`                     | Minimum number of sentences required. One-sentence definitions or greetings are excluded from engagement.                                            | Increase to require longer responses; decrease to allow shorter ones.                   |
| `SIMPLE_GREETING_PATTERNS`                         | Regex patterns that indicate trivial responses (e.g. "Hello", "Hi there"). Matching responses never show engagement.                                 | Edit the array to add or remove greeting patterns.                                      |
| `QUIZ_BONUS_POINTS`                                | Bonus points awarded when user answers all quiz questions correctly (all-or-nothing).                                                                | Change to adjust the quiz completion reward (e.g. 3, 5, 10).                            |

**Note:** Engagement responses (evaluations of user engagement) never show engagement options, regardless of these settings. The "Ask Questions" option shows a multiple-choice quiz for bonus points.

## Operant conditioning (output delay loader)

This feature applies **operant-style** feedback: passive prompts are still allowed, but relying on them too often within a period introduces **friction** (a visible countdown / loader) before the model output is shown.

### Behavior

- **Scope:** Only **main** `sendMessage` assistant replies with **0 points** (passive). It does **not** apply to engagement follow-ups (`isEngagementResponse`) or to scores 1–5.
- **Global quota:** The limit is tracked **once for the whole app**, not per chat—switching threads does not grant extra “free” passive replies.
- **Window + quota:** Within a rolling window (default **24 hours**), the first **3** passive main replies appear **without** the delay. Every **additional** passive reply in that same window shows the delay loader until the window resets.
- **No reset loophole:** Sending a 1- or 2+ point prompt does **not** reset the window or the passive counter. Only **time** starts a fresh window (when the previous window’s start time is older than the configured duration).
- **Which message shows the loader:** Each assistant message stores `applyOperantDelay` at **send time**, so only the **current** reply is affected—older bubbles in the thread do not suddenly gain the loader when the quota is exceeded.

### Configuration

**Location:** `src/constants/operant.constants.ts`

| Variable                               | Purpose                                                                                                                                 | Typical tuning                                                                 |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `PASSIVE_PROMPT_OUTPUT_DELAY_MS_POINT_0` | How long (ms) the loader runs before revealing text when a reply **qualifies** for the delay.                                           | Increase for stronger friction; decrease for a lighter nudge.                  |
| `PASSIVE_ZERO_PROMPT_QUOTA_WINDOW_MS`  | Length of the rolling quota window (ms). After this duration from `windowStartMs`, the next passive reply starts a **new** window.       | Default aligns with a 24-hour cycle; shorten for testing.                      |
| `PASSIVE_ZERO_PROMPT_QUOTA_PER_WINDOW` | How many **0-point** main replies in the current window are allowed **without** the delay; the next passive reply in-window shows it.      | Default **3**; lower to tighten behavior; raise to allow more passive prompts. |

**State:** Redux `ui.passiveZeroPromptQuota` holds `{ windowStartMs, zeroPointCountInWindow }`. Logic lives in `src/utils/operantDelayState.ts`; the UI uses `PassiveOutputDelayLoader` in the assistant message list.

## Design Specifications

- **Sidebar Background:** `rgba(0, 0, 0, 0.8)` (black at 80% opacity)
- **Main View Background:** `#1A1A1A` (dark gray)
- **Sidebar Width:** 260px
- **Transition Duration:** 0.3s ease-in-out

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub, GitLab, or Bitbucket
2. Import the project in [Vercel](https://vercel.com)
3. Vercel will auto-detect Vite and configure the build settings
4. Click Deploy!

The included `vercel.json` ensures proper SPA routing.

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains the production build
# Upload the contents to your hosting provider
```

## Development Stages

### Stage 1: Setup and Layout ✅

- Project scaffolding
- Two-panel layout with sidebar
- Redux state management
- Constants-based design system
- ESLint and Prettier
- Vercel configuration

### Stage 2: Sidebar Content (Planned)

Details to be defined.

### Stage 3: Main Window Content (Planned)

Details to be defined.

See [PLAN.md](./PLAN.md) for detailed development roadmap.

## Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **styled-components** - CSS-in-JS
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Contributing

1. Follow the existing component structure
2. Use constants for all colors and fonts
3. Write functional components only
4. Run linter and formatter before committing
5. Update PLAN.md for new features

## License

This project is private and proprietary.
