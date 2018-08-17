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
        // proxyTable: {},

        proxy: {
            '/news':{
                target: 'http://118.24.107.139:8080/',
                secure: false,
            },
		// },
		// proxy:{
			'/api': {
                target: 'http://118.24.107.139:8080/',
                changeOrigin: true,
				secure: false,
                // pathRewrite: {
                //     '^/api': '/'
                // }
			}

		}

	},

	plugins:[

	new webpack.HotModuleReplacementPlugin(),

	new webpack.NoEmitOnErrorsPlugin(),

	new webpack.NamedModulesPlugin()

	]
}

// Object.keys(proxy).forEach(function (context) {
//     var options = proxyTable[context]
//     if (typeof options === 'string') {
//         options = {
//             target: options,
//             onProxyRes(proxyRes, req, res) {
//                 //set-cookie:JSESSIONID=6F766ED2EEEBEAA9245F7F908A848857; Path=/webserver/; HttpOnly
//
//                 var oldCookie = proxyRes.headers['set-cookie']
//                 if(oldCookie== null || oldCookie.length==0){
//                     delete proxyRes.headers['set-cookie']
//                     return
//                 }
//                 console.log(oldCookie)
//                 var oldCookieItems = oldCookie[0].split(';')
//                 var newCookie = ''
//                 for(var i=0; i < oldCookieItems.length; ++i){
//                     if(newCookie.length >0)
//                         newCookie += ';'
//                     if(oldCookieItems[i].indexOf('Path=') >= 0)
//                         newCookie += 'Path=/'
//                     else
//                         newCookie += oldCookieItems[i]
//                 }
//                 proxyRes.headers['set-cookie'] = [newCookie]
//                 //proxyRes.headers['x-addedygc'] = 'foobar';     // add new header to response
//                 //delete proxyRes.headers['connection'];       // remove header from response
//             }
//         }
//     }
//     app.use(proxyMiddleware(context, options))
// })