<style lang="less" src="./ServiceDetail.less" scoped></style>

<template>
    <layout-base id="ServiceDetail">
        <v-header class="header" slot="header">
            <div class="title" slot="center">耗卡明细</div>
        </v-header>
        <div class="page">
            <div class="detail">
                <dl class="border-bottom">
                    <dt>
                        <div class="title">耗卡用户</div>
                    </dt>
                    <dd>
                        <div class="type" :class="{ 'no': expend[0] && expend[0].Type == 1 }">{{expend[0] && ['专', '非'][expend[0].Type]}}</div>
                        <div class="name">{{consume.CustomerName}}</div>
                        <div class="iconfont icon-sex-women"></div>
                    </dd>
                </dl>
                <dl class="border-bottom">
                    <dt>
                        <div class="title">耗卡时间</div>
                    </dt>
                    <dd>
                        <div>{{consume.IssueDate && consume.IssueDate.substr(0, 16)}}</div>
                    </dd>
                </dl>
                <dl>
                    <dt>
                        <div class="title">耗卡明细</div>
                    </dt>
                </dl>
                <ul class="border-bottom">
                    <dl class="p" v-for="(v, i) in consume.use" :key="i">
                        <dt>
                            <div class="cate">项目</div>
                        </dt>
                        <dd>
                            <div class="bd">
                                <div class="left van-ellipsis">{{v.ProjectName}}</div>
                                <div class="center">{{v.UseTimes}}</div>
                                <div class="right">￥{{$utils.NumberFormat(v.TotalMoney)}}</div>
                            </div>
                        </dd>
                    </dl>
                </ul>
            </div>

            <div class="detail">
                <dl>
                    <dt>
                        <div class="title width">我的分配比例</div>
                    </dt>
                </dl>
                <ul class="border-bottom">
                    <dl class="p" v-for="(v, i) in expend" :key="i + 100">
                        <dt>
                            <div class="cate">项目</div>
                        </dt>
                        <dd>
                            <div class="rate">
                                <div class="name van-ellipsis">{{v.ProjectName}}</div>
                                <v-progress :height="6" :percentage="Number(v.Proportion) / 100" color="#b76b08"></v-progress>
                                <div class="text">{{Number(v.Proportion)}}%</div>
                            </div>
                        </dd>
                    </dl>
                </ul>
                <div class="pay">
                    <div class="left">
                        <div>耗卡业绩：</div>
                    </div>
                    <div class="right">
                        <div>￥{{$utils.NumberFormat(consume.Expend)}}</div>
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
            expend: {}
        }
    },
    methods: {
    },
    created () {
        this.$ajax({
            url: '/employee/SrvCharge/getExpendDetail',
            data: {
                ConsumeID: this.$route.query.ID
            }
        }).then((_res) => {
            this.consume = _res.Consume
            this.expend = _res.Expend
        })
    }
}
</script>