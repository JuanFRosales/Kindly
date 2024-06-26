module.exports = {
  extends: ['universe', 'universe/shared/typescript-analysis'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  rules: {'import/order': ['error', {'newlines-between': 'never'}], "jsx-expressions/strict-logical-expressions": "error"},
  plugins: ["jsx-expressions"]
};
