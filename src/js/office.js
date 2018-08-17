if (process.env.NODE_ENV !== 'production') {
    require('../view/office.html')
}
import '../sass/office.scss'
import common from './common/common.js'
import axios from 'axios'


Vue.component('office-content',{
    template:'<div id="office-content"> <div class="title"><h3>工 作 职 能</h3> <ul><li v-for="detail in list">{{detail}}</li></ul> </div> </div>',
    data:function () {
        return{
            list:['负责中心的人事工作','负责中心的人事工作','负责中心的人事工作','负责中心的人事工作','负责中心的人事工作','负责中心的人事工作','负责中心的人事工作','负责中心的人事工作']
        }
    }
});

new Vue({
    el:"#content"
})