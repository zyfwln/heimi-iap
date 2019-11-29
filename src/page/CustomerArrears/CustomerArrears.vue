<style lang="less" src="./CustomerArrears.less" scoped></style>

<template>
    <layout-base id="CustomerArrears">
        <v-header class="header" slot="header">
            <div class="title" slot="center">欠款</div>
        </v-header>
        <div class="page">
            <div class="arrear-list">
                <div class="list-li border-bottom" v-for="(v, i) in list" :key="i" @click="toDetail()">
                    <div class="li-img">
                        <img :src="img">
                    </div>
                    <div class="li-wrap">
                        <div class="wrap-hd">
                            <span>美娜</span>
                            <span class="fr">-￥500</span>
                        </div>
                        <div class="wrap-bd">
                            <span class="date">2018-12-01</span>
                            <div class="fr btn">欠款明细</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </layout-base>
</template>

<script>
export default {
    data () {
        return {
            img: require('../../assets/image/headImg.png'),
            list: [{}, {}, {}, {}, {}]
        }
    },
    methods: {
        toDetail () {
            this.$router.push({
                path: '/Guest/ArrearsDetail'
            })
        }
    }
}
</script>