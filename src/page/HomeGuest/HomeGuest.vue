<style lang="less" src="./HomeGuest.less" scoped></style>

<template>
    <div id="HomeGuest">
        <div class="date-range">{{dateText}}</div>
        <home-chart class="chart"
                    :id="'guestChart'"
                    :rate="rate"
                    :text="`${customerNum.num}/${customerNum.target}`"
                    :title="'本月新客成交人数'"
                    :color="'#fff'"
                    :sub-color="'#adadad'">
        </home-chart>
        <home-tab :items="tabs" @Tab="tabTo"></home-tab>
        
        <div class="hd-date border-bottom">
            <div class="left">
                <span>{{date}}</span>
            </div>
            <div class="center">{{head.center}}</div>
            <div class="right">{{head.right}}</div>
        </div>

        <div class="wrap">
            <!-- 剩余跟进 -->
            <van-list class="list" v-model="loading" :finished="finished" @load="getTargetList" finished-text="到底了" v-if="activeIndex == 0">
                <div class="li border-bottom" v-for="(v, i) in targetList" :key="i">
                    <div class="cell">
                        <i class="iconfont" :class="v.Sex === '男' ? 'icon-sex-man' : 'icon-sex-women'"></i>
                        <span class="van-ellipsis">{{v.CusName}}</span>
                    </div>
                    <div class="cell">{{v.LastFollowDate && v.LastFollowDate.substring(0, 16)}}</div>
                    <div class="cell">
                        <i class="iconfont icon-tel" @click="toCall(v)"></i>
                        <i class="iconfont icon-record-3" @click="toRecord(v)"></i>
                        <i class="iconfont icon-detail" @click="toRecordList(v)"></i>
                    </div>
                </div>
            </van-list>

            <!-- 月跟进 -->
            <v-list class="list" :show-loading="loading" :length="followList.length" v-if="activeIndex == 1">
                <div class="li border-bottom" v-for="(v, i) in followList" :key="i">
                    <div class="cell">
                        <i class="iconfont" :class="v.Sex === '男' ? 'icon-sex-man' : 'icon-sex-women'"></i>
                        <span class="van-ellipsis">{{v.CusName}}</span>
                    </div>
                    <div class="cell">{{v.Mobile}}</div>
                    <div class="cell">{{v.FollowTimes}}</div>
                </div>
            </v-list>

            <!-- 月成交 -->
            <van-list class="list" v-model="loading" :finished="finished" @load="getMonthRecordList" v-if="activeIndex == 2">
                <div class="li border-bottom" :name="i" v-for="(v, i) in finishList" :key="i">
                    <div class="cell">
                        <i class="iconfont" :class="v.Sex === '男' ? 'icon-sex-man' : 'icon-sex-women'"></i>
                        <span class="van-ellipsis">{{v.Name}}</span>
                    </div>
                    <div class="cell">{{v.SourceType}}</div>
                    <div class="cell revoke right" @click="revoke(v)">
                        <div class="iconfont icon-revoke"></div>
                        <div class="text">撤销</div>
                    </div>
                </div>
            </van-list>

            <div class="wrap-bottom" v-show="activeIndex == 2">
                <p>(如非本人客户添加错误，两天内可自行撤销该客户)</p>
            </div>
        </div>

        <div class="btn-add" @click="showC = true" v-show="activeIndex == 0">添加跟进目标</div>
        <div class="btn-add" @click="showF = true" v-show="activeIndex == 2">添加我的新客</div>

        <follow-customer v-model="showC" @Select="addNewGuest"></follow-customer>
        <new-customer-apply v-model="showF" @Select="applyNewGuest"></new-customer-apply>
    </div>
</template>

<script>
import { mapState }     from 'vuex'
import HomeChart        from '../../components/HomeChart/HomeChart.vue'
import HomeTab          from '../../components/HomeTab/HomeTab.vue'
import FollowCustomer   from '../../components/FollowCustomer/FollowCustomer.vue'
import NewCustomerApply from '../../components/NewCustomerApply/NewCustomerApply.vue'
import { ConsultType }  from '../../assets/js/const.js'

export default {
    components: {
        HomeChart,
        HomeTab,
        NewCustomerApply,
        FollowCustomer
    },
    data () {
        return {
            showC       : false,
            showF       : false,
            loading     : false,
            finished    : false,
            target      : 0,
            rate        : 0,
            activeIndex : 0,
            page        : 1,
            ConsultType : ConsultType,
            targetList  : [],
            followList  : [],
            finishList  : [],
            tabs        : [
                { value: 0, text: '剩余跟进目标' },
                { value: 0, text: '月跟进人次' },
                { value: 0, text: '本月新客成交' }
            ],
            customerNum : {
                num   : 0,
                target: 0
            }
            
        }
    },
    computed: {
        ...mapState(['homeDate']),
        date () {
            return this.homeDate.substr(0, 7)
        },
        dateText () {
            let month = this.homeDate.substr(0, 7)
            let max = new Date(this.homeDate.substr(0, 4), this.homeDate.substr(5, 2), 0)
            return `${month}-01~${month}-${max.getDate()}`
        },
        head () {
            return [
                { center: '最后一次跟进', right: '' },
                { center: '电话', right: '跟进次数' },
                { center: '来源渠道', right: '' }
            ][this.activeIndex]
        }
    },
    watch: {
        homeDate () {
            this.getOverview()
            this.followList = []
            this.page       = 0
            this.finished   = false
        }
    },
    methods: {
        tabTo (i) {
            this.activeIndex = i
            this.loading = true
            this.page = 1
            this.finished   = false
            switch (i) {
                case 0:
                    this.targetList = []
                    this.getTargetList()
                    break;

                case 1:
                    this.getMonthFollowList()
                    break;

                case 2:
                    this.finishList = []
                    this.getMonthRecordList()
                    break;

                default:
                    break;
            }
        },
        getOverview () {
            this.$ajax({
                url : '/employee/NewCustomer/getTarget',
                data: {
                    MonthSign: this.date
                }
            }).then((data) => {
                this.tabs = [
                    { value: data.RemainFollowPlanNum, text: '剩余跟进目标' },
                    { value: data.FollowNum, text: '月跟进人次' },
                    { value: data.NewCustomerNum, text: '本月新客成交' }
                ]
                this.customerNum.num    = data.NewCustomerNum
                this.customerNum.target = data.NewCustomerTarget
            })
        },
        // 我的跟进目标
        getTargetList () {
            this.$ajax({
                url : '/employee/NewCustomer/getFollowRecordList',
                data: {
                    list_rows: 20,
                    page: this.page,
                    DaySign: this.homeDate
                }
            }).then((data) => {
                this.targetList  = this.targetList.concat(data)
                this.loading = false
                if (data.length < 20) this.finished = true
                else this.page += 1
            })
        },
        // 月跟进人次
        getMonthFollowList () {
            this.$ajax({
                url : '/employee/NewCustomer/getEmpMonthFollowCusTimesList',
                data: {
                    MonthSign: this.date
                }
            }).then((data) => {
                this.followList = data
                this.loading    = false
            })
        },
        // 月成交
        getMonthRecordList () {
            this.$ajax({
                url : '/employee/NewCustomer/getMonthRecordList',
                data: {
                    list_rows: 20,
                    page     : this.page,
                    MonthSign: this.date
                }
            }).then((_res) => {
                this.finishList = this.finishList.concat(_res.filter(_item => _item.CustomerID))
                this.loading   = false
                if (_res.length < 20) this.finished = true
                else this.page += 1
            })
        },
        // 跳转跟进记录
        toRecordList (v) {
            this.$router.push({
                path : '/Guest/FollowRecord',
                query: {
                    ID: v.CusID,
                    Type: v.CusType,
                    Date: this.date
                }
            })
        },
        // 设置添加目标
        setTarget () {
            this.$ajax({
                url : '/employee/NewCustomer/setTarget',
                data: {
                    Target: this.target
                }
            }).then(() => {
                this.$toast.success('目标设置成功')
            })
        },
        // 打电话
        toCall (v) {
            if (v.Mobile) {
                window.location.href = `tel:${v.Mobile}`
            }
        },
        toRecord (v) {
            this.$router.push({
                path : '/Home/GuestFollowRecord',
                query: {
                    ID          : v.ID,
                    CustomerID  : v.CusID,
                    CusType     : v.CusType,
                    CustomerName: v.CusName
                }
            })
        },
        addNewGuest (_c) {
            let has = this.targetList.some((_item) => _item.CusID == _c.CusID)
            if (has) {
                this.$toast('该客户已经在回访计划中')
                this.showC = true
            } else {
                this.$dialog.confirm({
                    title: '确认添加跟进客户'
                }).then(() => {
                    this.$ajax({
                        url : '/employee/NewCustomer/addFollowPlan',
                        data: {
                            CusID   : _c.CusID,
                            CusType : _c.CusType
                        }
                    }).then(() => {
                            this.$toast('添加成功')
                            this.targetList = []
                            this.getTargetList()
                            this.getOverview()
                    })
                }).catch(() => {
                    this.showC = true
                })
            }
        },
        applyNewGuest (_c) {
            this.$dialog.confirm({
                title: '确认添加新客成交'
            }).then(() => {
                this.$ajax({
                    url : '/employee/NewCustomer/setMyNewCustomer',
                    data: {
                        CustomerID: _c.CustomerID
                    }
                }).then(() => {
                    this.$toast('添加成功')
                    this.finishList = []
                    this.getMonthRecordList()
                    this.getOverview()
                })
            }).catch(() => {
                this.showF = true
            })
        },
        revoke (_v) {
            this.$dialog.confirm({
                title   : '提示',
                message : '确定撤销该新客吗？'
            }).then(() => {
                this.$ajax({
                    url : '/employee/NewCustomer/cancelNewCustomer',
                    data: {
                        CustomerID: _v.CustomerID
                    }
                }).then(() => {
                    this.$toast('撤销成功')
                    this.finishList = []
                    this.getOverview()
                    this.getMonthRecordList()
                })
            }).catch(() => {})
        }
    },
    created () {
        this.getOverview()
        // this.getTargetList()
    }
}
</script>