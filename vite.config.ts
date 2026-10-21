import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// base './' makes every asset path relative, so it works at username.github.io/<any-repo-name>/
export default defineConfig({ base: './', plugins: [react()] });
