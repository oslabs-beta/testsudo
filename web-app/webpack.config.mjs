import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.join(__dirname, '/client/index.js'), // it was set to absolute path '/client/index.js'

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    port: 8081,
    proxy: {
      '/action': 'http://localhost:3001',
      '/auth': 'http://localhost:3001',
    },
    historyApiFallback: true,
    static: path.join(__dirname, '../dist'), // '../build/client'
    hot: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { targets: 'defaults' }],
            ],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /(\.css|\.scss)$/,
        use: ['style-loader', 'css-loader', ], // added 'sass-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './client/assets/favicon.png',
    }),
  ],
};

export default config;
