module.exports = {
  root: true,
  extends: ['custom'],
  ignorePatterns: ['vite.config.ts', 'vite-env.d.ts'],
  plugins: ['eslint-plugin-tsdoc'],
  rules: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'tsdoc/syntax': 'warn',
  },
};
