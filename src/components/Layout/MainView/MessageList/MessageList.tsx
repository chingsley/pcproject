import styled from 'styled-components';
import { useAppSelector } from '../../../../store/hooks';
import { COLORS } from '../../../../constants/colors.constants';
import { SPACING } from '../../../../constants/spacing.constants';
import UserMessage from './UserMessage';
import AssistantMessage from './AssistantMessage';
import { LAYOUT } from '../../../../constants/layout.constants';

const ListContainer = styled.div`
  padding: ${SPACING.FIXED_OFFSET};
  width: 100%;
  max-width: ${LAYOUT.INPUT_BOX_WIDTH};
  margin: 0 auto;
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
