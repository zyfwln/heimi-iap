<style lang="less" src="./HomeReserve.less" scoped></style>

<template>
    <div id="HomeReserve">
        <div class="date-range">{{homeDate}}</div>
        <home-chart class="chart"
                    :id="'reserveChart'"
                    :rate="rate >= 100 ? 100 : rate"
                    :text="rateText"
                    title="预约到店率"
                    color="#fff"
                    sub-color="#70d0d7">
        </home-chart>

        <home-tab :items="tabs" @Tab="tab"></home-tab>

        <div class="hd-date border-bottom">
            <div class="li">
                <div class="left">
                    <span>{{homeDate}}</span>
                </div>
                <div class="center">{{head[0]}}</div>
                <div class="right">{{head[1]}}</div>
            </div>
        </div>

        <div class="list">
            <!-- 全部预约 -->
            <v-list :show-loading="loading" :length="list.length" v-show="activeIndex === 0">
                <div class="li" v-for="(v, i) in list" :key="i">
                    <div class="left">
                        <div class="name">{{v.customer && v.customer.Name}}</div>
                    </div>
                    <div class="center">{{v.AppointDate && v.AppointDate.substring(11, 16)}}</div>
                    <div class="right">{{(v.consume && v.consume.IssueDate.substring(11, 16)) || '未到店'}}</div>
                </div>
            </v-list>
            <!-- 未到店 -->
            <v-list :show-loading="loading" :length="list.length" v-show="activeIndex === 1">
                <div class="li" v-for="(v, i) in list" :key="i">
                    <div class="left">
                        <div class="name">{{v.customer && v.customer.Name}}</div>
                    </div>
                    <div class="center">{{v.AppointDate && v.AppointDate.substring(11, 16)}}</div>
                    <div class="right flex">
                        <div class="iconfont icon-right" @click="selectedItem = v, show = true"></div>
                    </div>
                </div>
            </v-list>
            <!-- 邀约目标 -->
            <v-list :show-loading="loading" :length="list.length" v-show="activeIndex === 2">
                <div class="li" v-for="(v, i) in list" :key="i">
                    <div class="left">
                        <div class="name" style="margin-left: 0">{{v.customer && v.customer.Name}}</div>
                        <i v-if="v.customer&&v.customer.Sex==='男'" class="ic-sex-nan ml-5"></i>
                        <i v-else class="ic-sex-nv ml-5"></i>
                        <i class="ic-shou ml-20"></i>
                    </div>
                    <!--<div class="center">{{v.AppointDate && v.AppointDate.substring(11, 16)}}</div>-->
                    <div class="right flex" style="flex: initial">
                        <div class="iconfont icon-right" @click="selectedItem = v, show2 = true"></div>
                    </div>
                </div>
            </v-list>
        </div>

        <van-actionsheet v-model="show"
                        :actions="actions"
                        cancel-text="取消"
                        @select="onSelect" />

        <van-actionsheet v-model="show2"
                        :actions="actions2"
                        cancel-text="取消"
                        @select="onSelect2" />
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
            loading     : false,
            show        : false,
            show2       : false,
            activeIndex : 0,
            rate        : 0,
            tabs        : [
                { value: 0, text: '全部预约（人）' },
                { value: 0, text: '预约未到店（人）' },
                { value: 0, text: '邀约目标（人）' }
            ],
            actions     : [
                { name: '拨打电话' }
            ],
            actions2    : [
                { name: '拨打电话', index: 0 },
                { name: '立即预约', index: 1 },
                // { name: '取消邀约', index: 2 },
            ],
            list        : [],
            selectedItem: {}
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
        rateText () {
            return (this.rate == 0 ? 0 : this.rate >= 100 ? 100 : this.rate) + '%'
        },
        head () {
            return [
                ['预约时间', '完成时间'],
                ['预约时间', '操作'],
                ['', '操作']
            ][this.activeIndex]
        }
    },
    watch: {
        homeDate () {
            this.getOverView()
            this.tab(this.activeIndex)
        }
    },
    methods: {
        tab (_i) {
            this.activeIndex = _i
            this.list = []
            this.getList()
        },
        // 列表
        getList () {
            this.loading = true
            let param = [
                Object.assign({
                    Status : [1,2,3,4]
                }, this.paramDate),
                Object.assign({
                    Status : [1, 4]
                }, this.paramDate),
                {}
            ][this.activeIndex]
            setTimeout(() => {
                this.$ajax({
                    url : [
                        '/employee/appoint/getEmployeeAppoint',
                        '/employee/appoint/getEmployeeAppoint',
                        '/employee/achievePlan/getNotAppointPlanList'
                    ][this.activeIndex],
                    data: param
                }).then((data) => {
                    this.list = data.list || data.CustomerList
                    this.loading = false
                })
            }, 300)
        },
        // 总览
        getOverView () {
            this.$ajax({
                url : '/employee/appoint/getTarget',
                data: this.paramDate
            }).then((data) => {
                this.tabs = [
                    { value: data.All, text: '全部预约（人）' },
                    { value: data.NotArrive, text: '预约未到店（人）' },
                    { value: data.Plan, text: '邀约目标（人）' }
                ]
                this.rate = GetPercentage(data.All - data.NotArrive, data.All)
            })
        },
        onSelect () {
            if (this.selectedItem.customer && this.selectedItem.customer.Mobile) {
                window.location.href = `tel:${this.selectedItem.customer.Mobile}`
            } else {
                this.$toast('找不到电话')
            }
        },
        onSelect2 (v) {
            var vm = this;
            switch (v.index) {
                case 0:
                    if (vm.selectedItem && vm.selectedItem.customer &&vm.selectedItem.customer.Mobile) {
                        window.location.href = `tel:${vm.selectedItem.customer.Mobile}`
                    } else {
                        this.$toast('找不到电话')
                    }
                    break;

                case 1:
                    this.$router.push({
                        path: '/Home/ReserveAdd',
                        query: {
                            ID: vm.selectedItem.customer.ID,
                            Name: vm.selectedItem.customer.Name
                        }
                    })
                    break;

                // case 2:
                //     this.$dialog.confirm({
                //         title: '提示',
                //         message: '确定取消该邀约目标吗？'
                //     }).then(() => {
                        
                //     }).catch(() => {})
                //     break;

                default:
                    break;
            }
        },
    },
    created () {
        this.getOverView()
        this.getList()
    }
}
</script>