if (process.env.NODE_ENV !== 'production') {
    require('../view/news.html')
}
import '../sass/news.scss'
import common from './common/common.js'
import axios from 'axios'

var src=window.location.href
var indexID=src.indexOf("?")
var id=src.substring(indexID+4)
console.log(id)


var title = {
    template: '<div id="news-title"><div class="title"><span>|</span>{{article.title}}</div> <div class="details"><span class="author"><em>作者：</em>{{article.reporter}}</span><span class="pic-author"><em>照片作者：</em>{{article.photographer}}</span><span class="gover"><em>部门：</em>{{article.department}}</span><span class="date"><em>发布时间：</em>{{article.publicAt}}</span><span class="click-rate"><em>点击量：</em>{{article.click}}</span> </div> </div>',
    props:['article'],

};

var content={
    template: '<div id=content> <div class="content"></div> </div>',
    props:['article'],
    data:function () {
        return{
            essay:""
        }
    },
    watch: {
        article:function () {
                // content = this.article.essay
                // console.log(this.article)
                // content = content.substring(1,content.length-2)
                $("#content .content")[0].innerHTML+=this.article.essay
        }


        // return{
        //     essay:content
        // }
    }
}


var types={
    template:'<div id="type-title"> <ul><li>分类标题</li><li v-for="i in list"  ><a v-on:onmouseover="onChangeLight(i)" v-bind:class="{light:isHighLight[i-1]}">{{littleTitles[i-1]}}</a></li></ul> </div>',
    data:function () {

        return{
            list:7,
            littleTitles:['小标题','小标题','小标题','小标题','小标题','小标题','小标题'],
            isHighLight:[true,false,false,false,false,false,false]
        }
    },
    methods:{
        onChangeLight:function (i) {
            console.log("<a><b class='a'></b></a>"-"<b class='a'></b>")
            if($(".light")[0].innerHTML.indexOf("div")>=0){
                var a=$(".light")[0].innerHTML
                var b=a.indexOf("<div")
                var c=a.indexOf("</div>")
                a=a.substring(0,b)+a.substring(c,a.length-1)
                $(".light")[0].innerHTML=a
                // $(".light")[0].innerHTML-='<div class="detail">...</div>'
            }


            var a=this.isHighLight.indexOf(true)
            i=i-1
            Vue.set(this.isHighLight,a,false)
            Vue.set(this.isHighLight,i,true)
            console.log(i)
            $("#type-title li a")[i].innerHTML+="<div class='detail'>...</div>"
            // console.log($(".light")[0].innerHTML)
        }
    }
}
// $(".light")[0].innerHTML+="<div class='detail'>...</div>"
var newsPage = new Vue({
    el: "#news-content",
    data: function () {
        var essay={
            title:'',
            reportor:'',
            photographer:'',
            department:'',
            publicAt:'',
            click:''
        }
        axios.get(common.url+'/getArticle',{
            params:{
                'id':id
            }

        }).then((response) => {
            this.article=response.data
            // console.log(this.article)
        })
        return {
            article: essay
        }
    },
    components: {
        'v-title': title,
        'v-content': content,
        'v-type':types
    }
});