import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Chat, Message } from '../../types/chat';
import { generateChatResponse } from '../../config/chatApi';
import { dummyChatState } from '../../data/dummy/data';

interface ChatState {
  chatsById: Record<string, Chat>;
  chatIds: string[];
  messagesById: Record<string, Message>;
  messageIdsByChatId: Record<string, string[]>;
  activeChatId: string | null;
  sendingMessageChatId: string | null;
  sendError: string | null;
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
};

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (
    payload: { content: string; chatId?: string },
    { rejectWithValue }
  ) => {
    try {
      const { content, chatId } = payload;

      let currentChatId = chatId;
      let isNewChat = false;

      // Generate chat ID if needed
      if (!currentChatId) {
        currentChatId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        isNewChat = true;
      }

      // Generate user message ID
      const userMessageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Call API
      const apiResponse = await generateChatResponse(content);

      // Generate assistant message ID
      const assistantMessageId = `msg_${Date.now() + 1}_${Math.random().toString(36).substr(2, 9)}`;

      return {
        chatId: currentChatId,
        isNewChat,
        userMessage: {
          id: userMessageId,
          chatId: currentChatId,
          role: 'user' as const,
          content,
          timestamp: new Date().toISOString(),
        },
        assistantMessage: {
          id: assistantMessageId,
          chatId: currentChatId,
          role: 'assistant' as const,
          content: apiResponse.msgResponse,
          timestamp: apiResponse.timestamp || new Date().toISOString(),
          msgResponse: apiResponse.msgResponse,
          promptPoint: apiResponse.promptPoint,
          question: apiResponse.question,
          answer: apiResponse.answer,
          modelId: apiResponse.modelId,
        },
        chatTitle: apiResponse.chatTitle,
        promptPoint: apiResponse.promptPoint,
      };
    } catch (error) {
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

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChatId: (state, action: PayloadAction<string | null>) => {
      state.activeChatId = action.payload;
    },
    clearActiveChatId: (state) => {
      state.activeChatId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state, action) => {
        const chatId = action.meta.arg.chatId || 'new';
        state.sendingMessageChatId = chatId;
        state.sendError = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const {
          chatId,
          isNewChat,
          userMessage,
          assistantMessage,
          chatTitle,
          promptPoint,
        } = action.payload;

        // Add or update chat
        if (isNewChat) {
          state.chatsById[chatId] = {
            id: chatId,
            title: chatTitle.substring(0, 30), // Truncate to 30 chars
            points: promptPoint,
            createdAt: new Date().toISOString(),
          };
          state.chatIds.unshift(chatId); // Prepend to beginning
          state.activeChatId = chatId;
          state.messageIdsByChatId[chatId] = [];
        } else {
          // Update existing chat
          if (state.chatsById[chatId]) {
            state.chatsById[chatId].title = chatTitle.substring(0, 30);
            state.chatsById[chatId].points += promptPoint;
          }
        }

        // Add messages
        state.messagesById[userMessage.id] = userMessage;
        state.messagesById[assistantMessage.id] = assistantMessage;

        // Add message IDs to chat
        if (!state.messageIdsByChatId[chatId]) {
          state.messageIdsByChatId[chatId] = [];
        }
        state.messageIdsByChatId[chatId].push(userMessage.id, assistantMessage.id);

        state.sendingMessageChatId = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sendingMessageChatId = null;
        state.sendError = action.payload as string;
      });
  },
});

export const { setActiveChatId, clearActiveChatId } = chatSlice.actions;
export default chatSlice.reducer;
