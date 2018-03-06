<template>
    <div class="wrapper" @androidback="back">
        <text class="title" @click="update">添加字典</text>
        <text class="desc" @click="getDic">获取字典:{{dic}}</text>
    </div>
</template>
<script>
export default {
    data() {
        return {
            target: 'World',
            count: 0,
            dic: {}
        }
    },
    methods: {
        update: function(e) {
            this.count++;
            this.target = '美女 ' + this.count;
            this.$store.commit("addDic", { 'code': this.count, 'lable': this.target });
        },
        back: function() {
            this.$router.back()
        },
        getDic: function() {
            this.dic = {
                'aa': this.$store.getters.getDic("parm"),
                'bb': this.dic = this.$store.state.dic
            };
        }
    }
}
</script>