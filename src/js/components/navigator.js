import common from '../common/common.js'

/**
 * 后台接口未写，只是使用了框架实现，请求后302跳转后400，但确实登出，故使用always回调
 */
$(document).ready(function() {
	$('#navigator .exit').on('click', function(event) {
		event.preventDefault();
		$.ajax({
			url: common.url + 'logout',
			type: 'GET',
		})
		.always(function() {
			window.location.href = 'login.html'
		});
		
	});
});