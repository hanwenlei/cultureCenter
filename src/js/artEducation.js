//模块热更新
if (process.env.NODE_ENV !== 'production') {
    require('../view/artEducation.html')
}

import '../sass/artEducation.scss';
import common from './common/common.js';

import Art from './components/Art.js';

var contain = new Vue({
	el: '#contain',
	data: function()
	{
		return{}
	},
	components: 
	{
		Art
	}
});

var container = new Vue({
	el: '#container',
	data: function()
	{
		return{}
	},
	components: 
	{
		Art
	}
});