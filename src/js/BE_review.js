if (process.env.NODE_ENV !== 'production') {
	require('../view/BE_review.html')
}

import '../sass/BE_review.scss'

import common from './common/common.js';
import getUrlParam from './function/getUrlParam.js'
import running from './function/warning.js'
import './components/navigator.js'

import './components/BE_dropdown.js';

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
	 * 返回事件的绑定
	 */
	 $('#review .breadcrumb .arrow').on('click', function(event) {
	 	window.location.href = 'BE_articleList.html';
	 });

	/**
	 * 拉取文章信息
	 */
	 $.ajax({
	 	url:common.url + '/getArticle?id=' + getUrlParam('id'),
	 	type: 'GET',

	 })
	 .done(function(res) {
		$('review').attr('data-id', res.id)

		$('#review .title input').val(res.title);

		$('#review .author input').val(res.reporter);
		
		$('#review .img_author input').val(res.photographer);

		$('#review .department input').val(res.department);

		$('#review .newsType .item').each(function() {$(this).attr('data-id') == res.newsType ? $('#review .newsType input').val($(this).html()):''})

		$('#review .mainBody .item').each(function() {$(this).attr('data-id') == res.newsRole ? $('#review .mainBody input').val($(this).html()):''})

		editor.txt.html(res.essay.replace(/<html>|<\/html>|<body>|<\/body>/g, ''));	
	})

	/**
	 * 绑定通过和不通过事件
	 * 所有的信息需要重传并且加上状态的重传
	 */
	 $('#review .buttons>div').on('click', function(event) {
	 	var newsStatus,
	 	d = new Date();
	 	$(this).hasClass('pass') ? newsStatus = '通过' : newsStatus = '不通过';
	 	$.ajax({
	 		url: common.url + '/changeArticle',
	 		type: 'POST',
	 		contentType:"application/json;charset=UTF-8",
	 		data: JSON.stringify({
	 			'id': getUrlParam('id'),
	 			'title': $('#review .title input').val(),
	 			'reporter': $('#review .author input').val(),
	 			'photographer': $('#review .img_author input').val(),
	 			'department': $('#review .department input').val(),
	 			'newsType': $('#review .newsType input').attr('data-id'),
	 			'mainBody': $('#review .mainBody input').attr('data-id'),
	 			'essay': editor.txt.html(),
	 			'publicAt': d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(),
	 			'newsStatus': newsStatus
	 		}),
	 	})
	 	.done(function(res) {
	 		if(res === 'SUCCESS'){
	 			window.location.href = 'BE_articleList.html';
	 		}else{
	 			warning('提交失败')
	 		}
	 	})
	 	
	 });
	});