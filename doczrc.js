// import { myCoolPlugin } from 'docz-plugin-mycoolplugin'

export default {
  title: 'My Cool Project',
  description: 'This is my awesome documentation',
  themeConfig: {
    colors: {
      primary: 'tomato',
    },
  },
  modifyBundlerConfig: defaultConfig => {
    /* do your magic here */
    defaultConfig.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];

    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    defaultConfig.module.rules[0].use[0].loader = require.resolve(
      'babel-loader'
    );

    defaultConfig.module.rules[0].use[0].options = {};

    // use @babel/preset-react for JSX and env (instead of staged presets)
    defaultConfig.module.rules[0].use[0].options.presets = [
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-env'),
      require.resolve('babel-preset-docz'),
    ];

    // use @babel/plugin-proposal-class-properties for class arrow functions
    defaultConfig.module.rules[0].use[0].options.plugins = [
      require.resolve('@babel/plugin-proposal-class-properties'),
      require.resolve('@babel/plugin-syntax-dynamic-import'),
    ];

    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    defaultConfig.resolve.mainFields = ['browser', 'module', 'main'];

    return defaultConfig;
  },
};
