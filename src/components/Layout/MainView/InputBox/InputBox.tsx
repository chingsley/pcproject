import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../../constants/colors.constants';
import { FONTS } from '../../../../constants/fonts.constants';
import { LAYOUT } from '../../../../constants/layout.constants';
import { SPACING } from '../../../../constants/spacing.constants';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { sendEngagement, sendMessage } from '../../../../store/slices/chatSlice';
import SearchIcon from './SearchIcon';
import UploadButton from './UploadButton';
import SubmitButton from './SubmitButton';
import { clearEngagementContext } from '../../../../store/slices/uiSlice';
import { drawBorder } from '../../../../utils/playground';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  // padding: ${SPACING.FIXED_OFFSET} 0;
  // border: 1px solid blue;
  width: 100%;
  border: ${drawBorder('white', true)};
`;

const Box = styled.div`
  width: 100%;
  max-width: ${LAYOUT.INPUT_BOX_WIDTH};
  min-height: ${LAYOUT.INPUT_BOX_HEIGHT};
  background-color: ${COLORS.INPUT_BG};
  border-radius: ${SPACING.RADIUS_SMALL};
  display: flex;
  flex-direction: column;
  padding: ${SPACING.FIXED_OFFSET};
  border: 1px solid ${COLORS.BORDER_SUBTLE};
  border: ${drawBorder('blue')};
`;

const InputRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${SPACING.BUTTON_PADDING_X};
  flex: 1;
  min-height: 0;
  border: ${drawBorder('green')};
`;

const TextArea = styled.textarea`
  flex: 1;
  background: transparent;
  border: none;
  resize: none;
  font-family: ${FONTS.FAMILY.PRIMARY};
  font-size: ${FONTS.SIZE.MEDIUM};
  color: ${COLORS.TEXT_PRIMARY};
  line-height: 1.5;

  &::placeholder {
    color: ${COLORS.MUTED_WHITE};
  }

  &:focus {
    outline: none;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${SPACING.BUTTON_PADDING_Y};
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: ${SPACING.RADIUS_SMALLER};
  padding: ${SPACING.BUTTON_PADDING_Y} ${SPACING.BUTTON_PADDING_X};
  font-size: ${FONTS.SIZE.SMALL};
  margin-top: ${SPACING.BUTTON_PADDING_Y};
  display: flex;
  align-items: center;
  gap: ${SPACING.BUTTON_PADDING_Y};
`;

const ErrorIcon = styled.span`
  font-size: ${FONTS.SIZE.LARGE};
  flex-shrink: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0;
  font-size: ${FONTS.SIZE.LARGE};
  margin-left: auto;
  flex-shrink: 0;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const InputBox = () => {
  const [input, setInput] = useState('');
  const [showError, setShowError] = useState(true);
  const dispatch = useAppDispatch();
  const activeChatId = useAppSelector((state) => state.chat.activeChatId);
  const isSending = useAppSelector((state) => state.chat.sendingMessageChatId !== null);
  const engagementContext = useAppSelector((state) => state.ui.engagementContext);
  const sendError = useAppSelector((state) => state.chat.sendError);
  const formRef = useRef<HTMLFormElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isSending) return;

    setShowError(true); // Reset error visibility on new submit
    console.log('Submitting message:', input.trim());

    const trimmed = input.trim();
    if (engagementContext?.active) {
      dispatch(
        sendEngagement({
          chatId: engagementContext.chatId,
          assistantMessageId: engagementContext.assistantMessageId,
          assistantResponse: engagementContext.assistantResponse,
          engagementType: engagementContext.engagementType,
          userEngagementText: trimmed,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(clearEngagementContext());
          setInput('');
        })
        .catch((error) => {
          console.error('Failed to send engagement:', error);
        });
      return;
    }

    dispatch(
      sendMessage({
        content: trimmed,
        chatId: activeChatId || undefined,
      })
    )
      .unwrap()
      .then(() => {
        console.log('Message sent successfully');
      })
      .catch((error) => {
        console.error('Failed to send message:', error);
      });

    setInput('');
  };

  return (
    <Wrapper>
      <Box as="form" ref={formRef} onSubmit={handleSubmit}>
        <InputRow>
          <SearchIcon />
          <TextArea
            placeholder={engagementContext?.active ? 'Type your engagement...' : 'Ask anything'}
            rows={3}
            aria-label="Ask anything"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSending}
          />
        </InputRow>
        <Footer>
          <UploadButton />
          <SubmitButton disabled={isSending || !input.trim()} />
        </Footer>
        {sendError && showError && (
          <ErrorMessage>
            <ErrorIcon>⚠️</ErrorIcon>
            <span>{sendError}</span>
            <CloseButton
              onClick={() => setShowError(false)}
              type="button"
              aria-label="Close error"
            >
              ×
            </CloseButton>
          </ErrorMessage>
        )}
      </Box>
    </Wrapper>
  );
};

export default InputBox;
