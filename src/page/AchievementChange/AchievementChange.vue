<style lang="less" src="./AchievementChange.less" scoped></style>

<template>
    <layout-base id="AchievementChange">
        <v-header slot="header" class="header">
            <div class="title" slot="center">{{title}}</div>
        </v-header>
        <div class="page">
            <v-list class="items" :length="items.length" :show-loading="showL">
                <div class="item" v-for="(v, i) in items" :key="i">
                    <div class="item-head">
                        <div class="iconfont icon-time"></div>
                        <div>{{v.ConsumeDate.substr(0, 16)}}</div>
                    </div>
                    <div class="item-bd border-bottom">
                        <div class="bd-t border-bottom">
                            <span>{{v.CustomerName}}</span>
                            <span class="fr color-ff3535">{{status}}</span>
                        </div>
                        <div class="bd-c border-bottom">
                            <div class="van-ellipsis">{{v.buy.ProductName}}</div>
                            <div>￥{{$utils.NumberFormat(v.buy.TotalMoney)}}</div>
                        </div>
                        <div class="bd-f border-bottom">
                            <div class="f-l">
                                <span>{{['申请技师', '专属技师', '专属技师'][type]}}</span>
                                <span class="color-734aff">{{type == 0 ? v.ApplyEmployeeName : v.ApprovalEmployeeName}}</span>
                            </div>
                            <div class="f-r">
                                <div>申请比例</div>
                                <div>
                                    <v-progress :percentage="Number((Number(v.Proportion) / 100).toFixed(2))" color="#7fcf86"></v-progress>
                                </div>
                                <div class="color-27aa39">{{$utils.NumberFormat(v.Proportion)}}%</div>
                            </div>
                        </div>
                        <div class="bd-btns">
                            <div class="btn" @click="confirm(v)">{{['同意', '修订申请', '重新申请'][type]}}</div>
                            <div class="btn" @click="cancel(v)">{{['拒绝', '取消申请', '取消申请'][type]}}</div>
                        </div>
                    </div>
                </div>
            </v-list>
        </div>

        <transition name="trans-pop">
            <div class="v-pop-group" v-if="showForm">
                <div class="pop-overlay" @click="showForm = false"></div>
                <div class="pop-content">
                    <div class="pop-head">
                        <h3 class="title">业绩分配申请修改</h3>
                    </div>
                    <div class="ul">
                        <van-cell>
                            <span class="title" slot="title">分配客户</span>
                            <span class="value">{{selectItem.CustomerName}}</span>
                        </van-cell>
                        <van-cell>
                            <span class="title" slot="title">消费金额</span>
                            <span class="value">￥{{selectItem.SellMoney}}</span>
                        </van-cell>
                        <van-cell>
                            <span class="title" slot="title">专属技师</span>
                            <span class="value">{{selectItem.ApprovalEmployeeName}}</span>
                        </van-cell>
                        <van-cell>
                            <span class="title" slot="title">我的比例</span>
                            <div class="input-box">
                                <div class="input">
                                    <div>
                                        <input type="number" v-model="rate">
                                    </div>
                                    <div>%</div>
                                </div>
                            </div>
                        </van-cell>
                        <van-button tag="div" @click="confirmEdit()">确认修改</van-button>
                    </div>
                </div>
            </div>
        </transition>
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
            items       : [],
            showL       : true,
            showForm    : false,
            selectItem  : {},
            rate        : 0,
            type        : this.$route.query.Type
        }
    },
    computed: {
        title () {
            return ['同事申请业绩', '我的申请', '申请被拒绝'][this.type]
        },
        status () {
            return ['待确认', '申请中', '被拒绝'][this.type]
        }
    },
    methods: {
        getList () {
            this.$ajax({
                url: ['/employee/achieve/getApprovalList', '/employee/achieve/getApplyList', '/employee/achieve/getRefuseList'][this.type]
            }).then((_res) => {
                this.items = _res.ApprovalList || _res.ApplyList || _res.RefuseList
                this.showL = false
            })
        },
        confirm (_v) {
            if (this.type == 0) {
                this.$dialog.confirm({
                    title   : '提示',
                    message : '确定同意该申请吗？'
                }).then(() => {
                    this.$ajax({
                        url : '/employee/achieve/agreeApply',
                        data: {
                            InitialProportion   : _v.Proportion,
                            AchieveID           : _v.AchieveID,
                            Status              : _v.Status
                        }
                    }).then(() => {
                        this.getList()
                    })
                }).catch(() => {})
            } else {
                this.showForm   = true
                this.selectItem = _v
            }
        },
        confirmEdit () {
            this.$dialog.confirm({
                title   : '提示',
                message : '确认修改这条申请吗？'
            }).then(() => {
                this.$ajax({
                    url : '/employee/achieve/alterProportion',
                    data: {
                        AchieveID           : this.selectItem.AchieveID,
                        Status              : this.selectItem.Status,
                        InitialProportion   : this.selectItem.Proportion,
                        Proportion          : this.rate
                    }
                }).then(() => {
                    this.$toast('修改成功')
                    this.showForm = false
                    this.getList()
                })
            }).catch(() => {})
        },
        cancel (_v) {
            this.$dialog.confirm({
                title   : '提示',
                message : ['确定拒绝该申请吗？', '确定取消该申请吗？', '确定取消该申请吗？'][this.type]
            }).then(() => {
                this.$ajax({
                    url : ['/employee/achieve/refuseApply', '/employee/achieve/cancelApply', '/employee/achieve/cancelApply'][this.type],
                    data: {
                        AchieveID           : _v.AchieveID,
                        Status              : _v.Status,
                        InitialProportion   : _v.InitialProportion || _v.Proportion
                    }
                }).then(() => {
                    this.getList()
                })
            }).catch(() => {})
        }
    },
    created () {
        this.getList()
    }
}
</script>