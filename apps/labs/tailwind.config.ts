import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        panel: '#ffffff',
        muted: '#475569',
        accent: '#326ce5',
        line: 'rgba(50, 108, 229, 0.14)',
      },
      fontFamily: {
        sans: ['Satoshi', 'Geist', 'Aptos', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      boxShadow: {
        diffusion: '0 24px 70px rgba(50, 108, 229, 0.14)',
      },
    },
  },
  plugins: [],
};

export default config;
