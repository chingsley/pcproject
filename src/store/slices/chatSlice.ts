import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Chat, Message } from '../../types/chat';
import { generateChatResponse } from '../../config/chatApi';
import { dummyChatState } from '../../data/dummy/data';
import { normalizePromptScoring } from '../../utils/promptScoring';
import { buildEngagementEvaluationPrompt, type EngagementType } from '../../utils/engagementPrompt';

interface ChatState {
  chatsById: Record<string, Chat>;
  chatIds: string[];
  messagesById: Record<string, Message>;
  messageIdsByChatId: Record<string, string[]>;
  activeChatId: string | null;
  sendingMessageChatId: string | null;
  sendError: string | null;
  /** ID of the assistant message that should animate with typewriter (only when newly returned from API) */
  lastAddedAssistantMessageId: string | null;
}

/** Get the chat id with the latest createdAt (most recent chat). */
function getMostRecentChatId(
  chatsById: Record<string, Chat>,
  chatIds: string[]
): string | null {
  if (chatIds.length === 0) return null;
  return chatIds.reduce((latestId, id) => {
    const chat = chatsById[id];
    const latest = latestId ? chatsById[latestId] : null;
    if (!chat) return latestId;
    if (!latest) return id;
    return new Date(chat.createdAt) > new Date(latest.createdAt) ? id : latestId;
  }, null as string | null);
}

const initialState: ChatState = {
  ...dummyChatState,
  activeChatId: getMostRecentChatId(
    dummyChatState.chatsById,
    dummyChatState.chatIds
  ),
  sendingMessageChatId: null,
  sendError: null,
  lastAddedAssistantMessageId: null,
};

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (
    payload: { content: string; chatId?: string; },
    { dispatch, rejectWithValue }
  ) => {
    const { content, chatId } = payload;

    let currentChatId = chatId;
    let isNewChat = false;

    if (!currentChatId) {
      currentChatId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      isNewChat = true;
    }

    const userMessageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const userMessage: Message = {
      id: userMessageId,
      chatId: currentChatId,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    // Optimistic update: show user message immediately before API response
    dispatch(
      addOptimisticUserMessage({
        chatId: currentChatId,
        isNewChat,
        userMessage,
      })
    );

    try {
      const apiResponse = await generateChatResponse(content);
      const normalizedScoring = normalizePromptScoring({
        promptText: content,
        providerPoint: apiResponse.promptPoint,
        providerCategory: apiResponse.promptCategory,
        providerFeedback: apiResponse.promptFeedback,
      });

      const assistantMessageId = `msg_${Date.now() + 1}_${Math.random().toString(36).substr(2, 9)}`;

      return {
        chatId: currentChatId,
        isNewChat,
        userMessage,
        assistantMessage: {
          id: assistantMessageId,
          chatId: currentChatId,
          role: 'assistant' as const,
          content: apiResponse.content,
          timestamp: apiResponse.timestamp || new Date().toISOString(),
          promptPoint: normalizedScoring.promptPoint,
          promptCategory: normalizedScoring.promptCategory,
          promptFeedback: normalizedScoring.promptFeedback,
        },
        chatTitle: apiResponse.chatTitle,
        promptPoint: normalizedScoring.promptPoint,
      };
    } catch (error) {
      // Rollback optimistic update on failure
      dispatch(
        removeOptimisticUserMessage({
          chatId: currentChatId,
          userMessageId,
          isNewChat,
        })
      );
      // Extract user-friendly error message
      let errorMessage = 'Failed to send message';

      if (error instanceof Error) {
        const errorText = error.message;

        // Check for quota exceeded
        if (errorText.includes('RESOURCE_EXHAUSTED') || errorText.includes('quota')) {
          errorMessage = 'API quota exceeded. Please check your plan or try again later.';
        }
        // Check for auth errors
        else if (errorText.includes('API key') || errorText.includes('authentication')) {
          errorMessage = 'Invalid API key. Please check your configuration.';
        }
        // Check for rate limit
        else if (errorText.includes('rate limit')) {
          errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
        }
        // Check for network errors
        else if (errorText.includes('fetch') || errorText.includes('network')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        }
        // Generic error with shortened message
        else if (error.message.length < 100) {
          errorMessage = error.message;
        }
      }

      console.error('Send message error:', error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const sendEngagement = createAsyncThunk(
  'chat/sendEngagement',
  async (
    payload: {
      chatId: string;
      assistantMessageId: string;
      assistantResponse: string;
      engagementType: EngagementType;
      userEngagementText: string;
    },
    { dispatch, rejectWithValue }
  ) => {
    const { chatId, assistantResponse, engagementType, userEngagementText } = payload;

    const engagementUserMessageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const userMessage: Message = {
      id: engagementUserMessageId,
      chatId,
      role: 'user',
      content: userEngagementText,
      timestamp: new Date().toISOString(),
    };

    // Optimistic update: show the engagement text immediately.
    dispatch(
      addOptimisticUserMessage({
        chatId,
        isNewChat: false,
        userMessage,
      })
    );

    try {
      const evaluationPrompt = buildEngagementEvaluationPrompt({
        engagementType,
        assistantResponse,
        userEngagementText,
      });

      const apiResponse = await generateChatResponse(evaluationPrompt);

      const normalizedScoring = normalizePromptScoring({
        promptText: userEngagementText,
        providerPoint: apiResponse.promptPoint,
        providerCategory: apiResponse.promptCategory,
        providerFeedback: apiResponse.promptFeedback,
      });

      const assistantMessageId = `msg_${Date.now() + 1}_${Math.random().toString(36).substr(2, 9)}`;

      return {
        chatId,
        userMessage,
        assistantMessage: {
          id: assistantMessageId,
          chatId,
          role: 'assistant' as const,
          content: apiResponse.content,
          timestamp: apiResponse.timestamp || new Date().toISOString(),
          promptPoint: normalizedScoring.promptPoint,
          promptCategory: normalizedScoring.promptCategory,
          promptFeedback: normalizedScoring.promptFeedback,
          isEngagementResponse: true,
        },
      };
    } catch (error) {
      dispatch(
        removeOptimisticUserMessage({
          chatId,
          userMessageId: engagementUserMessageId,
          isNewChat: false,
        })
      );

      let errorMessage = 'Failed to submit engagement';
      if (error instanceof Error) {
        const errorText = error.message;

        if (errorText.includes('RESOURCE_EXHAUSTED') || errorText.includes('quota')) {
          errorMessage = 'API quota exceeded. Please check your plan or try again later.';
        } else if (errorText.includes('API key') || errorText.includes('authentication')) {
          errorMessage = 'Invalid API key. Please check your configuration.';
        } else if (errorText.includes('rate limit')) {
          errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
        } else if (errorText.includes('fetch') || errorText.includes('network')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else if (error.message.length < 100) {
          errorMessage = error.message;
        }
      }

      console.error('Send engagement error:', error);
      return rejectWithValue(errorMessage);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addOptimisticUserMessage: (
      state,
      action: PayloadAction<{
        chatId: string;
        isNewChat: boolean;
        userMessage: Message;
      }>
    ) => {
      const { chatId, isNewChat, userMessage } = action.payload;

      if (isNewChat) {
        state.chatsById[chatId] = {
          id: chatId,
          title: userMessage.content.substring(0, 30),
          createdAt: new Date().toISOString(),
        };
        state.chatIds.unshift(chatId);
        state.messageIdsByChatId[chatId] = [];
        state.activeChatId = chatId;
      }

      if (!state.messageIdsByChatId[chatId]) {
        state.messageIdsByChatId[chatId] = [];
      }
      state.messagesById[userMessage.id] = userMessage;
      state.messageIdsByChatId[chatId].push(userMessage.id);
    },
    removeOptimisticUserMessage: (
      state,
      action: PayloadAction<{
        chatId: string;
        userMessageId: string;
        isNewChat: boolean;
      }>
    ) => {
      const { chatId, userMessageId, isNewChat } = action.payload;
      delete state.messagesById[userMessageId];
      if (state.messageIdsByChatId[chatId]) {
        state.messageIdsByChatId[chatId] = state.messageIdsByChatId[chatId].filter(
          (id) => id !== userMessageId
        );
      }
      if (isNewChat) {
        delete state.chatsById[chatId];
        state.chatIds = state.chatIds.filter((id) => id !== chatId);
        state.activeChatId = getMostRecentChatId(state.chatsById, state.chatIds);
      }
    },
    setActiveChatId: (state, action: PayloadAction<string | null>) => {
      state.activeChatId = action.payload;
      state.lastAddedAssistantMessageId = null;
    },
    clearActiveChatId: (state) => {
      state.activeChatId = null;
      state.lastAddedAssistantMessageId = null;
    },
    clearLastAddedAssistantMessageId: (state) => {
      state.lastAddedAssistantMessageId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state, action) => {
        const chatId = action.meta.arg.chatId || 'new';
        state.sendingMessageChatId = chatId;
        state.sendError = null;
        state.lastAddedAssistantMessageId = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { chatId, assistantMessage, chatTitle, isNewChat } = action.payload;

        // Update chat title only for the first prompt (new chat); never on subsequent messages
        if (state.chatsById[chatId] && isNewChat) {
          state.chatsById[chatId].title = chatTitle.substring(0, 30);
        }

        state.messagesById[assistantMessage.id] = assistantMessage;
        state.messageIdsByChatId[chatId].push(assistantMessage.id);
        state.lastAddedAssistantMessageId = assistantMessage.id;

        state.sendingMessageChatId = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sendingMessageChatId = null;
        state.sendError = action.payload as string;
      });

    builder
      .addCase(sendEngagement.pending, (state, action) => {
        state.sendingMessageChatId = action.meta.arg.chatId;
        state.sendError = null;
        state.lastAddedAssistantMessageId = null;
      })
      .addCase(sendEngagement.fulfilled, (state, action) => {
        const { chatId, assistantMessage } = action.payload;
        state.messagesById[assistantMessage.id] = assistantMessage;
        state.messageIdsByChatId[chatId].push(assistantMessage.id);
        state.lastAddedAssistantMessageId = assistantMessage.id;
        state.sendingMessageChatId = null;
      })
      .addCase(sendEngagement.rejected, (state, action) => {
        state.sendingMessageChatId = null;
        state.sendError = action.payload as string;
      });
  },
});

export const {
  addOptimisticUserMessage,
  removeOptimisticUserMessage,
  setActiveChatId,
  clearActiveChatId,
  clearLastAddedAssistantMessageId,
} = chatSlice.actions;
export default chatSlice.reducer;
