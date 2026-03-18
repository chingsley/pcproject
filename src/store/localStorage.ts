import type { Middleware } from '@reduxjs/toolkit';

const STORAGE_KEY = 'pcproject_state';

// Load state from localStorage
export const loadState = (): unknown => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Failed to load state from localStorage:', err);
    return undefined;
  }
};

// Save state to localStorage
export const saveState = (state: unknown) => {
  try {
    const typed = state as { chat?: unknown };
    const serializedState = JSON.stringify({
      chat: typed.chat,
    });
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
  }
};

// Clear localStorage
export const clearStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('Storage cleared successfully');
  } catch (err) {
    console.error('Failed to clear storage:', err);
  }
};

// Middleware to persist state on every action
export const localStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);
    
    // Save state after each action
    const state = store.getState();
    saveState(state);
    
    return result;
  };
