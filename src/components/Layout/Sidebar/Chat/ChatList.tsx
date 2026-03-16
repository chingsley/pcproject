import styled from 'styled-components';
import type { Chat } from '../../../../types/chat';
import ChatItem from './ChatItem';

const List = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export interface ChatListProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
}

const ChatList = ({ chats, activeChatId, onSelectChat }: ChatListProps) => {
  return (
    <List>
      {chats.map((chat) => (
        <ChatItem
          key={chat.id}
          title={chat.title}
          points={chat.points}
          active={activeChatId === chat.id}
          onClick={() => onSelectChat(chat.id)}
        />
      ))}
    </List>
  );
};

export default ChatList;
