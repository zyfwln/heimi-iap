<style lang="less" src="./SummaryRemind.less" scoped></style>

<template>
    <layout-base id="SummaryRemind">
        <v-header slot="header" class="header">
            <div class="title" slot="center">工作小结</div>
        </v-header>
        <div class="page">
            <img :src="img">
            <div class="button" @click.stop="to()">立即开始</div>
        </div>
    </layout-base>
</template>

<script>
export default {
    data () {
        return {
            img: require('../../assets/image/u714_02.png')
        }
    },
    methods: {
        to () {
            this.$router.push({
                path: '/Home/WorkSummary'
            });
        }
    }
}
</script>