const { resolve } = require('path');
const DefinePlugin = require('webpack').DefinePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pkg = require('../../package.json');

let githuburl = pkg.repository;
githuburl = (typeof githuburl === 'object' ? githuburl.url : githuburl);
githuburl = githuburl.length ? githuburl.replace(/^git\+/, '') : '';

const githubuser = githuburl.length ? githuburl.replace(/^https:\/\//, '').split('/')[1] || '' : '';

const build = {
  ...pkg.build,
  title: pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1),
  version: pkg.version,
  description: pkg.description,
  docs: `https://${githubuser}.github.io/${pkg.name}/`,
  repo: githuburl
};

const src = 'src';
const dist = 'dist';
const pub = 'public';
const entry = `./${src}/example`;

module.exports = {

  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: `${entry}`,

  devServer: {
    historyApiFallback: true,
  },

  output: {
    path: resolve(`${dist}`),
    filename: `bundle.[hash].js`,
    publicPath: '/'
  },

  plugins: [

    new DefinePlugin({
      __DEV_VARS__: JSON.stringify(build)
    }),

    new CopyWebpackPlugin([
      { from: resolve(`${pub}`), to: resolve(`${dist}`) }
    ]),

    new HtmlWebpackPlugin({
      title: 'Octo',
      template: resolve(`${src}/index.html`),
      hash: true,
    })

  ]

};
