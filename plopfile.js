module.exports = function(plop) {
  // Add new package
  plop.setGenerator(`package`, {
    description: `This is sets up the basic files for a new package.`,
    prompts: [
      {
        type: `input`,
        name: `name`,
        message: `name of new package`,
      },
      {
        type: `list`,
        name: `type`,
        message: `Will the core component be stateless?`,
        default: `Stateless`,
        choices: () => [`Stateless`, `React.Component`],
      },
    ],
    actions: data =>
      [
        {
          type: `add`,
          path: `packages/{{kebabCase name}}/package.json`,
          templateFile: `plop-templates/package/package.json.hbs`,
        },
        data.type === `React.Component` && {
          type: `add`,
          path: `packages/{{kebabCase name}}/src/index.js`,
          templateFile: `plop-templates/package/index.js.hbs`,
        },
        data.type === `Stateless` && {
          type: `add`,
          path: `packages/{{kebabCase name}}/src/index.js`,
          templateFile: `plop-templates/package/stateless.js.hbs`,
        },
        {
          type: `add`,
          path: `packages/{{kebabCase name}}/src/doc.mdx`,
          templateFile: `plop-templates/package/doc.mdx.hbs`,
        },
        {
          type: `add`,
          path: `packages/{{kebabCase name}}/src/__tests__/test.js`,
          templateFile: `plop-templates/package/test.js.hbs`,
        },
        {
          type: `add`,
          path: `packages/{{kebabCase name}}/README.md`,
          templateFile: `plop-templates/package/README.md.hbs`,
        },
        {
          type: `add`,
          path: `packages/{{kebabCase name}}/.babelrc`,
          templateFile: `plop-templates/package/.babelrc.hbs`,
        },
        {
          type: `add`,
          path: `packages/{{kebabCase name}}/.gitignore`,
          templateFile: `plop-templates/package/.gitignore.hbs`,
        },
        {
          type: `add`,
          path: `packages/{{kebabCase name}}/.npmignore`,
          templateFile: `plop-templates/package/.npmignore.hbs`,
        },
      ].filter(Boolean),
  });
  // Add new example site
  plop.setGenerator(`example`, {
    description: `This is sets up the basic files for a new example site.`,
    prompts: [
      {
        type: `input`,
        name: `name`,
        message: `name of new example site`,
      },
      {
        type: `input`,
        name: `author`,
        message: `Your name/email for putting in the package.json of the new example site`,
      },
    ],
    actions: [
      {
        type: `add`,
        path: `examples/{{kebabCase name}}/package.json`,
        templateFile: `plop-templates/example/package.json.hbs`,
      },
      {
        type: `add`,
        path: `examples/{{kebabCase name}}/README.md`,
        templateFile: `plop-templates/example/README.md.hbs`,
      },
      {
        type: `add`,
        path: `examples/{{kebabCase name}}/.gitignore`,
        templateFile: `plop-templates/example/.gitignore.hbs`,
      },
      {
        type: `add`,
        path: `examples/{{kebabCase name}}/.eslintrc.json`,
        templateFile: `plop-templates/example/.eslintrc.hbs`,
      },
    ],
  });
};
