webpackJsonp([5],{0:function(t,e){function i(t){return t&&t.__esModule?t:{default:t}}t.exports=i},1:function(t,e){var i={proxy:"https://www.eunieunieuni.xin/",url:"/news"};t.exports=i},3:function(t,e){t.exports=function(t){$("#warning").removeClass("active"),$("#warning").addClass("active").html(t);var e=setTimeout(function(t){$("#warning").removeClass("active"),clearTimeout(e)},2e3)}},4:function(t,e,i){"use strict";var a=i(0),n=a(i(1));$(document).ready(function(){$("#navigator .exit").on("click",function(t){t.preventDefault(),$.ajax({url:n.default.url+"logout",type:"GET"}).always(function(){window.location.href="login.html"})})})},67:function(t,e,i){"use strict";var a=i(0);i(68);var n=a(i(1));i(4);var s=a(i(3));$(document).ready(function(){function t(i){$.ajax({url:n.default.url+"/verify?page="+i,type:"GET"}).done(function(l){if(e=Math.ceil(l.count/a),$("#articleList .table_body").html(""),l.articles.forEach(function(t,e){var i=document.createElement("div");i.className="item",i.innerHTML='<div class="title">'+t.title+'</div><div class="contributor">'+t.reporter+'</div><div class="date">'+t.submitAt+'</div><div class="status">'+t.newsStatus+'</div><div class="operation" data-id="'+t.id+'"><span class="review">审核</span> | <span class="delete">删除</span></div>',$("#articleList .table_body").append(i)}),!0===c){c=!1;for(var o=1;o<e;o++)$("#articleList .table_selector .page_selector").append('<span class="switch">'+(o+1)+"</span>");$("#articleList .table_selector .switch").on("click",function(e){$(this).addClass("selected").siblings(".switch").removeClass("selected"),console.log("dddd"),i=$(this).html(),t(i)})}$("#articleList .table_body .operation .review").on("click",function(t){window.location.href="BE_review.html?id="+$(this).parent().attr("data-id")}),$("#articleList .table_body .operation .delete").on("click",function(e){$.ajax({url:n.default.url+"/deleteArticle?id="+$(this).parent().attr("data-id"),type:"GET"}).done(function(e){"SUCCESS"===e?t(i):(0,s.default)("删除失败")}).fail(function(){(0,s.default)("删除失败")})})})}var e,i=1,a=10,c=!0;t(i),$("#articleList .table_selector .prev").on("click",function(e){1===i||(i-=1,t(i)),$("#articleList .table_selector .switch").each(function(t,e){t+1===i&&$(this).addClass("selected").siblings(".switch").removeClass("selected")})}),$("#articleList .table_selector .next").on("click",function(a){i===e||(i+=1,t(i)),$("#articleList .table_selector .switch").each(function(t,e){t+1===i&&$(this).addClass("selected").siblings(".switch").removeClass("selected")})})})},68:function(t,e){}},[67]);