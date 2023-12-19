// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  eslint: {
    mode: 'file',
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
};
