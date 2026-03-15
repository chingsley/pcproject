# Quick Start Guide - AI Chat Interface

## 🚀 Getting Started

### 1. Set Up Your API Key
```bash
# Open .env file and add your Google Gemini API key
VITE_GOOGLE_GEMINI_API_KEY=your_api_key_here
```

Get your API key from: https://aistudio.google.com/app/apikey

### 2. Install Dependencies (if not already done)
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 🎯 How to Use the Chat Interface

### Starting a New Chat
1. Click the **"New Chat"** button in the sidebar
2. Type your message in the input box at the bottom
3. Click **"Submit"** or press Enter
4. The chat will appear in the sidebar with a title from the AI

### Interacting with Messages
- **User messages** (your questions) appear on the right in blue bubbles
- **AI responses** appear on the left in dark bubbles
- Click **"Copy"** to copy the AI response to your clipboard
- Click **"Share"** to share the response (uses native share dialog)

### Managing Chats
- Click any chat in the sidebar to view its conversation history
- New chats appear at the top of the list
- Each chat tracks its own points (displayed as colored badges)

### Point Badge Colors
- 🟢 **Green**: > 80 points (excellent!)
- 🟡 **Amber**: 61-80 points (good)
- ⚪ **Gray**: 1-60 points (getting started)
- 🔴 **Red**: 0 points (no messages yet)

## 📂 Key Files to Know

### Configuration
- `.env` - Your API keys and settings
- `src/config/chatApi.ts` - Main API entry point
- `src/config/providers/gemini.ts` - Gemini provider (swappable)

### State Management
- `src/store/slices/chatSlice.ts` - All chat/message state
- `src/store/slices/pointsSlice.ts` - Game points (future feature)
- `src/store/slices/uiSlice.ts` - UI state (sidebar open/closed)

### Components
- `src/components/Layout/MainView/MainView.tsx` - Main chat area
- `src/components/Layout/Sidebar/Sidebar.tsx` - Sidebar with chat list
- `src/components/Layout/MainView/MessageList/` - Message display components
- `src/components/Layout/Sidebar/Chat/` - Chat list components

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Check code quality
npm run preview  # Preview production build
```

## 🐛 Troubleshooting

### "Cannot find module '@google/genai'" error
Make sure you've installed all dependencies:
```bash
npm install
```

### API calls not working
1. Check that your API key is set in `.env`
2. Verify the key starts with `VITE_` (required for Vite)
3. Restart the dev server after changing `.env`

### Build errors
```bash
# Clean and rebuild
rm -rf node_modules dist
npm install
npm run build
```

## 🎨 Customization

### Switching AI Models
1. Create a new provider in `src/config/providers/` (e.g., `openai.ts`)
2. Implement the `ChatApiProvider` interface
3. Add it to `PROVIDER_MAP` in `src/config/chatApi.ts`
4. Set `VITE_CHAT_PROVIDER=openai` in `.env`

### Styling
- Colors: `src/constants/colors.constants.ts`
- Fonts: `src/constants/fonts.constants.ts`
- Spacing: `src/constants/spacing.constants.ts`
- Layout: `src/constants/layout.constants.ts`

## 📚 Documentation

- Full implementation details: `IMPLEMENTATION_SUMMARY.md`
- Project plan: `PLAN.md`
- Detailed implementation plan: `.cursor/plans/ai_chat_interface_implementation_*.plan.md`

## 💡 Tips

1. **Start Simple**: Try asking basic questions first to test the API connection
2. **Check the Console**: Open browser DevTools to see any errors
3. **Points System**: Points are automatically added from each API response (5 points per message)
4. **Total Points**: The sidebar shows the sum of points from all chats

## ✅ What's Working

- ✅ Create new chats
- ✅ Send messages and get AI responses
- ✅ View chat history
- ✅ Switch between chats
- ✅ Copy/share AI responses
- ✅ Points tracking per chat
- ✅ Modular API design (easy to switch models)

## 🚧 Future Enhancements

- Chat persistence (save to localStorage or backend)
- Delete chats
- Edit chat titles
- Export conversations
- Real-time streaming responses
- Multi-model selection UI
- Chat search/filter

---

Enjoy your new AI chat interface! 🎉
