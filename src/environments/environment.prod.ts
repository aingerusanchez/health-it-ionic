declare var require: any;
const version = require('package.json').version;

export const environment = {
  production: true,
  appName: 'Health-It!',
  version
};
