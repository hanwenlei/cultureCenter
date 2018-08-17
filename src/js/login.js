if (process.env.NODE_ENV !== 'production') {
	require('../view/login.html')
}

import '../sass/login.scss';
import common from './common/common.js';
import warning from './function/warning.js';


$(document).ready(function() {
	getCode();

	$(document).on('keypress', function(event) {
		if(event.which == 13) {  
			$("#login .submit").click();
		}
	});

	$('#login .selector div').on('click', function(event) {
		event.preventDefault();
		$(this).addClass('active').siblings().removeClass('active');
	});

	
	$('#login .ver_code_img').on('click', function(event) {
		event.preventDefault();
		getCode();
	});
	
	$('#login .submit').on('click', function(event) {

		if($('#login .input_container .username').val() === '' ||
			$('#login .input_container .password').val() === '' ||
			$('#login .input_container .password').val() === ''){
			warning('输入不能为空');
		return ;
	}

	var auth, turnTo;
	if($('#login .selector .admin').hasClass('active') === true){
		auth = 1;
		turnTo = 'BE_carousel.html'
	}else{
		auth = 2;
		turnTo = 'BE_edit.html'
	}

	$.ajax({
//		url: common.url + '/logIn',
		url: '/api/news/logIn',
		type: 'POST',
		contentType:"application/json",
		data: JSON.stringify({
			'username': $('#login .input_container .username').val(),
			'password': $('#login .input_container .password').val(),
			'code': $('#login .input_container .ver_code').val(),
			'authority': auth
		}),
		withCredentials:true
	})
	.done(function(res) {
		if(res === 'SUCCESS'){
			window.location = turnTo;
		}else if(res === 'USERNAME_OR_PASSWORD_ERROR' || 'AUTH_ERROR'){
			warning('用户名或密码错误')
		}else if(res === 'ERROR_CODE'){
			warning('验证码错误')
		}else if(res === 'NOT_EXIST'){
			warning('用户名不存在')
		}
	})
});
});

function getCode(){
	$.ajax({
//		url: common.url + '/getCode',
		url: '/api/news/getCode',
		type: 'GET',
		header:{
			'Access-Control-Allow-Origin': '*'
		}
	})
	.done(function(res) {
	console.log(res)//base64
	$('#login .ver_code_img').attr('src',res);
})

}