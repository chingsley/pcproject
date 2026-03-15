# Cohere AI Integration Guide

## Overview
Successfully integrated Cohere AI as an alternative provider to Google Gemini. The modular provider pattern makes switching between AI models as simple as changing an environment variable.

## What Was Added

### 1. Cohere Provider (`src/config/providers/cohere.ts`)
- Implements the `ChatApiProvider` interface
- Uses Cohere's `command-r-plus` model
- Handles JSON response parsing with markdown cleanup
- Temperature default: 0.7 (optimized for chat)
- Max tokens: 2000

### 2. Provider Registration
Updated `src/config/chatApi.ts` to include Cohere in the provider map:
```typescript
const PROVIDER_MAP: Record<string, ChatApiProvider> = {
  gemini: geminiProvider,
  cohere: cohereProvider,  // ← New!
};
```

### 3. Environment Configuration
- Added `VITE_COHERE_API_KEY` to `.env`
- Updated `VITE_CHAT_PROVIDER` to support `cohere` value
- Updated `.env.example` with Cohere documentation

## How to Switch Between Models

### Option 1: Environment Variable (Recommended)
Edit `.env` file:
```bash
# Use Cohere
VITE_CHAT_PROVIDER=cohere

# Or use Gemini
VITE_CHAT_PROVIDER=gemini
```

**Important:** Restart your dev server after changing `.env`:
```bash
npm run dev
```

### Option 2: Runtime Switching (Future Enhancement)
You could add a UI selector that changes the provider dynamically without restarting the server.

## API Keys Setup

### Get Your Cohere API Key
1. Go to https://dashboard.cohere.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Copy your API key
5. Add to `.env`:
   ```bash
   VITE_COHERE_API_KEY=your_key_here
   ```

### Get Your Gemini API Key
1. Go to https://aistudio.google.com/app/apikey
2. Create or copy your API key
3. Add to `.env`:
   ```bash
   VITE_GOOGLE_GEMINI_API_KEY=your_key_here
   ```

## Model Comparison

| Feature | Gemini (gemini-2.0-flash) | Cohere (command-r-plus) |
|---------|---------------------------|-------------------------|
| **Speed** | Very Fast | Fast |
| **Cost** | Free tier available | Free tier available |
| **Max Tokens** | 2000 | 2000 |
| **Temperature** | 1.0 (default) | 0.7 (default) |
| **JSON Mode** | Native support | Needs parsing cleanup |
| **Best For** | Quick responses | Detailed, nuanced responses |

## Provider Pattern Benefits

### 1. Easy Model Switching
Change one line in `.env` - no code changes needed!

### 2. Consistent Interface
All providers implement the same `ChatApiProvider` interface:
```typescript
interface ChatApiProvider {
  generateChatResponse(
    prompt: string,
    options?: { temperature?: number }
  ): Promise<ApiChatResponse>;
}
```

### 3. Isolated Implementation
Each provider is in its own file:
- `src/config/providers/gemini.ts`
- `src/config/providers/cohere.ts`
- Future: `src/config/providers/openai.ts`
- Future: `src/config/providers/anthropic.ts`

### 4. Type Safety
TypeScript ensures all providers return the same response structure.

## Adding More Providers

To add a new AI model (e.g., OpenAI GPT-4):

### Step 1: Install SDK
```bash
npm install openai
```

### Step 2: Create Provider File
Create `src/config/providers/openai.ts`:
```typescript
import OpenAI from 'openai';
import type { ApiChatResponse, ChatApiProvider } from '../../types/chat';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const openaiProvider: ChatApiProvider = {
  async generateChatResponse(prompt, options = {}) {
    // Implementation here
    // Must return ApiChatResponse format
  },
};
```

### Step 3: Register Provider
Add to `src/config/chatApi.ts`:
```typescript
import { openaiProvider } from './providers/openai';

const PROVIDER_MAP: Record<string, ChatApiProvider> = {
  gemini: geminiProvider,
  cohere: cohereProvider,
  openai: openaiProvider,  // ← Add here
};
```

### Step 4: Add Environment Variable
Add to `.env` and `.env.example`:
```bash
VITE_OPENAI_API_KEY=your_key_here
VITE_CHAT_PROVIDER=openai
```

## Cohere-Specific Implementation Details

### JSON Response Handling
Cohere sometimes wraps JSON in markdown code blocks:
````
```json
{
  "chatTitle": "...",
  "msgResponse": "..."
}
```
````

Our provider automatically strips these markdown wrappers before parsing.

### Model Choice
Using `command-r-plus` because it:
- Excellent for conversational responses
- Good at following instructions
- Handles JSON formatting well
- Competitive pricing

### Temperature Setting
Set to 0.7 (vs Gemini's 1.0) because:
- More consistent responses
- Better for structured output
- Still creative enough for chat

## Testing

### Test Cohere
1. Set `VITE_CHAT_PROVIDER=cohere` in `.env`
2. Restart dev server
3. Send a message
4. Check console for `modelId: "command-r-plus"`

### Test Gemini
1. Set `VITE_CHAT_PROVIDER=gemini` in `.env`
2. Restart dev server
3. Send a message
4. Check console for `modelId: "gemini-2.0-flash"`

## Troubleshooting

### Error: "Unknown chat provider: cohere"
- Check spelling in `.env`: `VITE_CHAT_PROVIDER=cohere`
- Restart dev server after changing `.env`

### Error: "No response text from Cohere API"
- Verify API key is correct
- Check API key has not expired
- Verify account has available credits

### Build Size Increased
The Cohere SDK adds ~765KB to the bundle. Consider:
- Code splitting for providers
- Loading providers dynamically
- Using only one provider in production

## Benefits of This Integration

✅ **Flexibility**: Switch models based on use case  
✅ **Reliability**: Fallback to another provider if one fails  
✅ **Cost Optimization**: Use cheaper models for simple queries  
✅ **Testing**: Compare responses across models  
✅ **Future-Proof**: Easy to add new AI models as they emerge  

## Next Steps

1. **Add Provider Selector UI**: Let users choose their preferred AI model
2. **Implement Fallback Logic**: Try Cohere if Gemini fails
3. **Add More Models**: OpenAI GPT-4, Anthropic Claude, etc.
4. **Cost Tracking**: Track API usage per provider
5. **Response Caching**: Cache responses to reduce API calls

---

Enjoy using Cohere AI! 🎉
