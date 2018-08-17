if (process.env.NODE_ENV !== 'production') {
    require('../view/introduction.html')
}
import '../sass/introduction.scss'
import common from './common/common.js'
import axios from 'axios'


Vue.component('depart-introduct',{
    template:'<div id="introduct"> <div class="title">部门介绍</div><p></p> <div class="details">{{data}}</div> </div>',
    data:function () {
        return{
            data:"大学生是..."
        }
    }
});

Vue.component('units',{
    template:'<div id="units"> <div class="title">下属单位</div> <div class="details"><div v-for="unit in unitList">{{unit}}</div></div> </div>',
    data:function () {
        return{
            unitList:['综合管理办公室','课程建设办公室','领导力教育办公室','艺术教育办公室','校园文化建设办公室']
        }

    }
})


Vue.component('connect',{
    template:'<div id="connect"> <div class="tel"> <span class="title">联系电话</span><span class="details">{{tel}}</span> </div> <div class="fox"> <span class="title">传真</span><span class="details">{{fox}}</span> </div> </div>',
    data:function () {
        return{
            tel:'189',
            fox:'020',
        }
    }
});


Vue.component('leader',{
    template:'<div id="leader"> <div class="title">部门领导</div> <div class="details" v-for="teacher in teachers"><img :src="teacher.img"><span class="high">{{teacher.high}}</span><span class="name">{{teacher.name}}</span><p></p><span class="detail">{{teacher.detail}}</span><p></p><span class="address">办公地点：清水河学生活动中心</span><p></p><span class="tel"><span>联系电话</span>{{teacher.tel}}</span> </div> </div>',
    data:function () {
        return{
            teachers:[
                {
                    img:'../assets/imgs/index/1.jpg',
                    high:'主任',
                    name:'刘惠',
                    detail:'分管课程办公室',
                    tel:'189'
                },
                {
                    img:'../assets/imgs/index/1.jpg',
                    high:'副主任',
                    name:'韩蕾',
                    detail:'分管课程办公室',
                    tel:'182'
                },
            ]
        }
    }
});

new Vue({
    el:"#content"
})