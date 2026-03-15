import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../../store/hooks';
import { COLORS } from '../../../../constants/colors.constants';
import { SPACING } from '../../../../constants/spacing.constants';
import UserMessage from './UserMessage';
import AssistantMessage from './AssistantMessage';
import TypingLoader from './TypingLoader';
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

interface MessageListProps {
  onScrollToBottom?: () => void;
  onAnimationComplete?: () => void;
}

const MessageList = ({ onScrollToBottom, onAnimationComplete }: MessageListProps) => {
  const activeChatId = useAppSelector((state) => state.chat.activeChatId);
  const messagesById = useAppSelector((state) => state.chat.messagesById);
  const messageIdsByChatId = useAppSelector((state) => state.chat.messageIdsByChatId);
  const lastAddedAssistantMessageId = useAppSelector(
    (state) => state.chat.lastAddedAssistantMessageId
  );
  const sendingMessageChatId = useAppSelector(
    (state) => state.chat.sendingMessageChatId
  );

  if (!activeChatId || !messageIdsByChatId[activeChatId]) {
    return <EmptyState>No messages yet</EmptyState>;
  }

  const messageIds = messageIdsByChatId[activeChatId];
  const messages = messageIds.map((id) => messagesById[id]);
  const isSendingToActiveChat =
    sendingMessageChatId !== null &&
    (sendingMessageChatId === activeChatId || sendingMessageChatId === 'new');
  const lastMessage = messages[messages.length - 1];
  const showTypingLoader =
    isSendingToActiveChat && lastMessage?.role === 'user';

  useEffect(() => {
    if (showTypingLoader && onScrollToBottom) {
      onScrollToBottom();
    }
  }, [showTypingLoader, onScrollToBottom]);

  return (
    <ListContainer>
      {messages.map((message, index) =>
        message.role === 'user' ? (
          <UserMessage
            key={message.id}
            content={message.content}
            promptPoint={
              messages[index + 1]?.role === 'assistant'
                ? messages[index + 1].promptPoint ?? 0
                : 0
            }
          />
        ) : (
          <AssistantMessage
            key={message.id}
            content={message.content}
            answer={message.answer}
            shouldAnimate={message.id === lastAddedAssistantMessageId}
            onScrollToBottom={onScrollToBottom}
            onAnimationComplete={onAnimationComplete}
          />
        )
      )}
      {showTypingLoader && <TypingLoader />}
    </ListContainer>
  );
};

export default MessageList;
