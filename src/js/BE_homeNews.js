if (process.env.NODE_ENV !== 'production') {
    require('../view/BE_homeNews.html')
}

import '../sass/BE_homeNews.scss'
import common from './common/common.js'
import axios from 'axios'
// import vue from 'vue';

// import common from './common/common.js'


var pageContent={
    template:'<div class="table_body"><div v-for="i in list" class="item"><div class="title">{{articles[i-1].title}}</div> <div class="contributor">{{articles[i-1].reporter}}</div> <div class="date">{{articles[i-1].submitAt}}</div> <div class="status">{{articles[i-1].newsStatus}}</div>  <a :href="hrefSrc[i-1]" class="operation"><span class="review">编辑</span> </a></div></div>',
    props:['number'],
    data:function(){
        //刚开始，从后台获取数据并显示

        console.log(parseInt(this.number)+1)

        var c=parseInt(this.number)+1
        var str=common.url+'/verify?page='+c
        axios.get(str).then((response) => {

            response=response.data
            console.log(response)
            this.articles=response.articles
            console.log(this.articles)
            this.list=this.articles.length

        })
        return{
            list:1,
            articles:[{
                title:"a",
                publicAt:"b",
                id:1
            }]
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

        number:function(i){
            var c=i+1

            var str=common.url+'/verify?page='+c
            axios.get(str).then( (response) => {
                var res=response.data
                this.articles=res.articles
                this.list=this.articles.length
            })

        }
    }
};


var pagelist={
    template:'<div id="page-list"><div class="page"><a v-on:click="turnback()" class="turn-left"></a><a  v-for="i in pages" v-on:click="changePage(i)"  v-bind:class="{lighting:isHeighLight[i-1]}">{{i}}</a><a v-on:click="turnfront()" class="turn-right"></a></div></div>',

    // props:['side','content'],
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

var news=new Vue({
    el:'#content',
    data:function(){

        return{

            pageNumber:0,
        }

    },
    components:{
        // 'v-tab-nav':tabNav,
        // 'v-side-bar':sideBar,
        'v-page-list':pagelist,
        'v-page-content':pageContent
    }
})

