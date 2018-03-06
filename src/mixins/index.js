import {getBaseURL, isAndroid} from '../utils';
const event = weex.requireModule('event');
const navigator = weex.requireModule('navigator')
var buiweex = require("bui-weex");


let domModule = weex.requireModule('dom');
domModule.addRule('fontFace', {
    'fontFamily': "iconfont4",
    'src': "url('local://dist/font/abc.ttf')"

});


export default {
    methods: {
        jump(to){
            // jump:function(to) {
            console.log('to=' + to);
            if (this.$router) {
                this.$router.push(to)
            }
        },
        gotoPage: function (page) {
            var url = getBaseURL(weex) + page + '.js';
            if (typeof window === 'object') {
                url = getBaseURL(weex) + page;
                // url = url.replace(/\.\/dist\/web\//, '/dist/').replace(/\/web\//, '');
                url = url.replace(/\.\/dist\/web\//, '').replace(/\/web\//, '');
            }
            url = url.replace(/\/weex\.html/, '\/index.html');
            // navigator.push({
            //   url: url,
            //   animated: "true"//页面压入时需要动画效果
            // }, event => { console.log(event); })
            event.openURL(url);
        }
    },
    components: {
        'bui-header': buiweex.buiHeader,
        'bui-icon': buiweex.buiIcon,
        'bui-button': buiweex.buiButton,
        'bui-image': buiweex.buiImage,
        'bui-content': buiweex.buiContent,
        'bui-content-scroll': buiweex.buiContentScroll,
         "bui-image-slider": buiweex.buiImageSlider
    }
}