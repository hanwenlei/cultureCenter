//模块热更新
if (process.env.NODE_ENV !== 'production') {
    require('../view/leadershipEducation.html')
}

import '../sass/leadershipEducation.scss';
import common from './common/common.js';

import Leadership from './components/Leadership.js';

var container = new Vue({
	el: '#container',
	data: function()
	{
		return{}
	},
	components: 
	{
		Leadership
	}
});