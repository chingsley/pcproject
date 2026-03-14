# AI Chat Interface - Development Plan

## Overview

This project is a web desktop AI chat interface built with modern web technologies. It features a ChatGPT/Gemini-style layout with a toggleable sidebar and main content area.

## Technology Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **State Management:** Redux Toolkit
- **Styling:** styled-components with constants-based design system
- **Linting:** ESLint + Prettier
- **Deployment:** Vercel

## Development Stages

### Stage 1: Setup, Layout, and Deployment ✅

**Status:** Implemented

**Scope:**
- Project scaffolding with Vite + React + TypeScript
- Two-panel layout: collapsible left sidebar + main content area
- Redux state management for sidebar toggle
- Constants-based design system (colors, fonts)
- Component-based architecture (one component per unit)
- ESLint and Prettier integration
- Vercel deployment configuration

**Deliverables:**
1. ✅ Project setup with all dependencies
2. ✅ Constants folder with `colors.constants.ts` and `fonts.constants.ts`
3. ✅ Redux store with `uiSlice` for sidebar state management
4. ✅ Layout components:
   - `Layout.tsx` - Main layout wrapper
   - `Sidebar/Sidebar.tsx` - Left panel with slide-in/out animation
   - `Sidebar/SidebarToggle.tsx` - Toggle button component
   - `MainView/MainView.tsx` - Main content area
5. ✅ Global styles using styled-components
6. ✅ ESLint configuration with Prettier integration
7. ✅ Prettier configuration files
8. ✅ NPM scripts for linting and formatting
9. ✅ Vercel deployment configuration

**Design Specifications:**
- Sidebar background: `rgba(0, 0, 0, 0.8)` (black at 80% opacity)
- Main view background: `#1A1A1A` (dark gray)
- Sidebar width: 260px
- Smooth transitions for sidebar toggle (0.3s ease-in-out)

---

### Stage 2: Input Box ✅

**Status:** Implemented

**Scope:**
- Input box below the main content area in the main view
- Single component area: input container with placeholder, upload button, and submit button
- All colors and dimensions from constants (rem-based, responsive)

**Design specifications:**
- **Input box container**
  - Background: `#1E293B`
  - Width: 768px → `48rem`
  - Height: 146px → `9.125rem`
  - Placeholder: text "Ask anything" preceded by a search icon; color `#C0C7D0`; left-aligned
- **Upload button (bottom left)**
  - Circular `+` button
  - Background: `#45556C`; color: `#C0C7D0`
  - Size: 40×40px → `2.5rem`
- **Submit button (bottom right)**
  - Background: `#45556C`; color: `#C0C7D0`
  - Width: 100px → `6.25rem`; height: 40px → `2.5rem`
  - Border radius: 20px → `1.25rem` (pill)

**Deliverables:**
- New colors in `colors.constants.ts`: input background, action-button background; placeholder/icon use existing muted color
- New layout/spacing constants for input box and button dimensions (rem)
- Components: `InputBox` (container), `UploadButton`, `SubmitButton`, input/textarea with search icon and placeholder
- Input box placed in `MainView` below main content
- Implementation follows project rules: no hardcoded colors or px; constants only; component-per-unit

---

### Points & gamification (state)

**Status:** Implemented (state-based; earn logic to be added in chat/game stage)

**Scope (separation of concerns):**
- **Game progress (`pointsSlice`):** `percentage` (0–100) for the sidebar points ring. Game logic to be implemented later. Action: `setPointsPercentage`. Read by `Points` (ring) component.
- **Chat history (`historySlice`):** `items` — one entry per chat (`id`, `title`, `points`). Each item’s points are what the user accumulated in that chat. Actions: `setHistoryItemPoints`, `addHistoryItemPoints`. Type `HistoryItemEntry` exported. Read by Sidebar → HistorySection → HistoryList; when adding “earned points” in a chat, dispatch `addHistoryItemPoints({ id: currentChatId, delta })` (or `setHistoryItemPoints`).

**Deliverables:**
- ✅ `pointsSlice`: `percentage` only; action `setPointsPercentage`
- ✅ `historySlice`: `items` (HistoryItemEntry[]); actions `setHistoryItemPoints`, `addHistoryItemPoints`; type `HistoryItemEntry` exported
- ✅ `HistoryItem` receives `title` and `points` as props (no Redux inside the item)
- ✅ Sidebar reads `state.history.items` and passes data into HistorySection

---

### Stage 3: Main Window Content (Planned)

**Status:** To be defined

This stage will include the chat interface and main content area functionality. Details to be provided by user before implementation.

---

## Deployment Instructions

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run linting
npm run lint
npm run lint:fix

# Run formatting
npm run format
npm run format:check

# Build for production
npm run build

# Preview production build
npm run preview
```

### Vercel Deployment

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in Vercel dashboard
3. Vercel will auto-detect Vite and configure:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. Deploy!

The `vercel.json` configuration ensures proper SPA routing.

---

## Project Structure

```
pcproject/
├── src/
│   ├── components/
│   │   └── Layout/
│   │       ├── Layout.tsx
│   │       ├── Sidebar/
│   │       │   ├── Sidebar.tsx
│   │       │   └── SidebarToggle.tsx
│   │       └── MainView/
│   │           ├── MainView.tsx
│   │           └── InputBox/
│   │               ├── InputBox.tsx
│   │               ├── SearchIcon.tsx
│   │               ├── UploadButton.tsx
│   │               └── SubmitButton.tsx
│   ├── constants/
│   │   ├── colors.constants.ts
│   │   ├── fonts.constants.ts
│   │   ├── layout.constants.ts
│   │   └── spacing.constants.ts
│   ├── store/
│   │   ├── index.ts
│   │   ├── hooks.ts
│   │   └── slices/
│   │       └── uiSlice.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── GlobalStyles.ts
├── .prettierrc
├── .prettierignore
├── eslint.config.js
├── vercel.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── PLAN.md (this file)
```

---

## Workflow for Future Stages

1. User provides details for the next stage
2. This PLAN.md file will be updated with the new stage specifications
3. User confirms the updated plan
4. Implementation proceeds
5. Plan is marked as complete for that stage

---

## Notes

- All colors and fonts are defined in constants and imported where needed
- No magic strings or hardcoded values in components
- Functional components only
- Component-per-unit architecture maintained throughout
- Redux for state management with typed hooks
- styled-components for all styling
