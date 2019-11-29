<style lang="less" src="./HomeDebt.less" scoped></style>

<template>
    <div id="HomeDebt">
        <home-chart class="chart"
                    id="debtChart"
                    :rate="100"
                    :text="'No.' + rank"
                    title="客户回款"
                    color="#fff"
                    sub-color="#dbaf75">
        </home-chart>
        <home-tab :items="tabs" @Tab="tab"></home-tab>
        <div class="hd-date border-bottom">
            <div class="li">
                <div class="left">
                    <span>{{homeDate}}</span>
                </div>
                <div class="center" v-show="head.center">{{head.center}}</div>
                <div class="right" v-show="head.right">{{head.right}}</div>
            </div>
        </div>

        <div class="wrap">
            <v-list class="list" :length="list.length" :show-loading="loading">
                <div class="li border-bottom" v-for="(v, i) in list" :key="i">
                    <div class="left">
                        <span>{{v.CustomerName || (v.Customer && v.Customer.Name)}}</span>
                        <i class="iconfont" :class="v.Customer && v.Customer.Sex == '男' ? 'icon-sex-man' : 'icon-sex-women'"></i>
                    </div>
                    <div class="center van-ellipsis">¥ {{$utils.NumberFormat(v.Debt || v.Repay)}}</div>
                    <div class="right" v-show="activeIndex !== 1">
                        <div class="iconfont icon-right" @click="selectedItem = v, show = true"></div>
                    </div>
                </div>
            </v-list>
        </div>

        <van-actionsheet v-model="show"
                        :actions="actions"
                        cancel-text="取消"
                        @select="onSelect" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import HomeChart    from '../../components/HomeChart/HomeChart.vue'
import HomeTab      from '../../components/HomeTab/HomeTab.vue'

export default {
    components: {
        HomeChart,
        HomeTab
    },
    data () {
        return {
            show: false,
            loading: true,
            activeIndex: 0,
            rank: 0,
            tabs: [
                { value: 0, text: '今日欠款' },
                { value: 0, text: '今日回款' },
                { value: 0, text: '总欠款' }
            ],
            list1: [],
            list2: [],
            list3: [],
            actions: [
                { name: '拨打电话', index: 0 },
                { name: '查看详情', index: 1 }
            ],
            selectedItem: {}
        }
    },
    computed: {
        ...mapState(['homeDate']),
        head () {
            return [
                { center: '欠款', right: '操作' },
                { center: '回款', right: '' },
                { center: '欠款', right: '操作' }
            ][this.activeIndex]
        },
        paramDate () {
            return {
                EndTime     : this.homeDate,
                StartTime   : this.homeDate
            }
        },
        list () {
            return [
                this.list1, this.list2, this.list3
            ][this.activeIndex]
        }
    },
    watch: {
        homeDate () {
            this.getDebt()
            switch (this.activeIndex) {
                case 0:
                    this.getDebtList()
                    break;
                
                case 1:
                    this.getRepayList()
                    break;

                case 2:
                    this.getAllDebtList()
                    break;
            
                default:
                    break;
            }
        }
    },
    methods: {
        // 欠款总览
        getDebt () {
            this.$ajax({
                url : '/employee/debt/getTodayDebt',
                data: this.paramDate
            }).then((data) => {
                this.tabs = [
                    { value: `￥${this.$utils.NumberFormat(data.Debt)}`,    text: '今日欠款' },
                    { value: `￥${this.$utils.NumberFormat(data.Repay)}`, text: '今日回款' },
                    { value: `￥${this.$utils.NumberFormat(data.AllDebt)}`, text: '总欠款' }
                ]
            })
        },
        // 欠款列表
        getDebtList () {
            this.$ajax({
                url: '/employee/debt/getDebtList',
                data: this.paramDate
            }).then((data) => {
                this.list1 = data.List
                this.loading = false
            })
        },
        // 回款列表
        getRepayList () {
            this.$ajax({
                url : '/employee/debt/getRepayList',
                data: this.paramDate
            }).then((data) => {
                this.list2 = data.List
                this.loading = false
            })
        },
        // 总欠款
        getAllDebtList () {
            this.$ajax({
                url : '/employee/debt/getDebtList'
            }).then((data) => {
                this.list3 = data.List
                this.loading = false
            })
        },
        tab (i) {
            this.activeIndex = i
            switch (i) {
                case 0:
                    this.getDebtList()
                    break;
                
                case 1:
                    this.getRepayList()
                    break;

                case 2:
                    this.getAllDebtList()
                    break;

                default:
                    break;
            }
        },
        onSelect (v) {
            switch (v.index) {
                case 0:
                    if (this.selectedItem.Customer && this.selectedItem.Customer.Mobile) {
                        window.location.href = `tel:${this.selectedItem.Customer.Mobile}`
                    } else {
                        this.$toast({
                            message: '找不到电话'
                        })
                    }
                    break;

                case 1:
                    this.$router.push({
                        name: 'DebtDetail',
                        params: Object.assign({
                            CustomerID: this.selectedItem.CustomerID
                        }, [this.paramDate, this.paramDate, {}][this.activeIndex])
                    })
                    break;

                default:
                    break;
            }
        }
    },
    created () {
        this.getDebt()
        this.getDebtList()
    }
}
</script>