<style lang="less" src="./Guest.less" scoped></style>

<template>
    <layout-base id="Guest">
        <v-header class="header" slot="header">
            <div class="iconfont icon-search" slot="left" @click="toSearch()"></div>
            <div class="title" slot="center">客户资料</div>
        </v-header>
        <div class="page">
            <!-- <div class="guest-header">
                <span class="text">我的专属客户</span>
                <i class="iconfont icon-right fr"></i>
                <span class="fr" @click="toCare()">近日有<i>{{careNum}}条</i>客户关怀计划</span>
            </div> -->
            <div class="guset-chart">
                <div id="chart"></div>
                <div class="chart-list">
                    <div class="cell is-link" v-for="(v, i) in level" :key="i" @click="toList(v)">
                        <div class="li left">
                            <i class="before" :style="getColor(i)"></i>
                            <span>{{v.TypeName}}级</span>
                        </div>
                        <div class="li center">{{v.rate}}%</div>
                        <div class="li right">
                            <span>{{v.total}}人</span>
                            <i class="iconfont icon-right"></i>
                        </div>
                    </div>
                </div>
            </div>

            <van-cell title="我的潜在客户" is-link @click="toPotentialCustomer()">
                <span>{{potentialNum}}人</span>
            </van-cell>
        </div>
        <v-footer slot="footer"></v-footer>
    </layout-base>
</template>

<script>
import Footer from '../../components/Footer/Footer.vue'

export default {
    components: {
        'v-footer': Footer
    },
    data () {
        return {
            careNum: 0,
            potentialNum: 0,
            total: 0,
            colors: ['#63affd', '#f6d359', '#ff7b7b', '#4dd476', '#f2769f', '#ad64ff'],
            level: []
        }
    },
    mounted () {
        this.$ajax({
            url: '/customer/Info/getMyCustomerStatistics'
        }).then((_res) => {
            this.careNum = _res.CareNum
            this.potentialNum = _res.PotentialNum
            this.total = _res.total
            this.level = _res.Level.map((_item) => {
                _item.value = _item.total
                _item.rate = Number(_res.total) > 0 ? (_item.total / _res.total * 100).toFixed(2) : 0
                return _item
            })
            this.$nextTick(() => {
                this.setChart()
            })
        })
    },
    methods: {
        setChart () {
            let chart = this.$echarts.init(document.getElementById('chart'))
            let option = {
                color: this.colors,
                title: {
                    text: this.total,
                    textStyle: {
                        color: '#444',
                        fontSize: 22,
                        fontWeight: 'normal'
                    },
                    subtext: '客户总人数',
                    subtextStyle: {
                        color: '#444',
                        fontSize: 13,
                        fontWeight: 'normal'
                    },
                    left: 'center',
                    bottom: '33%'
                },
                series: [
                    {
                        name: '总客户',
                        type: 'pie',
                        radius: ['73%', '100%'],
                        selectedOffset: 0,
                        hoverAnimation: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: this.level
                    }
                ]
            }
            chart.setOption(option)
        },
        toCare () {
            this.$router.push({
                path: '/Guest/CustomerCare'
            })
        },
        getColor (_i) {
            return `background-color: ${this.colors[_i]}`
        },
        toSearch () {
            this.$router.push({
                path: '/Guest/CustomerSearch',
                query: {
                    type: 1
                }
            })
        },
        toList (_v) {
            this.$router.push({
                path: '/Guest/CustomersForLevel',
                query: {
                    type: _v.TypeName,
                    isLast: _v.LastLevel
                }
            })
        },
        toPotentialCustomer () {
            this.$router.push({
                path: '/Guest/PotentialCustomerList'
            })
        }
    }
}
</script>