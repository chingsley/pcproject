/**
 * Generates initialState.json in a simplified persisted shape.
 * Run with: node scripts/generate-initial-state.mjs
 */
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const outputPath = join(projectRoot, 'src/data/dummy/initialState.json');

// Persisted state shape: ui + chat{chats[], messages[]}
const initialState = {
  ui: {
    sidebarOpen: true,
    selectedHistoryId: null,
    passiveZeroPromptQuota: {
      windowStartMs: null,
      zeroPointCountInWindow: 0,
    },
  },
  chat: {
    chats: [
      {
        id: 'chat_dummy_002',
        title: 'Understanding Redux state',
        createdAt: '2025-03-11T14:30:00.000Z',
      },
      {
        id: 'chat_dummy_001',
        title: 'Getting started with React',
        createdAt: '2025-03-10T10:00:00.000Z',
      },
    ],
    messages: [
      {
        id: 'msg_dummy_1_user',
        chatId: 'chat_dummy_001',
        role: 'user',
        content: 'What is React and why should I use it?',
        timestamp: '2025-03-10T10:00:00.000Z',
      },
      {
        id: 'msg_dummy_1_assistant',
        chatId: 'chat_dummy_001',
        role: 'assistant',
        content:
          'React is a JavaScript library for building user interfaces, particularly single-page applications. You should use it for component-based UIs, strong ecosystem, and React Native for mobile.',
        timestamp: '2025-03-10T10:00:15.000Z',
        promptPoint: 5,
        promptCategory: 'active',
        promptFeedback: 'Strong prompt: you are using AI as a thinking partner.',
      },
      {
        id: 'msg_dummy_2_user',
        chatId: 'chat_dummy_001',
        role: 'user',
        content: 'How do I create a new React component?',
        timestamp: '2025-03-10T10:01:00.000Z',
      },
      {
        id: 'msg_dummy_2_assistant',
        chatId: 'chat_dummy_001',
        role: 'assistant',
        content:
          'You can create a component with a function: `function MyComponent() { return <div>Hello</div>; }` or as an arrow function. Export it and use it as `<MyComponent />`.',
        timestamp: '2025-03-10T10:01:20.000Z',
        promptPoint: 5,
        promptCategory: 'active',
        promptFeedback: 'Strong prompt: you are using AI as a thinking partner.',
      },
      {
        id: 'msg_dummy_3_user',
        chatId: 'chat_dummy_002',
        role: 'user',
        content: 'What is the difference between Redux and React state?',
        timestamp: '2025-03-11T14:30:00.000Z',
      },
      {
        id: 'msg_dummy_3_assistant',
        chatId: 'chat_dummy_002',
        role: 'assistant',
        content:
          'React state is local to a component (useState) and passed down via props. Redux is a global store: one place for app state, predictable updates with actions/reducers, and easy to access from any component.',
        timestamp: '2025-03-11T14:30:25.000Z',
        promptPoint: 5,
        promptCategory: 'active',
        promptFeedback: 'Strong prompt: you are using AI as a thinking partner.',
      },
      {
        id: 'msg_dummy_4_user',
        chatId: 'chat_dummy_002',
        role: 'user',
        content: 'How do I add a new slice in Redux Toolkit?',
        timestamp: '2025-03-11T14:31:00.000Z',
      },
      {
        id: 'msg_dummy_4_assistant',
        chatId: 'chat_dummy_002',
        role: 'assistant',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Use createSlice from Redux Toolkit.',
        timestamp: '2025-03-11T14:31:18.000Z',
        promptPoint: 5,
        promptCategory: 'active',
        promptFeedback: 'Strong prompt: you are using AI as a thinking partner.',
      },
    ],
  },
  user: {
    session: null,
  },
};

writeFileSync(outputPath, JSON.stringify(initialState, null, 2), 'utf-8');
console.log('initialState.json generated.');
