//import common from '../common/common.js';
import axios from 'axios';
let gindex = 1;

export default
{
    data: function()
    {
        //    let url = window.location.href.split('#');
        //    let index = parseInt(url[1]);
        let index = 1;
        if(gindex < index)
        {
            gindex = index;
        }

        axios.get('/api/news/getArticle?id=' + gindex)
            .then((response) => 
                {
                    this.result = response.data;
                });
        gindex++;
        return{
            result: {}
        }
    },

    template:
	`
    		<div class="container">
    			<span class="picContainer">
                			<img class="picture" v-bind:src="result.cover">
           		</span>
            		<span>
                			<div class="contentContainer">
                				<div class="name">
						{{result.title}}
                				</div>
                				<div class="content">
						{{result.summary}}
                				</div>
                				<div class="readmore_button">
                					<span class="text">了解更多</span>
                					<span class="line">|</span>
                					<span class="arrow">→</span>
            				</div>
                			</div>
            		</span>
    		</div>
  	`
}