module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "google",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  "plugins": [
    "react",
    "react-hooks",
    "@typescript-eslint",
  ],
  "rules": {
    "quotes": [2, "double", {"avoidEscape": true}],
    "require-jsdoc": 0,
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "@typescript-eslint/no-explicit-any": "off",
    "max-len": ["error", {"code": 120}],
  },
  "settings": {
    "react": {
      "version": "detect",
    },
  },
};
