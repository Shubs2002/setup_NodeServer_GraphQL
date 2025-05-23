import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.node } },
  tseslint.configs.recommended,
  {
    rules:{
      '@typescript-eslint/no-explicit-any': 'off',
      "arrow-body-style": ["error", "always"],
      "no-irregular-whitespace":'warn',
      "no-unreachable": "error",
      "no-use-before-define": ["error", {
        "functions": true,
        "classes": true,
        "variables": true,
        "allowNamedExports": false
      }],
      "no-duplicate-imports": ["error", { "includeExports": true }]
    }
  }
]);
  