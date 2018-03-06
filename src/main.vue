<template>
    <div class="wrapper">
        <text style=' padding-top: 40px; padding-bottom: 40px; font-size: 48px;'>这是main页</text>
        <text @click="gotoPage('index')">返回index页</text>
        <text @click="getDic()">获取字典</text>
        <!--<image :src="logoUrl" resize="cover" class="background" @load="onload"></image>-->
        <slider class="slider" interval="3000" auto-play="true" infinite="true">
            <div class="frame" v-for="img in imageList">
                <image class="image" resize="cover" :src="img.src"></image>
            </div>
            <indicator class="indicator"></indicator>
        </slider>
        <div style="background-color:#1b90f7;margin:30px;border-radius:10px;flex-direction: row;height:40px;border-color:#1b90f7;border-width:1px">
            <text style="align-items: center;justify-content: center;flex:3;text-align:center;vertical-align:center">写点啥</text>
            <input style="align-items: center;justify-content: center;flex:9;padding-left:5px;text-align:center" type="text" placeholder="你是超人么？" return-key-type="default" class="input" @change="" @return="" @input="" />
        </div>
        <div class="example">
            <text class="label">逛逛呗</text>
            <switch checked="true" disabled="false" @change="onchange"></switch>
        </div>
        <text class="label">下拉加载</text>
        <scroller class="scroller">
            <refresh class="refresh" @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">Refreshing ...</text>
            </refresh>
            <div class="cell" v-for="num in lists">
                <div class="panel">
                    <text class="text">{{num}}</text>
                </div>
            </div>
        </scroller>
    </div>
</template>
<script>
// import mixins from './mixins'
// Vue.mixin(mixins)
export default {
    data() {
        return {
            checked: false,
            logoUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
            imageList: [
                { src: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg' },
                { src: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg' },
                { src: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg' }
            ],
            refreshing: false,
            lists: [1, 2, 3, 4, 5]
        }
    },
    methods: {
        onchange(event) {
            console.log(`onchage, value: ${event.value}`)
            this.checked = event.value
        },

        onrefresh(event) {
            console.log('is refreshing')
            modal.toast({ message: 'refresh', duration: 1 })
            this.refreshing = true
            setTimeout(() => {
                this.refreshing = false
            }, 2000)
        },
        onpullingdown(event) {
            console.log('is onpulling down')
            modal.toast({ message: 'pulling down', duration: 1 })
        },
        getDic() {
            console.log(this.$store.state.dic);
        }
    },
    mounted: function() {},
    ready: function() {}

}
</script>
<style scoped>
.wrapper {
    align-items: center;
    margin-top: 120px;
}


.logo {
    width: 360px;
    height: 156px;
}

.desc {
    padding-top: 20px;
    color: #888;
    font-size: 24px;
}

.background {
    width: 1000px;
    height: 1000px;
}


.example {
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 60px;
}

.label {
    font-size: 40px;
    line-height: 60px;
    width: 350px;
    color: #666;
    text-align: right;
    margin-right: 20px;
}

.info {
    font-size: 30px;
    line-height: 60px;
    color: #BBB;
    margin-left: 10px;
}

.image {
    width: 700px;
    height: 700px;
}

.slider {
    margin-top: 25px;
    margin-left: 25px;
    width: 700px;
    height: 700px;
    border-width: 2px;
    border-style: solid;
    border-color: #41B883;
}

.title {
    position: absolute;
    top: 20px;
    left: 20px;
    padding-left: 20px;
    width: 200px;
    color: #FFFFFF;
    font-size: 36px;
    line-height: 60px;
    background-color: rgba(0, 0, 0, 0.3);
}

.frame {
    width: 700px;
    height: 700px;
    position: relative;
}

.indicator {
    width: 700px;
    height: 700px;
    item-color: green;
    item-selected-color: red;
    item-size: 50px;
    position: absolute;
    top: 300px;
    left: 0px;
    color: #888888;
    font-size: 42px;
    text-align: center;
}

.panel {
    width: 600px;
    height: 250px;
    margin-left: 75px;
    margin-top: 35px;
    margin-bottom: 35px;
    flex-direction: column;
    justify-content: center;
    border-width: 2px;
    border-style: solid;
    border-color: #DDDDDD;
    background-color: #F5F5F5;
}

.text {
    font-size: 50px;
    text-align: center;
    color: #41B883;
}
</style>