export default {
  teahub: {
    input: {
      target: "./openapi/teahub.yaml",
    },
    output: {
      target: "./src/api/generated/teahub.ts",
      schemas: "./src/api/generated/models",
      client: true,
    },
  },
};
