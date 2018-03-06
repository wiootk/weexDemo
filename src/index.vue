<template>
    <div @androidback="back" class="wrapper">
        <bui-header title="标题栏" :leftItem="leftItem" :rightItem="rightItem" @leftClick="back" @rightClick="rightclick" @centerClick="centerclick">
        </bui-header>

	<!--
	<bui-image-slider :items="itemList" 
	@itemClick="onItemClick" 
	@change="onChange">
	</bui-image-slider>
	-->
	<!--
	<div class="flex-row">
	<bui-button radius="10px" type="primary" value="首页"></bui-button>
	<bui-button radius="10px" type="success" value="列表"></bui-button>
	<bui-button radius="10px" type="warning" value="Warning"></bui-button>
	<bui-button radius="10px" type="danger" value="Danger"></bui-button>
	<bui-button radius="10px" disabled="false" value="Disabled"></bui-button> 
	</div>
	-->
	<!--<bui-image width="260px" height="260px" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg">
	</bui-image>-->
	
        <bui-image src="/image/demo.jpg" width="300px" height="300px"></bui-image>
        <text class="title">主页</text>
        <list>
            <cell class="cell" @click="gotoPage('list')">
                <text>列表页</text>
            </cell>
            <cell class="cell" @click="gotoPage('detail')">
                <text>详情页</text>
            </cell>
        </list>
    </div>
</template>
<script>
import buiweex from 'bui-weex';
export default {
    data: function() {
        return {
            leftItem: { icon: 'icon-back' },
            rightItem: { text: '更多' }
        }
    },
    methods: {
        back1: function() {
            this.$router.back()
        },
        back: function() {
            buiweex.pop();
            buiweex.toast('left')
        },
        rightclick: function() {
            buiweex.toast('right')
        },
        centerclick: function() {
            buiweex.toast('center')
        }
    }
}
</script>
<style lang="sass" src="bui-weex/src/css/buiweex.scss"></style>
<style>
.wrapper {
    align-items: center;
    margin-top: 120px;
}
.title {
    padding-top: 40px;
    padding-bottom: 40px;
    font-size: 48px;
}
</style>