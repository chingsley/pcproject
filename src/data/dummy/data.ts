import type { Chat, Message } from '../../types/chat';

/** Chat state shape for initial/dummy data */
export interface DummyChatState {
  chatsById: Record<string, Chat>;
  chatIds: string[];
  messagesById: Record<string, Message>;
  messageIdsByChatId: Record<string, string[]>;
}

const chat1Id = 'chat_dummy_001';
const chat2Id = 'chat_dummy_002';

const chatsById: Record<string, Chat> = {
  [chat1Id]: {
    id: chat1Id,
    title: 'Getting started with React',
    points: 15,
    createdAt: '2025-03-10T10:00:00.000Z',
  },
  [chat2Id]: {
    id: chat2Id,
    title: 'Understanding Redux state',
    points: 10,
    createdAt: '2025-03-11T14:30:00.000Z',
  },
};

const chatIds = [chat2Id, chat1Id]; // Newest first

const msg1u = 'msg_dummy_1_user';
const msg1a = 'msg_dummy_1_assistant';
const msg2u = 'msg_dummy_2_user';
const msg2a = 'msg_dummy_2_assistant';
const msg3u = 'msg_dummy_3_user';
const msg3a = 'msg_dummy_3_assistant';
const msg4u = 'msg_dummy_4_user';
const msg4a = 'msg_dummy_4_assistant';

const messagesById: Record<string, Message> = {
  [msg1u]: {
    id: msg1u,
    chatId: chat1Id,
    role: 'user',
    content: 'What is React and why should I use it?',
    timestamp: '2025-03-10T10:00:00.000Z',
  },
  [msg1a]: {
    id: msg1a,
    chatId: chat1Id,
    role: 'assistant',
    content:
      'React is a JavaScript library for building user interfaces, particularly single-page applications. You should use it for component-based UIs, strong ecosystem, and React Native for mobile.',
    timestamp: '2025-03-10T10:00:15.000Z',
    msgResponse:
      'React is a JavaScript library for building user interfaces, particularly single-page applications. You should use it for component-based UIs, strong ecosystem, and React Native for mobile.',
    promptPoint: 5,
    question: 'What is React and why should I use it?',
    answer: 'React is a JavaScript library for building user interfaces.',
    modelId: 'dummy',
  },
  [msg2u]: {
    id: msg2u,
    chatId: chat1Id,
    role: 'user',
    content: 'How do I create a new React component?',
    timestamp: '2025-03-10T10:01:00.000Z',
  },
  [msg2a]: {
    id: msg2a,
    chatId: chat1Id,
    role: 'assistant',
    content:
      'You can create a component with a function: `function MyComponent() { return <div>Hello</div>; }` or as an arrow function. Export it and use it as `<MyComponent />`.',
    timestamp: '2025-03-10T10:01:20.000Z',
    msgResponse:
      'You can create a component with a function: `function MyComponent() { return <div>Hello</div>; }` or as an arrow function. Export it and use it as `<MyComponent />`.',
    promptPoint: 5,
    question: 'How do I create a new React component?',
    answer: 'You can create a component with a function.',
    modelId: 'dummy',
  },
  [msg3u]: {
    id: msg3u,
    chatId: chat2Id,
    role: 'user',
    content: 'What is the difference between Redux and React state?',
    timestamp: '2025-03-11T14:30:00.000Z',
  },
  [msg3a]: {
    id: msg3a,
    chatId: chat2Id,
    role: 'assistant',
    content:
      'React state is local to a component (useState) and passed down via props. Redux is a global store: one place for app state, predictable updates with actions/reducers, and easy to access from any component.',
    timestamp: '2025-03-11T14:30:25.000Z',
    msgResponse:
      'React state is local to a component (useState) and passed down via props. Redux is a global store: one place for app state, predictable updates with actions/reducers, and easy to access from any component.',
    promptPoint: 5,
    question: 'What is the difference between Redux and React state?',
    answer: 'React state is local; Redux is a global store.',
    modelId: 'dummy',
  },
  [msg4u]: {
    id: msg4u,
    chatId: chat2Id,
    role: 'user',
    content: 'How do I add a new slice in Redux Toolkit?',
    timestamp: '2025-03-11T14:31:00.000Z',
  },
  [msg4a]: {
    id: msg4a,
    chatId: chat2Id,
    role: 'assistant',
    content:
      'Use createSlice from Redux Toolkit: define name, initialState, and reducers. Then add the slice reducer to your store with configureStore({ reducer: { mySlice: mySlice.reducer } }).',
    timestamp: '2025-03-11T14:31:18.000Z',
    msgResponse:
      'Use createSlice from Redux Toolkit: define name, initialState, and reducers. Then add the slice reducer to your store with configureStore({ reducer: { mySlice: mySlice.reducer } }).',
    promptPoint: 5,
    question: 'How do I add a new slice in Redux Toolkit?',
    answer: 'Use createSlice from Redux Toolkit.',
    modelId: 'dummy',
  },
};

const messageIdsByChatId: Record<string, string[]> = {
  [chat1Id]: [msg1u, msg1a, msg2u, msg2a],
  [chat2Id]: [msg3u, msg3a, msg4u, msg4a],
};

/** Dummy chat state for testing without API calls */
export const dummyChatState: DummyChatState = {
  chatsById,
  chatIds,
  messagesById,
  messageIdsByChatId,
};
