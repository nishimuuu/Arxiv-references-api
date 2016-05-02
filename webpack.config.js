var glob = require('glob')

module.exports  = {
  entry: __dirname + '/src/components/app.js',
  output: {
    path: __dirname + '/assets/js',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
    }
    ],
    loaders: [
    {
      test: /\.js[x]?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query:{
        presets: ['react', 'es2015'],
      }
    },
   ],
    eslint: {
      configFile: './.eslintrc',
      fix: true,
      formatter: require("eslint/lib/formatters/stylish"),
    }
  },
  resolve: {
    extensions: ['','.js', '.jsx']
  }


}
