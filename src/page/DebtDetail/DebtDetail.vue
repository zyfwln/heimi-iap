<style lang="less" src="./DebtDetail.less" scoped></style>

<template>
    <layout-base id="DebtDetail">
        <v-header class="header" slot="header">
            <div class="title" slot="center">欠款明细</div>
        </v-header>
        <div class="page">
            <div class="detail">
                <div class="items">
                    <div class="item" v-for="(item, index) in items" :key="index">
                        <div class="head border-bottom">{{item.IssueDate && item.IssueDate.substring(0, 16)}}</div>
                        <ul class="border-bottom">
                            <dl class="p" v-for="(v, i) in item.buy" :key="i">
                                <dt>
                                    <div class="cate" :class="{ 'no': v.Type == '产品' }">{{v.Type}}</div>
                                </dt>
                                <dd>
                                    <div class="bd">
                                        <div class="left van-ellipsis">{{v.ProductName}}</div>
                                        <div class="center">{{v.Quantity}}</div>
                                        <div class="right">￥{{$utils.NumberFormat(v.TotalMoney)}}</div>
                                    </div>
                                </dd>
                            </dl>
                        </ul>
                        <div class="pay">
                            <div class="left">
                                <div>总计：</div>
                                <!-- <div>支付宝支付：</div> -->
                                <div>储值卡支付：</div>
                                <div>欠款：</div>
                            </div>
                            <div class="right">
                                <div>￥{{$utils.NumberFormat(item.SellMoney)}}</div>
                                <!-- <div>￥5000</div> -->
                                <div>￥{{$utils.NumberFormat(item.UseMoneyCard)}}</div>
                                <div class="red">￥{{$utils.NumberFormat(item.Debt)}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </layout-base>
</template>

<script>
import Progress from '../../components/Progress/Progress.vue'

export default {
    components: {
        'v-progress': Progress
    },
    data () {
        return {
            items: []
        }
    },
    methods: {
    },
    created () {
        this.$ajax({
            url: '/employee/debt/getDebtDetail',
            data: this.$route.params
        }).then((data) => {
            this.items = data.List
        })
    }
}
</script>