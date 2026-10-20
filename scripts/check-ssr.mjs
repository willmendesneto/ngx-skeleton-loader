// Starts the SSR server built via `npm run build:ssr` and checks that it renders the demo app.
// CI only builds SSR, so server startup errors (e.g. invalid Express routes) weren't caught.
import { spawn } from 'node:child_process';

const PORT = process.env.PORT || '4100';
const BASE_URL = `http://localhost:${PORT}`;
const TIMEOUT_MS = 20_000;

const server = spawn(process.execPath, ['dist/ngx-skeleton-loader-demo/server/server.mjs'], {
  env: { ...process.env, PORT },
  stdio: ['ignore', 'inherit', 'inherit'],
});

const fail = message => {
  console.error(`SSR check failed: ${message}`);
  server.kill();
  process.exit(1);
};

server.on('exit', code => fail(`server exited with code ${code}`));

const waitForServer = async () => {
  const startedAt = Date.now();
  while (Date.now() - startedAt < TIMEOUT_MS) {
    try {
      return await fetch(BASE_URL);
    } catch {
      await new Promise(resolve => setTimeout(resolve, 250));
    }
  }
  fail(`server didn't respond in ${TIMEOUT_MS}ms`);
};

await waitForServer();

// `/` is prerendered (static file), any other route is rendered on demand by the server
for (const path of ['/', '/ssr-check']) {
  const response = await fetch(`${BASE_URL}${path}`);
  const html = await response.text();

  if (response.status !== 200 || !html.includes('<ngx-skeleton-loader')) {
    fail(`GET ${path} returned ${response.status} without skeletons`);
  }
  console.log(`GET ${path} -> ${response.status}`);
}

server.removeAllListeners('exit');
server.kill();
console.log('SSR check passed');
