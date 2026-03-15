import styled from 'styled-components';
import { useAppSelector } from '../../../../store/hooks';
import { COLORS } from '../../../../constants/colors.constants';
import { SPACING } from '../../../../constants/spacing.constants';
import UserMessage from './UserMessage';
import AssistantMessage from './AssistantMessage';

const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${SPACING.FIXED_OFFSET};
  min-height: 0;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${COLORS.MUTED_WHITE};
`;

const MessageList = () => {
  const activeChatId = useAppSelector((state) => state.chat.activeChatId);
  const messagesById = useAppSelector((state) => state.chat.messagesById);
  const messageIdsByChatId = useAppSelector((state) => state.chat.messageIdsByChatId);

  if (!activeChatId || !messageIdsByChatId[activeChatId]) {
    return <EmptyState>No messages yet</EmptyState>;
  }

  const messageIds = messageIdsByChatId[activeChatId];
  const messages = messageIds.map((id) => messagesById[id]);

  return (
    <ListContainer>
      {messages.map((message) =>
        message.role === 'user' ? (
          <UserMessage key={message.id} content={message.content} />
        ) : (
          <AssistantMessage
            key={message.id}
            content={message.content}
            answer={message.answer}
          />
        )
      )}
    </ListContainer>
  );
};

export default MessageList;
