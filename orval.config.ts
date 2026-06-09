import { defineConfig } from 'orval';

export default defineConfig({
  sukipass: {
    input: {
      target: 'http://localhost:3000/openapi.json',
    },
    output: {
      mode: 'single',
      target: 'src/api/generated/sukipass.ts',
      schemas: 'src/api/generated/model',
      client: 'react-query',
      prettier: true,
      override: {
        fetch: {
          includeHttpResponseReturnType: false,
        },
        mutator: {
          path: 'src/lib/apiClient.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
        },
      },
    },
  },
});
