<style lang="less" src="./HomeAchievement.less" scoped></style>

<template>
    <div id="HomeAchievement">
        <div class="go-allot" @click="toAllot()"><span>销售业绩分配</span></div>
        <div class="go-allot-right" @click="toPlainningListForMonth()"><span>本月规划列表</span></div>
        <home-chart class="chart"
                    id="achieveChart"
                    :rate="rate > 100 ? 100 : rate"
                    :text="rate > 100 ? '100%' : rate + '%'"
                    title="业绩完成率"
                    color="#fff339"
                    sub-color="#b6a5ff">
        </home-chart>
        <home-tab :items="tabs" @Tab="tab"></home-tab>
        <div class="hd-date border-bottom">
            <div class="left">
                <span>{{homeDate}}</span>
            </div>
            <div class="center">{{head.center}}</div>
            <div class="right">{{head.right}}</div>
        </div>

        <div class="wrap">
            <v-list class="list" :length="targets.length" :show-loading="showLoading" v-show="activeIndex == 0">
                <ul>
                    <li v-for="(v, i) in targets" :key="i">
                        <div>{{v.customer && v.customer.Name}}</div>
                        <div class="van-ellipsis">{{v.CourseName}}</div>
                        <div>￥{{$utils.NumberFormat(v.PlanMoney)}}</div>
                    </li>
                </ul>
            </v-list>

            <v-list class="list" :length="cashAchieves.length" :show-loading="showLoading2" v-show="activeIndex == 1">
                <div class="li is-link" v-for="v in cashAchieves" :key="v.ConsumeID" @click="toDetail(v)">
                    <div class="left">
                        <div class="type" :class="{ 'no': v.Type == 1 }">{{['专', '非'][v.Type]}}</div>
                        <div class="shop">{{['本店', '跨店'][v.InShop]}}</div>
                        <div class="name van-ellipsis">{{v.consume.CustomerName}}</div>
                        <!-- <div class="iconfont" :class="'icon-sex-women'"></div> -->
                    </div>
                    <div class="center">￥{{$utils.NumberFormat(v.consume.SellMoney)}}</div>
                    <div class="right">
                        <div>￥{{$utils.NumberFormat(v.Cash)}}</div>
                        <div class="iconfont icon-right"></div>
                    </div>
                </div>
            </v-list>

            <v-list class="list" :length="cardAchieveList.length" :show-loading="showLoading3" v-show="activeIndex == 2">
                <div class="li is-link" v-for="v in cardAchieveList" :key="v.ConsumeID" @click="toDetail(v)">
                    <div class="left">
                        <div class="type" :class="{ 'no': v.Type == 1 }">{{['专', '非'][v.Type]}}</div>
                        <div class="shop">{{['本店', '跨店'][v.InShop]}}</div>
                        <div class="name">{{v.consume.CustomerName}}</div>
                        <!-- <div class="iconfont" :class="'icon-sex-women'"></div> -->
                    </div>
                    <div class="center">￥{{$utils.NumberFormat(v.consume.SellMoney)}}</div>
                    <div class="right">
                        <div>￥{{$utils.NumberFormat(v.UseCard)}}</div>
                        <div class="iconfont icon-right"></div>
                    </div>
                </div>
            </v-list>
        </div>
        <div class="btn-add" @click.stop="goAdd()" v-show="activeIndex == 0">销售规划</div>

        <div class="more" v-show="false">
            <transition name="scale">
                <ul v-show="more">
                    <li v-for="(v, i) in moreItems" :key="v.icon" @click="moreClick(i)">
                        <div class="iconfont" :class="v.icon"></div>
                        <div class="text">{{v.text}}</div>
                    </li>
                </ul>
            </transition>
            <div class="iconfont icon-add" :class="{ 'on': more }" @click="more = !more"></div>
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
            activeName      : [],
            targets         : [],
            cashAchieves    : [],
            cardAchieveList : [],
            openList        : [{}],
            activeIndex     : 0,
            more            : false,
            showLoading     : true,
            showLoading2    : true,
            showLoading3    : true,
            rate            : 0,
            tabs: [
                { value: 0, text: '目标业绩' },
                { value: 0, text: '现金业绩' },
                { value: 0, text: '划卡业绩' }
            ],
            moreItems       : [
                { icon: 'icon-reserve',         text: '预约' },
                { icon: 'icon-plan',            text: '规划' },
                { icon: 'icon-delete-contact',  text: '删除' }
            ]
        }
    },
    computed: {
        ...mapState(['homeDate']),
        head () {
            return [
                { center: '',        right: '' },
                { center: '消费金额', right: '现金业绩' },
                { center: '消费金额', right: '划卡业绩' }
            ][this.activeIndex]
        },
        paramDate () {
            return {
                EndTime     : this.homeDate,
                StartTime   : this.homeDate
            }
        }
    },
    watch: {
        homeDate () {
            this.getAchieve()
            switch (this.activeIndex) {
                case 0:
                    this.getPlaneList()
                    break;
                
                case 1:
                    this.getCashAchieveList()
                    break;

                case 2:
                    this.getCardAchieveList()
                    break;
            
                default:
                    break;
            }
        }
    },
    methods: {
        getAchieve () {
            this.$ajax({
                url : '/employee/achieve/home',
                data: this.paramDate
            }).then((data) => {
                this.tabs = [
                    { value: `￥${this.$utils.NumberFormat(data.PlanMoney)}`,    text: '目标业绩' },
                    { value: `￥${this.$utils.NumberFormat(data.CashTotal)}`, text: '现金业绩' },
                    { value: `￥${this.$utils.NumberFormat(data.UseCardTotal)}`, text: '划卡业绩' }
                ]
                this.rate = parseInt(data.PlanMoney == 0
                            ?
                            Number(data.CashTotal) / 1
                            :
                            (Number(data.CashTotal) / Number(data.PlanMoney) * 100))
            })
        },
        goAdd () {
            this.$router.push({
                path: '/AchievementAdd'
            })
        },
        toAllot () {
            this.$router.push({
                path  : '/Home/Achievement',
                query : {
                    Date        : this.homeDate,
                    Achievement : this.tabs[1].value
                }
            })
        },
        toPlainningListForMonth () {
            this.$router.push({
                path  : '/PlainningListForMonth/PlainningListForMonth',
                query : {
                    Date        : this.homeDate,
                    Achievement : this.tabs[1].value
                }
            })
        },
        // 目标业绩
        getPlaneList () {
            this.$ajax({
                url : '/employee/achievePlan/getHasAppointPlanList',
                data: this.paramDate
            }).then((data) => {
                this.targets     = data.PlanList
                this.showLoading = false
            })
        },
        getCashAchieveList () {
            this.$ajax({
                url : '/employee/achieve/getSellMoneyList',
                data: this.paramDate
            }).then((_res) => {
                this.cashAchieves = _res.AchieveList.filter(_item => _item.ConsumeID)
                this.showLoading2 = false
            })
        },
        getCardAchieveList () {
            this.$ajax({
                url : '/employee/achieve/getUseCardList',
                data: this.paramDate
            }).then((_res) => {
                this.cardAchieveList = _res.AchieveList.filter(_item => _item.ConsumeID)
                this.showLoading3    = false
            })
        },
        tab (_i) {
            this.activeIndex = _i
            switch (_i) {
                case 0:
                    this.getPlaneList()
                    break;
                
                case 1:
                    this.getCashAchieveList()
                    break;

                case 2:
                    this.getCardAchieveList()
                    break;

                default:
                    break;
            }
        },
        moreClick () {},
        toDetail (_v) {
            this.$router.push({
                path    : '/Home/AchievementDetail',
                query   : {
                    ID: _v.ConsumeID
                }
            })
        }
    },
    created () {
        this.getAchieve()
        this.getPlaneList()
    }
}
</script>