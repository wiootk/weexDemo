<template>
    <div class="wrapper" @androidback="back">
        <text class="title">列表页</text>
        <list>
            <cell class="cell" @click="gotoPage('index')">
                <text>主页</text>
            </cell>
            <cell class="cell" @click="gotoPage('detail')">
                <text>详情页</text>
            </cell>
        </list>
    </div>
</template>
<script>
    export default {
        data: {},
        methods: {
            back: function () {
                this.$router.back()
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