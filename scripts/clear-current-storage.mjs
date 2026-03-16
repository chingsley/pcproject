/**
 * Resets currentState.json to match initial state from data/dummy.
 * Run: npm run clear-current-storage
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawnSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const initialStatePath = join(projectRoot, 'src/data/dummy/initialState.json');
const currentStatePath = join(projectRoot, 'src/data/dummy/currentState.json');

try {
  // Ensure initialState.json exists (generate if missing)
  try {
    readFileSync(initialStatePath, 'utf-8');
  } catch {
    spawnSync('node', [join(__dirname, 'generate-initial-state.mjs')], {
      cwd: projectRoot,
      stdio: 'inherit',
    });
  }
  const initialState = readFileSync(initialStatePath, 'utf-8');
  writeFileSync(currentStatePath, initialState, 'utf-8');
  console.log('currentState.json reset to initial state.');
} catch (err) {
  console.error('Failed to clear current storage:', err.message);
  process.exit(1);
}
