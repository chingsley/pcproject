/**
 * Vite `import.meta.env.MODE` — `'development'`, `'production'`, or `'demo'` when using `--mode demo`.
 * @see package.json scripts `demo` and `build:demo`
 */
export const IS_DEMO_MODE = import.meta.env.MODE === 'demo';
