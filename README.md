# RTM Kit

![Build Status](https://codebuild.ap-southeast-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiVVkvQkdpWVVZcU1zRHNYN0tNdjJYV0t6N1l3bG1tL3Y5WWE0R1MwaExPOUpSVU51cm1XZDJVcHRLTmtyaDNKc3IreXFpZnNDU3EwSkZzNER4YzUyblY0PSIsIml2UGFyYW1ldGVyU3BlYyI6ImUvSGxpZTF5eTZHOXlKMFciLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

## General Information

This is a monorepo, which means that each folder under the `package` directory is it's own npm package. We are hosting our own private npm repository, which means that any of our packages will be served from there, and all others will fall back to npm.

You'll need to make sure you have the right credentials so that you can pull from our private npm registry. This can be done via a `.npmrc` file, which can either exist in your $HOME directory or in the project root. For this project, we'll keep it out of the project root and instead rely on each developer to have their own `.npmrc`. It should look something like this:

```sh
# In ~/.npmrc
//repo.revtech.media/dev/registry/:_authToken=<TOKEN> # Be sure this token is present
@rtm-ui:registry=https://repo.revtech.media/dev/registry/ # Only @rtm-ui scopes
always-auth=true
registry=http://registry.npmjs.org/ # All other packages
```

## Lerna

[Lerna](!https://lernajs.io/) is a tool for managing monorepos, it handles dependencies and versioning. One of it's key features is to share a common `node_modules` directory so that if two packages require the same package you'll still only need to store it once. It also ensures that we follow semantic versioning by automatically bumping the versions of our packages based on [conventional commits](#conventional-commits).

# Getting Started

### Install dependencies

```sh
npm install
```

> We're using `npm` for this instead of `yarn`. So all scripts should be run with `npm run <command>` rather than `yarn <command>`.

### Link packages

```sh
lerna link
```

This step will ensure that each package has linked together.

### Run tests

```
npm run test:watch
```

This will watch all files for changes and run tests in the package that contains
the changed file only.

```
npm run test:coverage
```

This will run all the tests and dump out coverage reports for each of them. All tests should be passing and at this point you're ready to start working. Read more about [testing](#testing)

To run a test in an individual package:

```sh
lerna run test --stream --scope @rtm-ui/phoneback -- -- --watch
```

Or:

```sh
lerna run test --stream --scope @rtm-ui/phoneback -- -- --coverage
```

---

From here there are a few things you can do:
- [Create a new package](#create-a-package) - use our template to bootstrap a new package in seconds
- [Work on an existing package](#start-the-dev-server)
- [Link a package](#npm-link) - you can link the package you're working on to the external project you need it for (ex. One Big Switch rails app).

## Create a Package

[Example](https://www.useloom.com/share/31a383fccbc44d8fb7a338d52ce311f4)

We have a package generation template which can be found in `templates/package`. To create a new package:

```sh
npm run generate
```
This will bring up a prompt

```sh
➜  npm run generate

> @ generate /Users/jeffsee/code/obs/rtm-kit
> plop --plopfile ./templates/plopfile.js

? name of new package # enter your package name here. Ex. form
? Will the core component be stateless? React.Component
[SUCCESS] add /rtm-kit/packages/form/package.json
[SUCCESS] add /rtm-kit/packages/form/src/index.js
[SUCCESS] add /rtm-kit/packages/form/doc.mdx
[SUCCESS] add /rtm-kit/packages/form/src/__tests__/test.js
```

As you can see, this will create a component with tests and documentation ready to go (by default we provide 1 failing spec and 1 passing spec to get you started).

You should make sure the `package.json` has any dependencies you'll need, look around at some other packages to see how they're structured.

At this point you should be ready to [start the dev server](#start-the-dev-server).

> Note: We use peerDependencies in order for us to be able to skip bundling things like `styled-components` and `react` in each package's dependencies. Doing so would mean we'd to be pretty strict with our versions and we'd ideally like to allow the package consumer (ie. react application) to be the one deciding specific package versions.

## Installing a new package
To install a 3rd-party package:
```sh
lerna add @some/package packages/<pattern>

# To add react to button
lerna add react packages/button

# To add react to all pacakges
lerna add react
```
See [here](https://github.com/lerna/lerna/tree/master/commands/add) from more info. There
are a lot of lerna commands that may be helpful to [review](https://github.com/lerna/lerna/tree/master/commands)

## Start the dev server
Ensure you're at the root of project

```sh
npm run dev
```

This will start the [Docz](https://docz.site) webpack dev server. Docz has it's own webpack process and will start to watch your files and and implement hot-reloading.

### The Bootstrap Component
This component is aimed at "bootstrapping" any environment with the essential context for our applications to work. It's main goal is to provide theming and tracking contexts so that other components just work. It's also being used as a wrapper for the Docz site as well as Jest's unit tests.

## Linking for local development

For webpack builds in other repos, we should be able to specify this repo's local path as
an [alias](https://webpack.js.org/configuration/resolve/#resolvealias)

If your project is adjacent to rtm-kit, you can provide a configuration like this:

```js
module.exports = {
  //...
  resolve: {
    alias: {
      "@rtm-ui": path.resolve(__dirname, "../../rtm-kit/packages")
    }
  }
};
```
This would remove any need for `npm link`, your webpack environment should pick up any
changes to your rtm-kit packages.

## Watch

While using Docz for local development, you won't need to worry about cross-package
dependencies, as it's webpack config will automatically pick up changes. However if you're running tests in package that has other package dependencies or if you're working on another app with this repo aliased - you'll want to run the watch command so that each change triggers a build:

```sh
# from the root of the repo
npm run watch
```

Running commands on individual packages

```sh
# Specify stream to view the output of each command
lerna run build --scope @rtm-ui/my-package --stream
```

---

# Testing

We use a couple of libraries to help with testing, the main ones are [jest](http://jestjs.io/docs) and [react-testing-library](https://github.com/kentcdodds/react-testing-library), both of which have very thorough documentation. You can also get a ton of info from [Kent C Dodds](https://www.youtube.com/channel/UCz-BYvuntVRt_VpfR6FKXJw), who created `react-testing-library` by watching some of his YouTube videos.

## Setup
We use a custom renderer for all of our unit tests, this renderer just wraps each test in our [`Bootstrap`](#the-bootstrap-component) component so that we have theme and tracking context - you shouldn't have to worry about it too much but if you need to troubleshoot something you can find the wrapper in `packages/bootstrap/setup/testSetup.js`.

## Mocking
There are several examples of how to mock a module, and in ideal scenarios you can simply mock the entire module as shown [here](https://jestjs.io/docs/en/mock-functions#mocking-modules). However, sometimes you need _part_ of a module, which can be tricky. There's an example of this in `packages/button/src/__tests__/test.js`.

---

# RTM Scripts
The development process for this project consists of 3 parts: testing, development, & builds. For local development we use Docz, a static site generator that's build on top of MDX so we can mix markdown and JSX. For the other two tasks we rely on a separate package called `@rtm/core`. It's heavily inspired by [React scripts](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts) and it bundles the build, test, and linting processes so any package doesn't need to add these things itself.

RTM Scripts acts as a single source of truth for how we build and test things. You'll notice that the root of this repo and all of the other packages don't contain much build or test configuration, that's the job of `@rtm/core`.

---

# The package.json file
For each package, we have a `package.json`, and the goal is to keep them as simple and lean as possible.

The `rtmRollup` key is responsible for telling `@rtm/core` how to build packages. We've
made a decision to not allow any default exports from packages, and there's a test that
will fail when a module includes a default export.

```
{
  "name": "@rtm-ui/button",     # from npm run generate
  "version": "1.0.5",           # managed by lerna
  "description": "Description for Bootstrap",
  "author": "RevTech Media",
  "license": "UNLICENSED",
  ...
  "rtmRollup": {                # rollup needs some context
    "namespace": "button",      # -> /build/button.version.min.js
    "namedExports": [
      "ButtonGroup"             # import { ButtonGroup } from ...
    ]
  },
  "scripts": {
    ...
  },
  "dependencies": {             # These will be included in the build
    ...
  },
  "devDependencies": {
    ...
  }
}
```

---

# [Conventional Commits](https://conventionalcommits.org/)
While it's useful to have multiple packages in one repo, it can be difficult to understand which commits affect which packages and even harder to know which version brought in a given change. The challenge here is that each meaningful commit has to have some specific keywords in it for lerna to know how it should bump a version number or what to put in the CHANGELOG. To help with this we have an npm task called `commit`.

When commiting, instead of running `git commit -m "My message"`, you can instead do:

```sh
npm run commit # or git cz if you've done npm install -g commitizen
```
[Example usage](https://www.useloom.com/share/1612e0940c124a749b6455e64e810013)

This will bring up a prompt to walk you through a "conventional commit", it will ask you to identify the type of change (feature/bug/documentation) as well as which files are affected. __You should try your best to let this methodology guide your workflow, keeping commits across multiple packages separate__.

### Examples:
Docz follows the same convention and has a really helpful [CHANGELOG](https://github.com/pedronauck/docz/blob/master/packages/docz-core/CHANGELOG.md) as a result. It might be helpful to read through some of their commit history to see how useful this is.

---

# Deployment

Thanks to semantic versioning, we know that any projects relying on our packages won't get a breaking change by accident. Every commit to `master` is essentially a deploy and it's up the individual project to bump it's version of our packages to get the updated code.

Whenever a commit to `master` is made, AWS Codebuild picks up the change from a Github hook and runs the steps defined in `buildspec.yml`. The main goal of the process is to test and publish the packages to our npm registry.

- Lerna is responsible for bumping the version of each package and will commit the change back to Github. This is where our "conventional commits" come in handy.
- The content of each pacakge is stored in an S3 bucket, which is used by our private npm registry whenever you run `npm install @rtm-ui/foo`.
- Additionally, Codebuild runs `npm run build`, the result of the build process is also stored as an artifact (a separate S3 bucket). The contents of this bucket, which in most cases is a just a minified build file, are synced across to yet another S3 bucket which serve as a CDN via AWS Cloudfront (work in progress).
