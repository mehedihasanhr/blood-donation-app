import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";

// Create a new FlatCompat instance
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended
});

export default {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    ...compat.extends("standard-with-typescript"),
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  rules: {
    // Customize your rules here if needed
  },
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module"
      },
      extends: [
        ...compat.extends("standard-with-typescript"),
        "plugin:prettier/recommended"
      ],
      rules: {
        // Customize your rules here if needed
      }
    }
  ]
};
