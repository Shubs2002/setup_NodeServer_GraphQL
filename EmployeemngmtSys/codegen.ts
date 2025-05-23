
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/schema.ts",
  documents: "./src/resolvers/*.ts",
  generates: {
    "./src/types/types.ts": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
