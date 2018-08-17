//模块热更新
if (process.env.NODE_ENV !== 'production') {
    require('../view/news.html')
}

import '../sass/news.scss';
import common from './common/common.js';

var gindex = 1;
const gtypeName = ['新闻公示', '精彩回顾', '活动预告', '成电辩坛', '成电舞台', '成电故事', '成电影院', '成电栋梁', 
				'成电讲坛', '成电百家', '其他新闻'];

$(document).ready(function ()
{

//    let url = window.location.href.split('#');
//    gindex = parseInt(url[1]);
    $("#newsType").text(gtypeName[gindex]);
    $.ajax(
    {
        url: common.url + '/getNotice',
        type: 'GET',
    })
    .done(function(res)
    {
        console.log("success");
        var news = res[gindex];
        var flag = false;
        var index = 0;
        for(var i = 0; i < news.length; i++)
        {
        		if(news[i].cover !== null)
        		{
        			if(index >= 4) continue;
        			var item = $(".newsContent").eq(index);
        			item.children('.title').text(news[i].title);
        			item.children('.time').text(news[i].publicAt);
        			item.children('.content').text(news[i].summary);
        			item.children('.newsPic').attr('src', news[i].cover);
        			index++;
        		}
        		else
        		{
        			if(index >= 4)
        			{
        				if(flag === true) break;
        			}
        			else
        			{
        				if(flag === true) continue;
        			}
        			var item = $(".newsContent").eq(5);
        			item.children('.title').text(news[i].title);
        			item.children('.time').text(news[i].publicAt);
        			item.children('.content').text(news[i].summary);
        			flag = true;
        		}
        }
        var pageNumber = Math.ceil(news.length/5);
        $(".totalPages").text("总页数：	" + pageNumber);
    })

});

$(".btn").click(function()
{
    var page = $("#pageInput").val();
    if(page === "") return;
    $.ajax(
    {
        url: common.url + '/getNotice',
        type: 'GET',
    })
    .done(function(res)
    {
        console.log("success");
        var news = res[gindex];
        if(page > news.length/5) return;
        var flag = false;
        var index = 0;
        for(var i = page*5; i < news.length; i++)
        {
        		if(news[i].cover !== null)
        		{
        			if(index >= 4) continue;
        			var item = $(".newsContent").eq(index);
        			item.children('.title').text(news[i].title);
        			item.children('.time').text(news[i].publicAt);
        			item.children('.content').text(news[i].summary);
        			item.children('.newsPic').attr('src', news[i].cover);
        			index++;
        		}
        		else
        		{
        			if(index >= 4)
        			{
        				if(flag === true) break;
        			}
        			else
        			{
        				if(flag === true) continue;
        			}
        			var item = $(".newsContent").eq(5);
        			item.children('.title').text(news[i].title);
        			item.children('.time').text(news[i].publicAt);
        			item.children('.content').text(news[i].summary);
        			flag = true;
        		}
        }
        $("#pageNumber").text(page.toString());
    })
})

$(".MovePage1").click(function()
{
    var page = $("#pageNumber").val();
    if(page <= 1) return;
    $.ajax(
    {
        url: common.url + '/getNotice',
        type: 'GET',
    })
    .done(function(res)
    {
        console.log("success");
        var news = res[gindex];
        var flag = false;
        var index = 0;
        for(var i = (page-1)*5; i < news.length; i++)
        {
        		if(news[i].cover !== null)
        		{
        			if(index >= 4) continue;
        			var item = $(".newsContent").eq(index);
        			item.children('.title').text(news[i].title);
        			item.children('.time').text(news[i].publicAt);
        			item.children('.content').text(news[i].summary);
        			item.children('.newsPic').attr('src', news[i].cover);
        			index++;
        		}
        		else
        		{
        			if(index >= 4)
        			{
        				if(flag === true) break;
        			}
        			else
        			{
        				if(flag === true) continue;
        			}
        			var item = $(".newsContent").eq(5);
        			item.children('.title').text(news[i].title);
        			item.children('.time').text(news[i].publicAt);
        			item.children('.content').text(news[i].summary);
        			flag = true;
        		}
        }
    })
})

$(".MovePage2").click(function()
{
    var page = $("#pageNumber").val();
    $.ajax(
    {
        url: common.url + '/getNotice',
        type: 'GET',
    })
    .done(function(res)
    {
        console.log("success");
        var news = res[gindex];
        if(page >= news.length/5) return;
        var flag = false;
        var index = 0;
        for(var i = (page+1)*5; i < news.length; i++)
        {
        		if(news[i].cover !== null)
        		{
        			if(index >= 4) continue;
        			var item = $(".newsContent").eq(index);
        			item.children('.title').text(news[i].title);
        			item.children('.time').text(news[i].publicAt);
        			item.children('.content').text(news[i].summary);
        			item.children('.newsPic').attr('src', news[i].cover);
        			index++;
        		}
        		else
        		{
        			if(index >= 4)
        			{
        				if(flag === true) break;
        			}
        			else
        			{
        				if(flag === true) continue;
        			}
        			var item = $(".newsContent").eq(5);
        			item.children('.title').text(news[i].title);
        			item.children('.time').text(news[i].publicAt);
        			item.children('.content').text(news[i].summary);
        			flag = true;
        		}
        }
    })
})