if (process.env.NODE_ENV !== 'production') {
	require('../view/BE_edit.html')
}

import '../sass/BE_edit.scss'
import common from './common/common.js'

import './components/navigator.js'
import './components/BE_dropdown.js';
import warning from './function/warning.js'

$(document).ready(function() {
	var E = window.wangEditor;
	var editor = new E("#editor");
	/**
	 * https://www.kancloud.cn/wangfupeng/wangeditor3/335782
	 */
	 editor.customConfig.uploadFileName = 'photo';
	 editor.customConfig.uploadImgServer = common.url + 'uploadImg';
	 editor.customConfig.uploadImgHooks = {
	 	customInsert: function (insertImg, result, editor) {
	 		var url = result.url,
	 		stringNumber = url.indexOf('upload'),
	 		imgUrl = common.url + url.substring(stringNumber);
	 		console.log(imgUrl);
	 		insertImg(imgUrl)
	 	}
	 }
	 editor.create();

	/**
	 * 上传按钮的绑定
	 */
	 $("#edit .buttons .submit").on('click', function(event) {
	 	var d = new Date();
	 	$.ajax({
	 		url: common.url + '/saveArticle',
	 		type: 'POST',
	 		contentType:"application/json",
	 		data: JSON.stringify({
	 			'title': $('#edit .title input').val(),
	 			'reporter': $('#edit .author input').val(),
	 			'photographer': $('#edit .img_author input').val(),
	 			'department': $('#edit .department input').val(),
	 			'newsType': $('#edit .newsType input').attr('data-id'),
	 			'newsRole': $('#edit .mainBody input').attr('data-id'),
	 			'essay': editor.txt.html(),
	 		}),
	 	})
	 	.done(function(res) {
	 		if(res === 'SUCCESS'){
	 			warning('提交成功');
	 		}else{
	 			warning('提交失败')
	 		}
	 	})
	 	.fail(function() {
	 		warning('提交失败')
	 	})		
	 });
	});