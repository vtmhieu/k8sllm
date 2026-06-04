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
        ink: '#111816',
        panel: '#18211f',
        muted: '#52625f',
        accent: '#0f766e',
        line: 'rgba(15, 23, 42, 0.13)',
      },
      fontFamily: {
        sans: ['Satoshi', 'Geist', 'Aptos', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      boxShadow: {
        diffusion: '0 24px 70px rgba(15, 35, 33, 0.14)',
      },
    },
  },
  plugins: [],
};

export default config;
