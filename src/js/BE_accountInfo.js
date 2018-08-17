if (process.env.NODE_ENV !== 'production') {
	require('../view/BE_accountInfo.html')
}

import '../sass/BE_accountInfo.scss';
import common from './common/common.js';

import warning from './function/warning.js';
import './components/navigator.js';

$(document).ready(function() {
	
	
	$(document).on('keypress', function(event) {
		if(event.which == 13) {  
			$("#accountInfo .submit").click();
		}
	});



	$('#accountInfo .submit').on('click', function(event) {

		if($('#accountInfo .old_password input')[0].value === '' ||
			$('#accountInfo .new_password input')[0].value === '' ||
			$('#accountInfo .new_password input')[1].value === '') {
			warning('输入不能为空');
		return;
	}else if($('#accountInfo .new_password input')[0].value !== $('#accountInfo .new_password input')[1].value) {
		warning('两次输入密码不一致');
		return;
	}

	$.ajax({
		url: common.url + '/changePassword',
		type: 'POST',
		contentType:"application/x-www-form-urlencoded",
		data: {
			'oldPassword': $('#accountInfo .old_password input')[0].value,
			'newPassword': $('#accountInfo .new_password input')[0].value
		},
	})
	.done(function(res) {
		console.log(res);
		if(res === "SUCCESS"){
			warning('修改成功');
		}else if(res === 'OLD_PASSWORD_ERROR'){
			warning('密码错误');
		}else if(res === 'ERROR'){
			warning('修改失败');
		}
	})
});

});