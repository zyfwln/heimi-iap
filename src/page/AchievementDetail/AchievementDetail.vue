<style lang="less" src="./AchievementDetail.less" scoped></style>

<template>
    <layout-base id="AchievementDetail">
        <v-header class="header" slot="header">
            <div class="title" slot="center">业绩明细</div>
        </v-header>
        <div class="page">
            <div class="detail">
                <dl class="border-bottom">
                    <dt>
                        <div class="title">客户姓名</div>
                    </dt>
                    <dd>
                        <div class="type" :class="{ 'no': achieve[0] && achieve[0].Type == 1 }">{{achieve[0] && ['专', '非'][achieve[0].Type]}}</div>
                        <div class="name">{{consume.CustomerName}}</div>
                        <div class="iconfont icon-sex-women"></div>
                    </dd>
                </dl>
                <dl class="border-bottom">
                    <dt>
                        <div class="title">消费时间</div>
                    </dt>
                    <dd>
                        <div>{{consume.IssueDate && consume.IssueDate.substr(0, 16)}}</div>
                    </dd>
                </dl>
                <dl>
                    <dt>
                        <div class="title">消费明细</div>
                    </dt>
                </dl>
                <ul class="border-bottom">
                    <dl class="p" v-for="(v, i) in consume.buy" :key="i">
                        <dt>
                            <div class="cate" :class="{ 'no': v.Type == '产品' }">{{v.Type}}</div>
                        </dt>
                        <dd>
                            <div class="bd">
                                <div class="left van-ellipsis">{{v.Name}}</div>
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
                        <div>￥{{$utils.NumberFormat(Number(consume.SellMoney).ToFloat())}}</div>
                        <!-- <div>￥5000</div> -->
                        <div>￥{{$utils.NumberFormat(Number(consume.UseMoneyCard).ToFloat())}}</div>
                        <div>￥{{$utils.NumberFormat(Number(consume.Debt).ToFloat())}}</div>
                    </div>
                </div>
            </div>

            <div class="detail">
                <dl>
                    <dt>
                        <div class="title width">我的分配比例</div>
                    </dt>
                </dl>
                <ul class="border-bottom">
                    <dl class="p" v-for="(v, i) in achieve" :key="i + 100">
                        <dt>
                            <div class="cate" :class="{ 'no': v.buy.Type == '产品' }">{{v.buy.Type}}</div>
                        </dt>
                        <dd>
                            <div class="rate">
                                <div class="name van-ellipsis">{{v.buy.Name}}</div>
                                <v-progress :height="6" :percentage="Number(v.Proportion) / 100" color="#8574f1"></v-progress>
                                <div class="text">{{Number(v.Proportion)}}%</div>
                            </div>
                        </dd>
                    </dl>
                </ul>
                <div class="pay">
                    <div class="left">
                        <div>现金业绩：</div>
                        <div>耗卡业绩：</div>
                    </div>
                    <div class="right">
                        <div>￥{{$utils.NumberFormat(cash.ToFloat())}}</div>
                        <div>￥{{$utils.NumberFormat(card.ToFloat())}}</div>
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
            consume: {},
            achieve: {},
            cash: 0,
            card: 0
        }
    },
    methods: {
    },
    created () {
        this.$ajax({
            url: '/employee/achieve/getAchieveDetail',
            data: {
                ConsumeID: this.$route.query.ID
            }
        }).then((_res) => {
            this.consume = _res.Consume
            this.achieve = _res.Achieve
            for (let i = 0, len = _res.Achieve.length; i < len; i++) {
                let item = _res.Achieve[i]
                this.cash += Number(item.buy.Cash)
                this.card += Number(item.buy.UseCard)
            }
        })
    }
}
</script>