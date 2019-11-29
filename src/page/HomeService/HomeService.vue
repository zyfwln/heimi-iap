<style lang="less" src="./HomeService.less" scoped></style>

<template>
    <div id="HomeService">
        <div class="go-allot" @click.stop="goAllot()"><span>耗卡业绩分配</span></div>
        <home-chart class="chart"
                    id="serviceChart"
                    :rate="100"
                    :text="rate + 'No.1'"
                    title="耗卡排名"
                    color="#fff"
                    sub-color="#dbaf75">
        </home-chart>
        <home-tab :items="tabs" @Tab="tab"></home-tab>
        <div class="hd-date">
            <div class="left">
                <span>{{homeDate}}</span>
            </div>
            <div class="center">{{head.center}}</div>
            <div class="right">{{head.right}}</div>
        </div>

        <div class="wrap">

            <v-list class="list reserved"
                    :length="achievementList.length"
                    :show-loading="showLoading2"
                    v-show="activeIndex == 1">
                <div class="li is-link" v-for="v in achievementList" :key="v.ConsumeID" @click="toDetail(v)">
                    <div class="left">
                        <div class="type" :class="{ 'no': v.Type == 1 }">{{['专', '非'][v.Type]}}</div>
                        <div class="shop">{{['本店', '跨店'][v.InShop]}}</div>
                        <div class="name">{{v.consume.CustomerName}}</div>
                        <!-- <div class="iconfont" :class="'icon-sex-women'"></div> -->
                    </div>
                    <div class="center">￥{{$utils.NumberFormat(v.consume.Expend)}}</div>
                    <div class="right">
                        <div>￥{{$utils.NumberFormat(v.ExpendTotal)}}</div>
                        <div class="iconfont icon-right"></div>
                    </div>
                </div>
            </v-list>

            <v-list class="list reserved"
                    :length="reserveList.length"
                    :show-loading="showLoading3"
                    v-show="activeIndex == 2">
                <van-cell :name="index" v-for="(item, index) in reserveList" :key="index">
                    <span slot="title">{{item.CustomerName}}</span>
                    <span>{{item.AppointDate.substr(5, 11)}}</span>
                </van-cell>
            </v-list>
        </div>
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
            activeIndex     : 0,
            showLoading1    : true,
            showLoading2    : true,
            showLoading3    : true,
            achievementList : [],
            reserveList     : [],
            tabs            : [
                { value: 0, text: '今日目标(人)' },
                { value: 0, text: '耗卡业绩' }/* ,
                { value: 0, text: '今日未到店(人)' } */
            ]
        }
    },
    computed: {
        ...mapState(['homeDate']),
        head () {
            return [
                { center: '',        right: '' },
                { center: '耗卡金额', right: '耗卡业绩' },
                { center: '',        right: '预约时间' }
            ][this.activeIndex]
        },
        rate () {
            return ''
        },
        paramDate () {
            return {
                EndTime  : this.homeDate,
                StartTime: this.homeDate
            }
        }
    },
    watch: {
        homeDate () {
            this.getOverview()
            switch (this.activeIndex) {
                case 0:
                    break;
                
                case 1:
                    this.getAchievementList()
                    break;

                case 2:
                    this.getNoArriveList()
                    break;
            
                default:
                    break;
            }
        }
    },
    methods: {
        goAllot () {
            this.$router.push({
                path : '/Home/Service',
                query: {
                    Achievement : this.tabs[1].value
                }
            });
        },
        tab (_i) {
            this.activeIndex = _i
            switch (_i) {
                case 0:
                    break;

                case 1:
                    this.getAchievementList()
                    break;

                case 2:
                    this.getNoArriveList()
                    break;
            
                default:
                    break;
            }
        },
        getOverview () {
            this.$ajax({
                url : '/employee/SrvCharge/home',
                data: this.paramDate
            }).then((_res) => {
                this.tabs[0].value = _res.ExpendPlan
                this.tabs[1].value = `￥${this.$utils.NumberFormat(_res.ExpendTotal)}`
                // this.tabs[2].value = _res.NonArriveTotal
            })
        },
        getAchievementList () {
            this.$ajax({
                url : '/employee/SrvCharge/getExpendList',
                data: this.paramDate
            }).then((_res) => {
                this.achievementList = _res.Expend
                this.showLoading2    = false
            })
        },
        getNoArriveList () {
            this.$ajax({
                url : '/employee/appoint/getNoArriveList',
                data: this.paramDate
            }).then((_res) => {
                this.reserveList  = _res
                this.showLoading3 = false
            })
        },
        toDetail (_v) {
            this.$router.push({
                path : '/Home/ServiceDetail',
                query: {
                    ID: _v.ConsumeID
                }
            })
        }
    },
    created () {
        this.getOverview()
    }
}
</script>