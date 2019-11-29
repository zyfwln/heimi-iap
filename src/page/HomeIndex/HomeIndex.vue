<style lang="less" src="./HomeIndex.less" scoped></style>

<template>
    <div id="HomeIndex">
        <div class="date-range">{{dateText}}</div>
        <home-chart class="chart"
                    :id="'indexChart'"
                    :rate="rate > 100 ? 100 : rate"
                    :text="rate > 100 ? '100%' : rate + '%'"
                    title="业绩完成率"
                    color="#fff339"
                    sub-color="#9ccaff">
        </home-chart>
        
        <div id="HomeTab">
            <div class="dl" v-for="(v, i) in tabs" :key="i">
                <div class="dt">{{v.value}}</div>
                <div class="dd">{{v.text}}</div>
            </div>
        </div>

        <div class="hd-date border-bottom">
            <div class="left">
                <span>{{homeDate}}</span>
            </div>
            <div class="center">
                <span>目标</span>
            </div>
            <div class="right">
                <span>完成</span>
            </div>
        </div>
        <div class="list">
            <div class="li border-bottom" v-for="(v, i) in list" :key="i">
                <div class="iconfont" :class="v.icon"></div>
                <div class="left">{{v.name}}</div>
                <div class="center">{{v.target}}</div>
                <div class="right" :class="{ 'red' : v.finish < v.target }">{{v.finish}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import HomeChart    from '../../components/HomeChart/HomeChart.vue'
import HomeTab      from '../../components/HomeTab/HomeTab.vue'
import { GetPercentage } from '../../assets/js/utils'

export default {
    components: {
        HomeChart,
        HomeTab
    },
    data () {
        return {
            rate: 0,
            dateText: '',
            tabs: [
                { value: 0, text: '月度目标' },
                { value: 0, text: '月度业绩' }/* ,
                { value: 0, text: '总欠款' } */
            ],
            list: [
                { icon: 'icon-appointment', name: '今日预约', target: '0人', finish: '0人' },
                { icon: 'icon-achieve', name: '今日业绩', target: '¥0', finish: '¥0' },
                { icon: 'icon-debt', name: '今日欠款', target: '--', finish: '¥0' },
                { icon: 'icon-watch', name: '今日耗卡', target: '0人', finish: '0人' },
                { icon: 'icon-return', name: '今日回访', target: '--', finish: '人' },
                { icon: 'icon-new-guest', name: '每月新客', target: '0人', finish: '0人' },
            ]
        }
    },
    computed: {
        ...mapState(['homeDate']),
        paramDate () {
            return {
                StartTime: this.homeDate,
                EndTime: this.homeDate
            }
        },
        // dateText () {
        //     let month = this.homeDate.substr(0, 7)
        //     let max = new Date(this.homeDate.substr(0, 4), this.homeDate.substr(5, 2), 0)
        //     return `${month}-01~${month}-${max.getDate()}`
        // },
        rateText () {
            return (this.rate == 0 ? 0 : this.rate >= 100 ? 100 : this.rate * 100) + '%'
        }
    },
    watch: {
        homeDate () {
            this.getOverView()
            this.getList()
        }
    },
    methods: {
        request (i, param, cb) {
            this.$ajax({
                url : [
                    '/employee/appoint/getTarget',
                    '/employee/home/todayAchieve',
                    '/employee/debt/getTodayDebt',
                    '/employee/home/todayExpend',
                    '/employee/Home/todayVisit',
                    '/employee/NewCustomer/getTarget'][i],
                data: param
            }).then((res) => {
                cb && cb(res)
            })
        },
        getOverView () {
            let date = new Date()
            this.dateText = `${date.getFullYear()}年${date.getMonth() + 1}月`
            this.$ajax({
                url : '/employee/home/overView',
                data: {
                    Type: 1,
                    Part: date.getMonth() + 1,
                    Year: date.getFullYear()
                }
            }).then((data) => {
                this.tabs = [
                    { value: `￥${this.$utils.NumberFormat(data.PlanTotal)}`, text: '月度目标' },
                    { value: `￥${this.$utils.NumberFormat(data.AchieveTotal)}`, text: '月度业绩' }
                ]
                this.rate = GetPercentage(data.AchieveTotal, data.PlanTotal)
            })
        },
        getList () {
            // 今日预约
            this.request(0, this.paramDate, (data) => {
                this.list.splice(0, 1, {
                    icon    : 'icon-appointment',
                    name    : '今日预约',
                    target  : `--`,
                    finish  : `${Number(data.All - data.NotArrive)}人`
                })
            })

            // 今日业绩
            this.request(1, this.paramDate, (data) => {
                this.list.splice(1, 1, {
                    icon    : 'icon-achieve',
                    name    : '今日业绩',
                    target  : `￥${this.$utils.NumberFormat(data.PlanMoney)}`,
                    finish  : `￥${this.$utils.NumberFormat(data.FinishMoney)}`
                })
            })

            // 今日欠款
            this.request(2, this.paramDate, (data) => {
                this.list.splice(2, 1, {
                    icon    : 'icon-return',
                    name    : '今日欠款',
                    target  : `--`,
                    finish  : `¥ ${this.$utils.NumberFormat(data.Debt)}`
                })
            })

            // 今日耗卡
            this.request(3, this.paramDate, (data) => {
                this.list.splice(3, 1, {
                    icon    : 'icon-watch',
                    name    : '今日耗卡',
                    target  : `--`,
                    finish  : `${data.FinishCount}次`
                })
            })

            // 今日回访
            this.request(4, this.paramDate, (data) => {
                this.list.splice(4, 1, {
                    icon    : 'icon-return',
                    name    : '今日回访',
                    target  : `--`,
                    finish  : `${data.VisitTotal}人`
                })
            })

            // 每月新客
            this.request(5, { MonthSign: this.homeDate.substr(0, 7) }, (data) => {
                this.list.splice(5, 1, {
                    icon    : 'icon-new-guest',
                    name    : '每月新客',
                    target  : `${data.NewCustomerTarget}人`,
                    finish  : `${data.NewCustomerNum}人`
                })
            })
        }
    },
    created () {
        this.getOverView()
        this.getList()
    }
}
</script>