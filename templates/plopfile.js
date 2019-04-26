module.exports = function(plop) {
  // Add new package
  plop.setGenerator("package", {
    description: "This is sets up the basic files for a new package.",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "name of new package",
      },
    ],
    actions: data =>
      [
        {
          type: "add",
          path: "../packages/{{camelCase name}}/package.json",
          templateFile: "./package/package.json.hbs",
        },
        {
          type: "add",
          path: "../packages/{{camelCase name}}/src/index.js",
          templateFile: "./package/index.js.hbs",
        },
        {
          type: "add",
          path: "../packages/{{camelCase name}}/doc.mdx",
          templateFile: "./package/doc.mdx.hbs",
        },
        {
          type: "add",
          path: "../packages/{{camelCase name}}/src/__tests__/test.js",
          templateFile: "./package/test.js.hbs",
        },
      ].filter(Boolean),
  });
};
