import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://batkins44.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
});
