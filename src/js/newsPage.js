if (process.env.NODE_ENV !== 'production') {
    require('../view/newsPage.html')
}
import '../sass/newsPage.scss';
import common from './common/common.js';


let num = 0;
let which=0;
let amount=3;
$(document).ready(function () {




    let pages=$(".enroll ul canvas");
    // console.log(pages.length);
    for(var i=0;i<pages.length;i++)
    {

        let page=pages[i];
        // console.log(typeof page);
        if(page.getContext)
        {
            let context=page.getContext("2d");

            context.fillStyle="rgba(0,255,255,0.5)";

            context.fillRect(0,0,20,10);

        }
    }

    let control=$(".left");
    for (var i=0;i<control.length;i++)
    {
        let playLeft=control[i];
        if(playLeft.getContext)
        {
            let context=playLeft.getContext("2d");
            context.strokeStyle="rgb(0,255,0)";
            context.beginPath();
            context.moveTo(40,10);
            context.lineTo(10,50);
            context.lineTo(40,90);
            context.stroke();

        }

    }


    let controlRight=$(".right");
    for (var i=0;i<controlRight.length;i++)
    {
        let playRight=controlRight[i];
        if(playRight.getContext)
        {
            let context=playRight.getContext("2d");
            context.strokeStyle="rgb(0,255,0)";
            context.beginPath();
            context.moveTo(10,10);
            context.lineTo(40,50);
            context.lineTo(10,90);
            context.stroke();
        }

    }



     let playBack = setInterval(scroll, 5000);

    // $(".enroll").hover(function () {
    //     if(!$(".enroll:eq('"+which+"')").children("ul:first-child").is(":animated"))
    //     {
    //         clearInterval(playBack);
    //     }
    // },function () {
    //     playBack = setInterval(scroll, 5000);
    // });

    $(".weeks li").click(function () {
        let nowWeekDay=$(this).index();
        $(".clicked-week").removeClass("clicked-week");
        $(this).addClass("clicked-week");
        // $(".enroll").css("display","none");
        $(".light").removeClass("light");

        $(".enroll:eq('"+which+"')").children("ul:first-child").css("left",0);
        $(".backColor").removeClass("backColor");
        $(".enroll:eq('"+nowWeekDay+"') .pages>li:first-child canvas").addClass("backColor");
        $(".enroll:eq('"+nowWeekDay+"')").addClass("light");
        which=nowWeekDay;
        num=0;
    });


    $(".enroll .left").click(function () {
        // alert("1");
       if(!$(".enroll:eq('"+which+"')").children("ul:first-child").is(":animated"))
       {

           clearInterval(playBack);
           if(num===0){
               num=amount-2;
           }else {
               num--;
               num--;
           }
           scroll();
           playBack=setInterval(scroll, 5000);
       }
    });

    $(".enroll .right").click(function () {
        if(!$(".enroll:eq('"+which+"')").children("ul:first-child").is(":animated"))
        {
            clearInterval(playBack);
            scroll();
            playBack=setInterval(scroll, 5000);
        }
    });


    $(".enroll .pages>li").click(function () {
        var toPage=parseInt($(this).attr("value"));
        if(!$(".enroll:eq('"+which+"')").children("ul:first-child").is(":animated"))
        {
            clearInterval(playBack);
            if(toPage===0)
            {
                num=amount-1;
            }else {
                num=--toPage;
            }
            scroll();
            playBack=setInterval(scroll, 5000);
        }

    });


    $.ajax({
        url:common.url+'/getNotice',
        type:"GET",
    }).done(function (res) {
        // console.log(typeof res);
        // let res=parse
        // console.log(result[0]);
        let newsShow=res[0];
        let review=res[1];
        let foreShow=res[2];
        let debate=res[3];
        let stage=res[4];
        let story=res[5];
        let film=res[6];
        let pillar=res[7];
        let teach=res[8];
        let family=res[9];
        let other=res[10];

        read(newsShow,9,$(".news-show:eq(0) ul")[0]);
        read(review,9,$(".news-show:eq(1) ul")[0]);
        read(foreShow,9,$(".news-show:eq(2) ul")[0]);
        read(debate,5,$(".first-trend:eq(0) .left-trend ul")[0]);
        read(stage,5,$(".first-trend:eq(0) .right-trend ul")[0]);
        read(story,5,$(".first-trend:eq(1) .left-trend ul")[0]);
        read(film,5,$(".first-trend:eq(1) .right-trend ul")[0]);
        read(pillar,5,$(".first-trend:eq(2) .left-trend ul")[0]);
        read(teach,5,$(".first-trend:eq(2) .right-trend ul")[0]);
        read(family,5,$(".first-trend:eq(3) .left-trend ul")[0]);
        read(other,5,$(".first-trend:eq(3) .right-trend ul")[0]);


    });

});

function scroll() {
    if(num===(amount-1))
    {
        num=0;
    }else {
        num++;
    }
    let j=-1000*num;
    $(".backColor").removeClass("backColor");
    $(".light ul:eq(1)>li:eq('"+num+"') canvas").addClass("backColor");
    $(".light>ul:first-child").animate({left:j+"px"},1000);
}


function read(jsonData,member,ele) {
    if(jsonData.length>0)
    {
        for(var i=0;i<(jsonData.length<member?jsonData.length:member);i++)
        {
            if(i===0){
                let title=jsonData[i].title;
                let date=jsonData[i].publicAt;
                ele.getElementsByTagName("li")[i].getElementsByTagName("p")[0].innerHTML+=title;
                ele.getElementsByTagName("li")[i].getElementsByTagName("span")[0].innerHTML=date;

            }else {
                let title=jsonData[i].title;
                let date=jsonData[i].publicAt;
                ele.getElementsByTagName("li")[i].getElementsByTagName("p")[0].innerHTML+=title;
                ele.getElementsByTagName("li")[i].getElementsByTagName("p")[0].getElementsByTagName("span")[1].innerHTML=date;
            }
        }
    }

}
