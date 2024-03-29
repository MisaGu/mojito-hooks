/* eslint-disable */

// @ts-ignore
import { menus } from './hooks';

const packages = require('../package.json');

export default {
  // ssr: {},
  exportStatic: {},
  /*
  // This breaks the build (everything ends up unstyled):
  sass : {
    implementation: require('node-sass'),
  },
  cssLoader: {
    modules: true,
  },
  cssModulesTypescriptLoader: {
    mode: 'emit',
  },
  */
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  extraBabelPlugins: [
    [
      'inline-dotenv',
      {
        path: './.env.local',
      },
    ],
  ],
  devServer: {
    port: 3000,
  },
  mode: 'site',
  favicon: '/simple-logo.svg',
  logo: '/logo.svg',
  dynamicImport: {},
  manifest: {},
  hash: true,
  resolve: {
    includes: ['docs', 'src/hooks'],
  },
  links: [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/@alifd/theme-design-pro@0.6.2/dist/next-noreset.min.css',
    },
    { rel: 'stylesheet', href: '/style.css' },
  ],
  navs: {
    'en-US': [
      { title: 'Guide', path: '/guide' },
      { title: 'Hooks', path: '/hooks' },
      { title: 'Releases', path: 'https://https://github.com/mojitoinc/mixers/releases' },
      { title: 'GitHub', path: 'https://https://github.com/mojitoinc/mixers' },
    ],
  },
  menus: {
    '/': [
      {
        title: 'Home',
        path: 'index',
      },
    ],
    '/hooks': menus,
  },
  scripts: [
    `
  const insertVersion = function(){
    const dom = document.createElement('span');
    dom.id = 'logo-version';
    dom.innerHTML = '${packages.version}';
    const logo = document.querySelector('.__dumi-default-navbar-logo');
    if(logo){
      logo.parentNode.insertBefore(dom, logo.nextSibling);
    }else{
      setTimeout(()=>{
        insertVersion();
      }, 1000)
    }
  }
  insertVersion();
  `,
  ],
};
