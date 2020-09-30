module.exports = {
  parser: "@babel/eslint-parser",
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:node/recommended",
    "prettier",
    "prettier/react",
    "prettier/babel",
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "react-hooks"],
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "no-console": [
      "warn",
      { allow: ["clear", "info", "error", "dir", "trace"] },
    ],
    "react-hooks/rules-of-hooks": "error",
  },
};
