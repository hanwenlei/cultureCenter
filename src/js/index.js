//模块热更新
// import * as data from "webpack";

if (process.env.NODE_ENV !== 'production') {
    require('../view/index.html')
}

import common from './common/common.js'
import '../sass/index.scss'

$(document).ready(function () {

    for (var i=0;i<6;i++){
        $("#display .item:eq('"+i+"')").css("background-image","url(\"../assets/imgs/index/"+(15+i)+".jpg\")");
        // console.log($("#display .item:eq('"+i+"')").css("background-image"));
    }

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback, element) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();


    function animate() {
        requestAnimFrame(animate);
        scrollMonitor();
    }

    // 函数节流
    // var lazyLayout = _.throttle(scrollMonitor,100);
    function scrollMonitor() {
        let TeamContent = $('#team .content');
        let toggle = TeamContent.offset().top - ($(window).height() - TeamContent.height());
        let scrollTop = $(window).scrollTop();
        if (toggle <= scrollTop + 200 && $('#team .content .item').hasClass('active') === false) {
            $('#team .content .item').addClass('active');
            $(window).unbind('scroll');
        }
    }

    $(window).scroll(scrollMonitor);
    setTimeout(() => {
        skrollr.get().refresh();
    }, 1);

    // function skr() {
    //     skrollr.get().refresh();
    // }

    // $(".d-block")[0].src="/1";
    // console.log($(".d-block")[0].src);
    $.ajax({
       url:common.url+'/getVisibleCarousel',
        type:'GET'
        // async:false
    }).done(function (res) {
        // console.log(res);
        for(var i=0;i<3;i++)
        {

            if(i<=res.length)
            {
                var strNum=res[i].indexOf('img');
                var imgPath="http://222.197.183.55:8080/news"+res[i].substring(strNum);
                console.log(imgPath);
                $(".d-block")[i].src=imgPath;
            }

        }
    });


    $.ajax({

        url:common.url+'/getBulletin',
        type:'GET',

        }

    ).done(function (res) {
        // console.log("asd");
        // console.log(typeof res);
        // console.log(res.length);
        let bulletin=res;
        for(let i=0;i<4;i++)
        {
            let item=bulletin[i];
            let nowEle=$(".caption:eq('"+i+"')");
            nowEle.text(item.title);
            $(".detail:eq('"+i+"')").text(item.summary);
            // console.log(item.summary);
            let date=item.publicAt;
            // let day=data.split("-");
            let year=date.substr(0,4);
            let month=date.substr(5,5);
            // let month=day[1]+"-"+day[2];
            $(".month:eq('"+i+"')").text(month);
            $(".year:eq('"+i+"')").text(year);
            let addr=item.cover;
            console.log(addr);
            $(".arrow_container:eq('"+i+"') img").attr('src',addr);
            // console.log(item.title);

        }

    });
});
