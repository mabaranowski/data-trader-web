const version = require('../version.js');
const sh = require('shelljs');

const imageName = 'data-trader-web';

sh.exec(`docker build -t ${imageName}:latest -t ${imageName}:${version} .`);

