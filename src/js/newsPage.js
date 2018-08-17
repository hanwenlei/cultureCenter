if (process.env.NODE_ENV !== 'production') {
    require('../view/newsPage.html')
}
import '../sass/newsPage.scss'
import common from './common/common.js'
import axios from 'axios'

var tabNav={
    template:'<div id="news"><a></a><a v-for="i in order" v-on:click="changeSideBar(i)" v-bind:class="{light:isHeighLight[i]}">{{list[i]}}</a></div>',

    data:function(){
        return{
            order:[0,1,2,3],
            list:['通识教育','领导力教育','艺术教育','校园文化'],
            isHeighLight:[true,false,false,false]
        }

    },

    methods:{
        //修改侧边栏
        changeSideBar:function(i){
            var a=i
            news.indexSideBar=a
            // news.indexContent=0
            var b=this.isHeighLight.indexOf(true)
            console.log(this.isHeighLight)
            //重新设置导航栏显示情况
            Vue.set(this.isHeighLight,b,false)
            Vue.set(this.isHeighLight,a,true)
        }
    },

};

var sideBar={
    template:'<div id="side-bar"><div v-for="i in order"  v-bind:class="{dis:isDisplay[i]}"><a  v-for="j in com[i]" v-on:click="changeCom(j)" v-bind:class="{light:isHeighLight[i][j]}">{{list[i][j]}}</a></div></div>',
    props:['side'],
    data:function(){
        return{

            order:[0,1,2,3],
            com:[[0,1,2],[0,1,2],[0,1,2],[0,1,2]],
            list:[['人类文明经典赏析','艺术类通识课程','精品课程'],['人类文明经典赏析2','艺术类通识课程2','精品课程2'],['人类文明经典赏析3','艺术类通识课程3','精品课程3'],['人类文明经典赏析','艺术类通识课程','精品课程']],
            isDisplay:[true,false,false,false],
            isHeighLight:[[true,false,false],[true,false,false],[true,false,false],[true,false,false]]

        }
    },
    methods:{
        //修改侧边栏焦点情况
        changeCom:function(i){
            news.indexContent=i
            var a=this.side
            console.log(i)
            console.log(this.isHeighLight[a])
            var b=this.isHeighLight[a].indexOf(true)
            Vue.set(this.isHeighLight[a],b,false)
            Vue.set(this.isHeighLight[a],i,true)

        }
    },
    watch:{
        side:function(i){

            //修改导航栏时，同时把侧边栏固定焦点在第一个选项上
            var c=this.isDisplay.indexOf(true)

            Vue.set(this.isDisplay,i,true)
            Vue.set(this.isDisplay,c,false)
            console.log(this)
            this.changeCom(0)
        }
    }

};


var pagelist={
    template:'<div id="page-list"><div class="page"><a v-on:click="turnback()" class="turn-left"></a><a  v-for="i in pages" v-on:click="changePage(i)"  v-bind:class="{lighting:isHeighLight[i-1]}">{{i}}</a><a v-on:click="turnfront()" class="turn-right"></a></div></div>',

    props:['side','content'],
    data:function(){
        return{
            pageNum:0,
            pages:1,
            isHeighLight:[true,false]
        }
    },

    methods:{
        //跳转到上一页
        turnback:function(){
            if(this.pageNum>0){
                var a=this.isHeighLight.indexOf(true)
                Vue.set(this.isHeighLight,a,false)
                Vue.set(this.isHeighLight,a-1,true)
                this.pageNum=a-1
                news.pageNumber=a-1
            }
        },
        //跳转到下一页
        turnfront:function(){
            if(this.pageNum<this.pages-1){
                var a=this.isHeighLight.indexOf(true)
                Vue.set(this.isHeighLight,a,false)
                Vue.set(this.isHeighLight,a+1,true)
                this.pageNum=a+1
                news.pageNumber=a+1
            }
        },
        //直接选择跳转至某一页
        changePage:function(i){
            var a=this.isHeighLight.indexOf(true)
            Vue.set(this.isHeighLight,a,false)
            Vue.set(this.isHeighLight,i-1,true)
            this.pageNum=i-1
            news.pageNumber=i-1
        }
    },
    watch:{
        //导航栏与侧边栏改变时，从后台获取对应的页数，并且固定把页数焦点固定在第一页上
        side:function(i){
            this.pageNum=0
            news.pageNumber=0
// 从后台获取当前页面的页数
            var a=i+1
            var b=parseInt(this.content)+1
            var str='/api/news/getCertainTypeNews?type='+a+'&role='+b
            axios.get(str).then((response) => {
                response=response.data
                // console.log(this.pagelist.pages)
                this.pages=response.pages
                // news.pageNumber=(this.pages)
                Vue.set(this.isHeighLight,0,true)
                for(var i=1;i<this.pages-1;i++){
                    Vue.set(this.isHeighLight,i,false)
                }
                this.changePage(1)
            })


        },
        content:function(i){

            this.pageNum=0
            news.pageNumber=0
// 从后台获取当前页面的页数
            var b=i+1
            var a=parseInt(this.side)+1
            var str='/api/news/getCertainTypeNews?type='+a+'&role='+b
            axios.get(str).then((response) => {
                response=response.data
                this.pages=response.pages
                console.log(this.pages)
                Vue.set(this.isHeighLight,0,true)
                console.log(this.pages)
                for(var i=1;i<this.pages-1;i++){
                    Vue.set(this.isHeighLight,i,false)
                }
                console.log(this.pages)
                this.changePage(1)
            })

        },
        pages:function(p){
            this.pageNum=0
            news.pageNumber=0
            var pa=document.getElementsByClassName("page")[0]
            pa.style.width=41*(p+2)+'px'
            Vue.set(this.isHeighLight,0,true)
            for(var i=1;i<this.pages-1;i++){
                Vue.set(this.isHeighLight,i,false)
            }
        }
    }
};


var pageContent={
    template:'<div id="page-content"><ul class="content"><li v-for="i in list" ><a :href="hrefSrc[i-1]"><span class="title">{{articles[i-1].title}}</span> <span class="article">{{articles[i-1].publicAt}}</span> </a></li></ul></div>',
    props:['side','content','number'],
    data:function(){
        var easay=[{
            title:"a",
            publicAt:"b",
            id:1
        }]
        //刚开始，从后台获取数据并显示
        console.log(parseInt(this.number)+1)
        var a=parseInt(this.side)+1
        var b=parseInt(this.content)+1
        var c=parseInt(this.number)+1
        var str='/api/news/getCertainTypeNews?type='+a+'&role='+b+'&page='+c
        axios.get(str).then((response) => {
                // console.log()
                // console.log(response)
                response=response.data
                // console.log(response.articles)
                easay=response.articles
                this.list=this.articles.length
            })
        return{
            list:1,
            articles:easay
        }
    },
    methods:{

    },
    computed:{
        hrefSrc:function () {
            var a=[]
            for(var i=0;i<parseInt(this.list);i++){
                var b="./news.html?id="+this.articles[i].id
                a.push(b)
            }
            console.log(a)

            return a
        }
    },
    watch:{
        //当导航栏、侧边栏、页数有任何一项发生变化时，立即从后台获取数据并显示
        side:function(i){
            var a=i+1
            var b=parseInt(this.content)+1
            var c=parseInt(this.number)+1
            var str='/api/news/getCertainTypeNews?type='+a+'&role='+b+'&page='+c
            axios.get(str).then( (response) => {
                var res=response.data
                this.articles=res.articles
                this.list=this.articles.length
            })

        },
        content:function(i){

            var a=parseInt(this.side)+1
            var b=i+1
            var c=parseInt(this.number)+1
            console.log(a,b,c)
            var str='/api/news/getCertainTypeNews?type='+a+'&role='+b+'&page='+c
            axios.get(str).then( (response) => {
                var res=response.data
                console.log(res)
                this.articles=res.articles
                this.list=this.articles.length
            })

        },
        number:function(i){
            var c=i+1
            var b=parseInt(this.content)+1
            var a=parseInt(this.side)+1
            var str='/api/news/getCertainTypeNews?type='+a+'&role='+b+'&page='+c
            axios.get(str).then( (response) => {
                var res=response.data
                this.articles=res.articles
                this.list=this.articles.length
            })

        }
    }
};


var news=new Vue({
    el:'#com',
    data:function(){

        return{
            indexSideBar:0,
            indexContent:0,
            pageNumber:0,
        }

    },
    components:{
        'v-tab-nav':tabNav,
        'v-side-bar':sideBar,
        'v-page-list':pagelist,
        'v-page-content':pageContent
    }
})