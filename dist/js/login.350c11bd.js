webpackJsonp([4],{0:function(n,e){function t(n){return n&&n.__esModule?n:{default:n}}n.exports=t},1:function(n,e){var t={proxy:"https://www.eunieunieuni.xin/",url:"/news"};n.exports=t},12:function(n,e,t){n.exports=t(13)},13:function(n,e,t){var i=t(2),o=i.JSON||(i.JSON={stringify:JSON.stringify});n.exports=function(n){return o.stringify.apply(o,arguments)}},2:function(n,e){var t=n.exports={version:"2.5.3"};"number"==typeof __e&&(__e=t)},3:function(n,e){n.exports=function(n){$("#warning").removeClass("active"),$("#warning").addClass("active").html(n);var e=setTimeout(function(n){$("#warning").removeClass("active"),clearTimeout(e)},2e3)}},54:function(n,e,t){"use strict";function i(){$.ajax({url:r.default.url+"/getCode",type:"GET",header:{"Access-Control-Allow-Origin":"*"}}).done(function(n){console.log(n),$("#login .ver_code_img").attr("src",n)})}var o=t(0),a=o(t(12));t(55);var r=o(t(1)),c=o(t(3));$(document).ready(function(){i(),$(document).on("keypress",function(n){13==n.which&&$("#login .submit").click()}),$("#login .selector div").on("click",function(n){n.preventDefault(),$(this).addClass("active").siblings().removeClass("active")}),$("#login .ver_code_img").on("click",function(n){n.preventDefault(),i()}),$("#login .submit").on("click",function(n){if(""===$("#login .input_container .username").val()||""===$("#login .input_container .password").val()||""===$("#login .input_container .password").val())return void(0,c.default)("输入不能为空");var e,t;!0===$("#login .selector .admin").hasClass("active")?(e=1,t="BE_carousel.html"):(e=2,t="BE_edit.html"),$.ajax({url:r.default.url+"/logIn",type:"POST",contentType:"application/json",data:(0,a.default)({username:$("#login .input_container .username").val(),password:$("#login .input_container .password").val(),code:$("#login .input_container .ver_code").val(),authority:e}),withCredentials:!0}).done(function(n){"SUCCESS"===n?window.location=t:(0,c.default)("用户名或密码错误")})})})},55:function(n,e){}},[54]);