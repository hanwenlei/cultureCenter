const webpack = require('webpack')
const path = require('path')

module.exports = {
	devtool: "cheap-module-eval-source-map",

	devServer: {
		port: 8080,
		host: '0.0.0.0',
		inline:true,
		hot: true,
		contentBase: path.join(__dirname, "dist"),
		publicPath: '/',
		overlay:{
			errors:true,
		},

        proxy: {
            '/news':{
                target: 'http://118.24.107.139:8080/',
                secure: false,
            },
		},
		proxy:{
			'/api': {
                target: 'http://118.24.107.139:8080/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
			}

		}

	},

	plugins:[

	new webpack.HotModuleReplacementPlugin(),

	new webpack.NoEmitOnErrorsPlugin(),

	new webpack.NamedModulesPlugin()

	]
}