const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.tsx',
  },
  output: {
    path: path.join(__dirname, '../dist/options'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: 'ts-loader',
      },
    ],
  },
};
