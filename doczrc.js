export default {
  title: 'RevTech Media',
  description: 'Asset & component library and documentation',
  wrapper: 'packages/bootstrap/setup/docSetup',
  codeSandbox: false,
  htmlContext: {
    favicon: 'http://revtech.media/img/favicons/favicon-32x32.png',
  },
  themeConfig: {
    colors: {
      primary: '#828282',
      sidebarBg: 'white',
    },
    styles: {
      body: {
        fontFamily:
          'MuseoSans, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif',
      },
      h1: {
        fontSize: '3em',
        fontFamily: 'MuseoSans',
        fontWeight: 800,
      },
    },
  },
  modifyBundlerConfig: config => {
    const newConfig = {
      ...config,
      resolve: {
        ...config.resolve,
        mainFields: ['_module', 'module', 'main'],
      },
    };

    return newConfig;
  },
};
