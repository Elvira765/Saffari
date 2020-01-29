const SvgStorePlugin = require('external-svg-sprite-loader');

const path = require('path');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MediaQueryPlugin = require('media-query-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

let pages = glob.sync(__dirname + '/source/pages/*.pug');
const plugins = [
  new CleanWebpackPlugin(['dist']),
  new MiniCssExtractPlugin({
    filename: "./assets/styles/[name].css",
    chunkFilename: "./assets/styles/[name].css"
  }),
  new CopyWebpackPlugin([
    {
      from: './source/static',
      to: './',
      ignore: ['*.md']
    }
  ]),
  new SvgStorePlugin({
    sprite: {
        startX: 10,
        startY: 10,
        deltaX: 20,
        deltaY: 20,
        iconHeight: 20,
    },
    prefix: 'usage',
    suffix: ''
  }),
  new MediaQueryPlugin({
    include: [
        'autoload'
    ],
    queries: {
        '(min-width: 1280px)': 'desctop_lg',
        '(min-width: 1024px)': 'desctop_md',
        '(min-width: 1023px)': 'tablet',
        '(min-width: 768px) and (max-width: 1279px)': 'tablet',
        '(min-width: 768px)': 'tablet',
    }
  })
];
pages.map(function (file) {
  let base = path.basename(file, '.pug');
  plugins.push(new HtmlWebpackPlugin({
    filename: './' + base + '.html',
    template: './source/pages/' + base + '.pug',
    inject: false
  }));
});

module.exports = {
  entry: {
    main: './source/autoload.js',
  },
  output: {
    filename: './assets/scripts/[name].bundle.js',
    chunkFilename: './assets/scripts/chunk/[id]-[hash].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/"
  },
  mode: "production",
  plugins,
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, 'source/base/fonts')],
        use: [
          "css-loader",
          {
            loader: "sass-loader",
            options: {
                includePaths: [
                  path.resolve(__dirname,'source/base/styles')
                ]
            }
          },
        ]
      },
      {
        test: /\.scss$/,
        exclude: [path.resolve(__dirname, 'source/base/fonts')],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './../../'
            }
          },
          "css-loader",
          {
            loader: 'group-css-media-queries-loader'
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')({browsers: "last 5 versions"})
                ];
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
                includePaths: [
                  path.resolve(__dirname,'source/base/styles')
                ]
            }
          },
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        }]
      },
      {
        loader: SvgStorePlugin.loader,
        test: /\.svg$/,
        options: {
          iconName: '[name]-usage',
          name: './assets/sprite.svg',
        },
      },
      {
        test: /\.(png|jpg?)(\?.+)?$/,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name].[ext]',
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "assets/fonts/[name].[ext]",
          },
        }],
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "pug-loader",
            options: { pretty: true }
          }
        ]
      }
    ]
  },
  // watch: true,
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendor',
  //         chunks: 'all',
  //       }
  //     }
  //   },
  //   minimizer: [
  //     new UglifyJSPlugin({
  //       sourceMap: true,
  //       uglifyOptions: {
  //         compress: {
  //           inline: false
  //         }
  //       }
  //     }), new OptimizeCSSAssetsPlugin({}),], //git false,
  // },
  devServer: {
    //contentBase: path.resolve(__dirname, './source/pages/'),
    watchContentBase: true,
    port: 9001,
    open: true,
    disableHostCheck: true,
    noInfo: true,
    compress: true,
    hot: false,
    stats: 'minimal',
    publicPath: "/"
  }
};
