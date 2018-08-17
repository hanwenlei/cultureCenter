if (process.env.NODE_ENV !== 'production') {
	require('../view/BE_carousel.html')
}

import '../sass/BE_carousel.scss';

import common from './common/common.js';
import EventUtil from './common/EventUtil.js';

import createObjectURL from './function/createObjectURL.js';
import warning from './function/warning.js';

import './components/navigator.js'

$(document).ready(function() {
	$(window).on('click', function(event) {
		$('#carousel_setting .thumbnail .lists').each(function() {
			$(this).removeClass('active');
		})
	});

	/**
	 * 获取在播图片的地址
	 * 返回一个含有图片地址的数组
	 * 访问图片的地址是https://www.eunieunieuni.xin/news/carousel/0b7375df-6049-4e16-a80e-c75493083011.jpg
	 * 返回的地址是含有服务器目录的/root/apache-tomcat-8.5.16/webapps/news/carousel/0b7375df-6049-4e16-a80e-c75493083011.jpg
	 */
	 $.ajax({
//	 	url: common.url + '/getVisibleCarousel',
		url: '/api/news/getVisibleCarousel',
	 	type: 'GET',
	 })
	 .done(function(res) {
	 	res.forEach(function(item,index){
	 		var stringNumber = res[index].indexOf('carousel'),
	 		string = res[index].substring(stringNumber),
	 		item = document.createElement('div');
	 		item.className = 'item';
	 		item.innerHTML = '<div class="thumbnail"><img src="' + common.url + string + '"><ul class="lists"></ul></div><div class="right"><div class="thumbnail_url"><span class="link">链接：</span><span class="input" contenteditable="true">' + common.url + string + '</span></div><div class="bottom"><div class="submit" data-id="' + (index + 1) + '">确定变更</div></div>';
	 		document.getElementById('carousel_setting').appendChild(item);

	 	})
	 	getAllCarousel();
	 })

	/**
	 * 用于获取所有已上传的轮播图
	 * 返回同上
	 */
	 function getAllCarousel() {
	 	$.ajax({
//	 		url: common.url + '/getAllCarousel',
	 		url: '/api/news/getAllCarousel',
	 		type: 'GET',
	 	})
	 	.done(function(res) {
	 		var lists = '';
	 		res.forEach(function(item,index){
	 			var stringNumber = res[index].indexOf('img'),
	 			string = res[index].substring(stringNumber);
	 			lists += '<li class="img_list"><img src="'  + common.url+ "/"+string + '"><span class="delete">×<span></li>';

	 		});

	 		/**
	 		 * 横向滚动的实现
	 		 */
	 		 $('#carousel_setting .thumbnail .lists').each(function() {
	 		 	$(this).html('');
	 		 	$(this).append(lists);
	 		 	$(this).mousewheel(function(event, delta) { 
	 		 		var left=$(this).scrollLeft(); 
	 		 		$(this).scrollLeft(left-(delta * 100)) 
	 		 		event.preventDefault(); 
	 		 	});
	 		 })

	 		/**
	 		 * 图片点击后出现下拉框
	 		 */
	 		 $('#carousel_setting .thumbnail >img').each(function() {
	 		 	$(this).on('click', function(event) {
	 		 		event.stopPropagation(); 
	 		 		$('#carousel_setting .thumbnail .lists').each(function() {
	 		 			$(this).removeClass('active');
	 		 		})

	 		 		$(this).siblings().addClass('active');
	 		 	});
	 		 })

	 		/**
	 		 * 图片的切换
	 		 */
	 		 $('#carousel_setting .thumbnail .img_list').each(function() {
	 		 	$(this).on('click', function(event) {
	 		 		$(this).parent().siblings().attr('src', $(this).children().attr('src'));
	 		 	});
	 		 });

	 		/**
	 		 * 阻止外层滚动条滚动
	 		 */
	 		 $('#carousel_setting .thumbnail .lists').each(function() {
	 		 	$(this).hover(function(){
	 		 		var top= $(window).scrollTop();		    
	 		 		$(window).scroll(function(){ 
	 		 			$(window).scrollTop(top);		  
	 		 		});	   
	 		 	},function(){
	 		 		$(window).off("scroll");	    
	 		 	});
	 		 })

	 		/**
	 		 * 绑定更换事件
	 		 * 访问图片的地址是https://www.eunieunieuni.xin/news/carousel/0b7375df-6049-4e16-a80e-c75493083011.jpg
	 		 * 参数是轮播图的位置和新图的地址
	 		 * 上传的地址是/root/apache-tomcat-8.5.16/webapps/news/carousel/0b7375df-6049-4e16-a80e-c75493083011.jpg
	 		 */
	 		 $('#carousel_setting .submit').each(function(index, el) {
	 		 	$(this).on('click', function(event) {
	 		 		// console.log($(this).parent().parent().siblings().children('img').attr('src'));
	 		 		var	newPath = $(this).parent().parent().siblings().children('img').attr('src'),

	 		 		stringNumber = newPath.indexOf('img');
						console.log(newPath.substring(stringNumber));
						console.log(newPath);
	 		 		var newPathUpload = '/home/ubuntu/' + newPath.substring(stringNumber);
	 		 		let imgPath='http://222.197.183.55:8081/news/'+newPath.substring(stringNumber);
	 		 		var numth=$(this).attr('data-id');
	 		 		console.log(numth);
	 		 		// $(".d-block")[numth].attr('src',imgPath);
	 		 		console.log(newPathUpload);
	 		 		// console.log($(this).attr('data-id'));
	 		 		// console.log(newPathUpload);
	 		 		$.ajax({
//	 		 			url: common.url + '/changeVisible',
	 		 			url: '/api/news/changeVisible',
	 		 			type: 'POST',
	 		 			data: {
	 		 				"newPath": newPathUpload,
	 		 				'nowPlace': numth
								// $(this).attr('data-id')
	 		 			},

	 		 		})
	 		 		.done(function(res) {
	 		 			console.log(res);
	 		 			if(res === 'SUCCESS'){
	 		 				warning('更改成功')
	 		 			}
	 		 		})
	 		 		.fail(function() {
	 		 			warning('更改失败')
	 		 		}) 		

	 		 	});
	 		 });

	 		/**
	 		 * 访问图片的地址是https://www.eunieunieuni.xin/news/carousel/0b7375df-6049-4e16-a80e-c75493083011.jpg
	 		 * 参数是删除图片的地址
	 		 * 上传的地址是/root/apache-tomcat-8.5.16/webapps/news/carousel/0b7375df-6049-4e16-a80e-c75493083011.jpg
	 		 */
	 		 $('#carousel_setting .delete').each(function(index, el) {
	 		 	$(this).on('click', function(event) {
	 		 		event.stopPropagation(); 
	 		 		var	newPath = $(this).siblings('img').attr('src'),
	 		 		stringNumber = newPath.indexOf('img'),
	 		 		pathDelete = '/home/ubuntu/' + newPath.substring(stringNumber);
	 		 		console.log(pathDelete);
	 		 		$.ajax({
//	 		 			url: common.url + '/deleteCarousel',
	 		 			url: '/api/news/deleteCarousel',
	 		 			type: 'POST',
	 		 			data: {'oldPath': pathDelete},
	 		 		})
	 		 		.done(function(res) {
	 		 			if(res === 'SUCCESS'){
	 		 				warning('删除成功');
	 		 				getAllCarousel();
	 		 			}else{
	 		 				warning('删除失败');
	 		 			}
	 		 		})
	 		 		.fail(function() {
	 		 			warning('删除失败');
	 		 		});
	 		 		
	 		 	});
	 		 });
	 	/**
	 	 *
	 	 */
	 	});	
	 }

	 var imgJudge = true;
	/**
	 * 用于图片加载
	 */
	 $('.container .fileReader').on('change', function(event) {
	 	var reader = new FileReader(),
	 	files = $('.container .upload_button .fileReader')[0].files[0];
	 	// console.log(files);
	 	if(/image/.test(files.type)){
	 		console.log(files.type);
	 		reader.readAsDataURL(files);
	 		imgJudge = true;
	 	}else{
	 		warning('请传入图片文件')
	 		imgJudge = false;
	 	}

	 	reader.onerror = function() {
	 		warning('读取失败')
	 	}

	 	reader.onload = function() {
	 		warning('读取成功')
	 	}
	 });

	/**
	 * 用于点击上传文件
	 */
	 $('.container .upload_button #upload_icon').on('click', function(event) {
			// console.log($('.container .upload_button .fileReader')[0].files[0]);
			var files = $('.container .upload_button .fileReader')[0].files[0];
			// console.log(files);
			if(files !== undefined){
				if(imgJudge === true){
					warning('添加文件成功');
					var data = new FormData();
					data.append('photo', files);
					console.log(data.formatFileSize);
					// console.log(common.url);
					$.ajax({
//						url: common.url + '/uploadCarousel',
						url: '/api/news/uploadCarousel',
						type: 'POST',
						data: data,
						// photo:files,
						processData:false,
						contentType:false,
					})
					.done(function(res) {
						console.log(res);
						if(res === 'SUCCESS'){
							warning('上传成功');
							getAllCarousel();
						}else{
							warning('上传失败');
						}
					})
					.fail(function() {
						warning('上传失败')
					})
				}else{
					warning('请传入图片文件')
				}
			}else{
				warning('未添加文件')
			}
		});

/**
 * 
 */
});