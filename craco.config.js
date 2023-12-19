import { resolve } from 'path';

export const eslint = {
  mode: 'file',
};
export const webpack = {
  alias: {
    '@': resolve(__dirname, 'src/'),
  },
};
