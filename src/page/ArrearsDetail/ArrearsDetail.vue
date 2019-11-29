<style lang="less" src="./ArrearsDetail.less" scoped></style>

<template>
    <layout-base id="ArrearsDetail">
        <v-header class="header" slot="header">
            <div class="title" slot="center">欠款明细</div>
        </v-header>
        <div class="page">
            <h3 class="border-bottom">2018-02-25 15:00</h3>
            <ul class="border-bottom">
                <li v-for="(v, i) in list" :key="i">
                    <div class="type">项目</div>
                    <div class="name">小气泡</div>
                    <div class="num">1</div>
                    <div class="money">￥441.00</div>
                </li>
            </ul>
            <div class="details">
                <dl>
                    <dt>总计：</dt>
                    <dd>￥882.00</dd>
                </dl>
                <dl>
                    <dt>支付宝支付：</dt>
                    <dd>￥200.00</dd>
                </dl>
                <dl>
                    <dt>储值卡支付：</dt>
                    <dd>￥182.00</dd>
                </dl>
                <dl>
                    <dt>欠款：</dt>
                    <dd>￥500.00</dd>
                </dl>
            </div>
        </div>
    </layout-base>
</template>

<script>
export default {
    data () {
        return {
            list: [{}, {}]
        }
    }
}
</script>