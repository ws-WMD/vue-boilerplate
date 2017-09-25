'use strict';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir)
}

exports.mode = 'single';

exports.servers = {
  '#_serverName': {
    host: 'ip', // 服务器ip
    post: 123, // 端口
    local: './', // 默认当前目录
    path: '服务器上存放文件的地址'
  }
};

/** 如果需要严格执行的话，需要做配置
exports.lint = { // 基于standard的
  cwd: 'src/js', // 选择需要校验的文件路径，默认是src
  opts: {
    ignore: [],   // glob 形式的排除列表 (一般无须配置)
    fix: false,   // 是否自动修复问题
    globals: [],  // 声明需要跳过检测的定义全局变量
    plugins: [],  // eslint 插件列表
    envs: [],     // eslint 环境
    parser: ''    // js 解析器（例如 babel-eslint）
  }
};
*/

/**
 exports.entryExtNames = {
  css: ['.css', '.scss', '.sass', '.less'],
  js: ['.js', '.jsx', '.vue']
};
*/

function cssLoaders(options) {

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: options.env === 'production'
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {})
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: 'vue-style-loader'
    })
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}
exports.config = function () {
  return {
    webpackConfig: function webpackConfig(config, options) {
      config.resolve.alias = {
        'vue$': 'vue/dist/vue.esm.js',
        // '@': '/src'
        '@': resolve('src'),
        'utils': resolve('src/utils')
      };
      config.module.rules = config.module.rules.concat([
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: cssLoaders(options)
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [resolve('src')]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'img/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.s[a|c]ss$/,
          loader: 'style!css!sass'
        }
      ]);
      config.plugins.push(new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.env === 'production'? options.env: 'development')
        },
        BASE_URL: JSON.stringify('https://www.easy-mock.com/mock/590c349f87cce4690fed000b/boui')
      }))
      var filename = 'style@[chunkhash].css';
      if (options.env === 'development') {
        filename = 'style@dev.css'
      } else if (options.env === 'location') {
        filename = 'style.css'
      }
      config.plugins.push(new ExtractTextPlugin({
        filename: filename
      }));
      config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module, count) {
          // any required modules inside node_modules are extracted to vendor
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(
              path.join(__dirname, 'node_modules')
            ) === 0
          )
        }
      }));
      config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor']
      }));
      return config; // return {jsConfig: jsConfig, cssConfig: cssConfig};
    },
    exports: [
      'main.js'
    ]
  };
};
