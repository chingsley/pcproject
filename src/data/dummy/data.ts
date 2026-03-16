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
    promptPoint: 5,
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
    promptPoint: 5,
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
    promptPoint: 5,
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
      `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in urna ut libero pellentesque tincidunt at quis arcu. Mauris lobortis ullamcorper tellus, a varius sapien posuere eget. Fusce ultricies ante condimentum sem dapibus, eget finibus nunc sollicitudin. Sed sit amet mauris viverra, cursus ante a, semper orci. Cras suscipit eu arcu id egestas. Sed commodo elit eget erat tempus lobortis. Phasellus vitae sollicitudin turpis, placerat sagittis odio. Praesent egestas placerat risus, id dignissim tortor placerat in. Sed sagittis massa eu hendrerit mattis.

Duis pretium pulvinar lectus id fermentum. Nunc in elit placerat, blandit risus in, fermentum purus. Phasellus vestibulum libero et diam congue rutrum. Pellentesque erat justo, mollis sed imperdiet non, rutrum tincidunt enim. Donec laoreet mi id placerat mollis. Aliquam erat volutpat. Nam rhoncus diam ut erat fringilla mollis. Proin condimentum non neque eu consectetur. Vestibulum at turpis dui. Curabitur tempor mollis ultrices. In justo neque, congue at mauris eu, fringilla efficitur ex. In nec enim a nisi mollis scelerisque ut eget ipsum. Nunc ornare mollis molestie. Morbi elementum maximus mauris sollicitudin maximus. Sed at urna nec risus commodo elementum. Cras a facilisis enim, sit amet ullamcorper lorem.

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed sed lorem ut nunc mollis sodales a cursus ex. Pellentesque egestas aliquam lectus non vestibulum. Praesent eget libero id velit hendrerit elementum ut vel erat. Etiam fringilla felis sit amet condimentum malesuada. Aenean rhoncus risus sit amet scelerisque auctor. Ut ac libero nisi. Sed ex lectus, viverra sed ex id, tempus maximus sapien. Curabitur tristique dolor ac tortor gravida lobortis. Donec a efficitur ex, nec vehicula leo. Pellentesque interdum odio mauris, et gravida nisi tempor ac. Ut dignissim sapien sed diam fringilla scelerisque. Nullam a ultrices tellus. Proin vitae felis mollis, vestibulum est a, porttitor dui.

Sed justo ligula, molestie a malesuada ut, scelerisque pretium nisl. Etiam id tincidunt nisl. Ut at tincidunt nulla. Integer pulvinar egestas ex vel bibendum. In posuere feugiat sodales. Vestibulum ut laoreet eros. Donec non facilisis mauris. Quisque convallis aliquam lacus, in facilisis libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla sagittis ipsum sit amet gravida sodales. Aliquam mauris massa, pulvinar non dui molestie, suscipit dignissim risus. In maximus consequat auctor.

Suspendisse sed quam non odio commodo ultrices. Cras eu suscipit dolor, nec ultricies sapien. Donec blandit, lectus nec placerat hendrerit, est sapien venenatis ligula, at posuere mauris elit sit amet elit. Vivamus et felis vel felis malesuada ullamcorper. Curabitur dictum odio felis, in scelerisque urna bibendum id. Duis magna quam, posuere at tincidunt sit amet, commodo nec diam. Mauris erat neque, vestibulum vel nisi vel, dignissim feugiat velit. Integer sed rutrum massa. Curabitur dapibus, odio non ornare pellentesque, massa lacus aliquam mi, in porttitor dui quam et velit. Aenean urna lacus, vulputate et lorem nec, vulputate posuere nunc. Duis sagittis leo eu tortor pharetra volutpat. Quisque in est erat. Aliquam at leo ut arcu placerat congue.
      `,
    timestamp: '2025-03-11T14:31:18.000Z',
    promptPoint: 5,
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
