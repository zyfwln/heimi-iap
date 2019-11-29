<style lang="less" src="./HomeReturn.less" scoped></style>

<template>
    <div id="HomeReturn">
        <div class="date-range">{{dateText}}</div>
        <home-chart class="chart"
                    id="returnChart"
                    :rate="100"
                    :text="'No.' + rank"
                    :title="'当前回访排行'"
                    :color="'#fff'"
                    :sub-color="'#fff'">
        </home-chart>
        <home-tab :items="tabs" @Tab="tab"></home-tab>
        
        <div class="hd-date border-bottom">
            <div class="left">
                <span>{{date}}</span>
            </div>
            <div class="center">{{head.center}}</div>
            <div class="right">{{head.right}}</div>
        </div>
        
        <div class="wrap">
            <v-list class="list" :show-loading="showLoading" :length="returnlist.length" v-show="activeIndex == 0">
                <van-cell v-for="(v, i) in returnlist" :key="i">
                    <div slot="title" class="left">
                        <i class="iconfont icon-sex-man" v-if="v.Sex == '男'"></i>
                        <i class="iconfont icon-sex-women" v-if="v.Sex == '女'"></i>
                        <span>{{v.CustomerName}}</span>
                    </div>
                    <div class="value">
                        <i class="iconfont icon-edit" @click.stop="toRecord(v)"></i>
                        <i class="iconfont icon-set-top" @click.stop="setTop(v)" v-if="v.StickFlag == '0'"></i>
                        <i class="iconfont icon-unset-top" @click.stop="setTop(v)" v-else></i>
                    </div>
                </van-cell>
            </v-list>

            <van-list class="list" v-model="loading" :finished="finished" @load="getVisitList" v-if="activeIndex == 1">
                <van-cell class="padding-right-2" is-link :name="i" v-for="(v, i) in visitlist" :key="i" @click="toDetail(v)">
                    <div slot="title" class="left">
                        <i class="iconfont icon-sex-man" v-if="v.Sex == '男'"></i>
                        <i class="iconfont icon-sex-women" v-else></i>
                        <span class="van-ellipsis">{{v.CustomerName}}</span>
                    </div>
                    <span class="value">{{v.DealDate.substr(0, 10)}}</span>
                </van-cell>
            </van-list>
        </div>

        <div class="btn-add" v-show="activeIndex == 0" @click.stop="showC = true">添加回访客户</div>

        <return-add v-model="showC" @Select="selectCustomer"></return-add>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import HomeChart    from '../../components/HomeChart/HomeChart.vue'
import HomeTab      from '../../components/HomeTab/HomeTab.vue'
import ReturnAdd    from '../../components/ReturnAdd/ReturnAdd.vue'

export default {
    components: {
        HomeChart,
        HomeTab,
        ReturnAdd
    },
    data () {
        return {
            showC       : false,
            showLoading : true,
            loading     : false,
            finished    : false,
            rank        : 0,
            activeIndex : 0,
            page        : 0,
            row         : 20,
            returnlist  : [],
            visitlist   : [],
            tabs        : [
                { value: 0, text: '回访目标(人)' },
                { value: 0, text: '当月回访(人)' }
            ]
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
                { center: '', right: '' },
                { center: '', right: '回访时间' }
            ][this.activeIndex]
        }
    },
    watch: {
        homeDate () {
            this.getInfo()
            if (this.activeIndex == 1) {
                this.page      = 0
                this.visitlist = []
                this.finished  = false
            }
        }
    },
    methods: {
        tab (_i) {
            this.activeIndex = _i
        },
        toRecord (_v) {
            this.$router.push({
                path : '/Home/ReturnRecord',
                query: {
                    ID          : _v.ID,
                    CustomerID  : _v.CustomerID,
                    CustomerName: _v.CustomerName
                }
            });
        },
        getInfo () {
            this.$ajax({
                url : '/employee/ReturnVisit/getTarget',
                data: {
                    MonthSign: this.date
                }
            }).then((_res) => {
                if (_res) {
                    this.tabs[0].value = _res.VisitTarget
                    this.tabs[1].value = _res.ActualVisit
                    this.rank = _res.Rank || 0
                }
            })
        },
        getReturnList () {
            setTimeout(() => {
                this.$ajax({
                    url : '/employee/ReturnVisit/getList',
                    data: {
                        list_rows: this.row,
                        page     : this.page += 1
                    }
                }).then((_res) => {
                    this.returnlist  = _res
                    this.showLoading = false
                });
            }, 500);
        },
        getVisitList () {
            this.$ajax({
                url : '/employee/ReturnVisit/getMonthAlreadyVisitList',
                data: {
                    list_rows: this.row,
                    page     : 1,
                    MonthSign: this.date
                }
            }).then((_res) => {
                this.visitlist = this.visitlist.concat(_res)
                this.loading   = false
                if (this.row > _res.length) this.finished = true
            })
        },
        createReturn (_c) {
            this.$ajax({
                url : '/employee/returnVisit/create',
                data: {
                    CustomerID  : _c.ID,
                    CustomerName: _c.Name,
                    Sex         : _c.Sex
                }
            }).then(() => {
                this.$toast.success('添加成功')
                this.page = 0
                this.getInfo()
                this.getReturnList()
            })
        },
        selectCustomer (_c) {
            let has = this.returnlist.some((_item) => {
                return _c.ID && _item.CustomerID == _c.ID
            })
            if (has) {
                this.$toast('该客户已经在回访计划中')
            } else {
                this.$dialog.confirm({
                    title: '确认添加回访目标'
                }).then(() => {
                    this.createReturn(_c)
                }).catch(() => {
                })
            }
        },
        setTop (_v) {
            this.$ajax({
                url : '/employee/returnVisit/setStickFlag',
                data: {
                    ID       : _v.ID,
                    StickFlag: _v.StickFlag == '0' ? 1 : 0
                }
            }).then(() => {
                this.$toast.success(_v.StickFlag == '0' ? '置顶成功' : '取消置顶')
                this.page = 0
                this.getReturnList()
            })
        },
        toDetail (_v) {
            this.$router.push({
                path : '/Home/ReturnDetail',
                query: {
                    ID: _v.ID
                }
            })
        }
    },
    created () {
        this.getInfo()
        this.getReturnList()
    }
}
</script>