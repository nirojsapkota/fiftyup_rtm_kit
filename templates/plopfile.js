module.exports = function(plop) {
  // Add new package
  plop.setGenerator('package', {
    description: 'This is sets up the basic files for a new package.',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'name of new package',
      },
      {
        type: 'list',
        name: 'type',
        message: 'Will the core component be stateless?',
        default: 'Stateless',
        choices: () => ['Stateless', 'React.Component'],
      },
    ],
    actions: data =>
      [
        {
          type: 'add',
          path: '../packages/{{kebabCase name}}/package.json',
          templateFile: './package/package.json.hbs',
        },
        data.type === 'React.Component' && {
          type: 'add',
          path: '../packages/{{kebabCase name}}/src/index.js',
          templateFile: './package/index.js.hbs',
        },
        data.type === 'Stateless' && {
          type: 'add',
          path: '../packages/{{kebabCase name}}/src/index.js',
          templateFile: './package/stateless.js.hbs',
        },
        {
          type: 'add',
          path: '../packages/{{kebabCase name}}/doc.mdx',
          templateFile: './package/doc.mdx.hbs',
        },
        {
          type: 'add',
          path: '../packages/{{kebabCase name}}/src/__tests__/test.js',
          templateFile: './package/test.js.hbs',
        },
      ].filter(Boolean),
  });
};
