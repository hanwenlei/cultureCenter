if (process.env.NODE_ENV !== 'production') {
	require('../view/BE_articleList.html')
}

import '../sass/BE_articleList.scss';

import common from './common/common.js';
import './components/navigator.js';
import warning from './function/warning.js';

$(document).ready(function() {
	var page = 1,
	numberPerPage = 10,
	getButton = true,
	totalPage;

	pageSwitch(page);

	function pageSwitch(page) {
		/**
		 * 获取信息
		 */
		 $.ajax({
		 	url: common.url + '/verify?page=' + page,
		 	type: 'GET',
		 })
		 .done(function(res) {
		 	totalPage = Math.ceil(res.count / numberPerPage)

		 	$('#articleList .table_body').html('');

		 	res.articles.forEach(function(elem, index) {
		 		var item = document.createElement("div");
		 		item.className = 'item';
		 		item.innerHTML = '<div class="title">' + 
		 		elem.title + '</div><div class="contributor">' + 
		 		elem.reporter + '</div><div class="date">' + 
		 		elem.submitAt + '</div><div class="status">' + 
		 		elem.newsStatus + '</div><div class="operation" data-id="' + 
		 		elem.id + '"><span class="review">审核</span> | <span class="delete">删除</span></div>'
		 		$('#articleList .table_body').append(item);
		 	});

		 	/**
		 	 * 判断是否为第一次打开页面
		 	 */
		 	 if(getButton === true){
		 	 	getButton = false;

		 	 	/**
		 	 	 * 动态添加切页的按钮数量
		 	 	 */
		 	 	 for (var i = 1; i < totalPage; i++){
		 	 	 	$('#articleList .table_selector .page_selector').append('<span class="switch">' + (i + 1) + '</span>');
		 	 	 }



		 	/**
		 	 * 绑定点击切换事件
		 	 */
		 	 $('#articleList .table_selector .switch').on('click', function(event) {
		 	 	$(this).addClass('selected').siblings('.switch').removeClass('selected');
		 	 	console.log('dddd');
		 	 	page = $(this).html();
		 	 	pageSwitch(page);
		 	 });
		 	 
		 	}

		 	/**
		 	 * 绑定审核点击事件
		 	 */
		 	 $('#articleList .table_body .operation .review').on('click', function(event) {
		 	 	window.location.href = 'BE_review.html?id=' + $(this).parent().attr('data-id');
		 	 });

		 	/**
		 	 * 绑定删除点击事件
		 	 */
		 	 $('#articleList .table_body .operation .delete').on('click', function(event) {
		 	 	$.ajax({
		 	 		url: common.url + '/deleteArticle?id=' + $(this).parent().attr('data-id'),
		 	 		type: 'GET',
		 	 	})
		 	 	.done(function(res) {
		 	 		if(res === "SUCCESS"){
		 	 			pageSwitch(page);
		 	 		}else{
		 	 			warning('删除失败')
		 	 		}
		 	 	})
		 	 	.fail(function() {
		 	 		warning('删除失败');
		 	 	})
		 	 	
		 	 });
		 	});
		}


		$('#articleList .table_selector .prev').on('click', function(event) {
			page === 1 ? '' : (page -= 1 , pageSwitch(page));
			$('#articleList .table_selector .switch').each(function(index, el) {
				(index + 1) === page ? $(this).addClass('selected').siblings('.switch').removeClass('selected') : '';
			});
		});

		$('#articleList .table_selector .next').on('click', function(event) {
			page === totalPage ? '' : (page += 1, pageSwitch(page));
			$('#articleList .table_selector .switch').each(function(index, el) {
				(index + 1) === page ? $(this).addClass('selected').siblings('.switch').removeClass('selected') : '';
			});
		});
	});