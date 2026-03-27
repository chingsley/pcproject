import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from './store';
import { loadState } from './store/loadState';
import {
  PERSIST_DEBOUNCE_MS,
  serializePersistedState,
} from './store/statePersistence';
import App from './App.tsx';

async function bootstrap() {
  const preloadedState = await loadState();
  const store = createStore(preloadedState);

  if (import.meta.env.DEV) {
    let previousUiRef = store.getState().ui;
    let previousChatRef = store.getState().chat;
    let previousUserRef = store.getState().user;
    let lastSavedPayload = '';
    let pendingPayload: string | null = null;
    let debounceTimer: number | null = null;
    let requestInFlight = false;

    const flushPersist = () => {
      if (requestInFlight || !pendingPayload) return;
      requestInFlight = true;
      const payload = pendingPayload;
      pendingPayload = null;

      fetch('/__save_state__', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      })
        .then(() => {
          lastSavedPayload = payload;
        })
        .catch(() => {
          // Ignore persistence errors in dev mode
        })
        .finally(() => {
          requestInFlight = false;
          if (pendingPayload) {
            flushPersist();
          }
        });
    };

    store.subscribe(() => {
      const state = store.getState();
      if (
        state.ui === previousUiRef &&
        state.chat === previousChatRef &&
        state.user === previousUserRef
      ) {
        return;
      }
      previousUiRef = state.ui;
      previousChatRef = state.chat;
      previousUserRef = state.user;

      const payload = serializePersistedState(state);
      if (payload === lastSavedPayload || payload === pendingPayload) return;

      pendingPayload = payload;
      if (debounceTimer !== null) {
        window.clearTimeout(debounceTimer);
      }
      debounceTimer = window.setTimeout(flushPersist, PERSIST_DEBOUNCE_MS);
    });
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
}

bootstrap();
