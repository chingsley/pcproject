import type { Plugin } from 'vite';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const SAVE_PATH = join(process.cwd(), 'src/data/dummy/currentState.json');
const MAX_BODY_BYTES = 5 * 1024 * 1024;

export function persistStatePlugin(): Plugin {
  let lastSaved = '';
  let isWriting = false;
  let queued: string | null = null;

  async function flushQueue() {
    if (isWriting || queued === null) return;
    isWriting = true;
    const current = queued;
    queued = null;
    try {
      await writeFile(SAVE_PATH, current, 'utf-8');
      lastSaved = current;
    } finally {
      isWriting = false;
      if (queued !== null) {
        await flushQueue();
      }
    }
  }

  return {
    name: 'persist-state',
    configureServer(server) {
      server.middlewares.use('/__save_state__', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end();
          return;
        }
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
          if (body.length > MAX_BODY_BYTES) {
            res.statusCode = 413;
            res.end(JSON.stringify({ error: 'Payload too large' }));
            req.destroy();
          }
        });
        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body);
            const serialized = JSON.stringify(parsed, null, 2);
            if (serialized === lastSaved) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true, skipped: true }));
              return;
            }
            queued = serialized;
            await flushQueue();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true }));
          } catch {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
          }
        });
      });
    },
  };
}
