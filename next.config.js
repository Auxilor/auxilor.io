const path = require('path');

module.exports = {
  reactStrictMode: true,
  target: 'serverless',
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'styles')
    ]
  }
};