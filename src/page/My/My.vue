<style lang="less" src="./My.less" scoped></style>

<template>
    <layout-base id="My">
        <v-header class="header" slot="header">
            <div class="iconfont icon-out" slot="left" @click="loginOut()"></div>
            <div class="title" slot="center">个人中心</div>
        </v-header>
        <div class="page">
            <div class="my-header">
                <div class="header-wrap">
                    <img class="wrap-img" :src="img">
                    <div class="wrap-msg">
                        <div class="msg-t">
                            <div class="name">{{user.Name}}</div>
                            <div class="link" @click="toPassword()">修改密码</div>
                        </div>
                        <div class="job">{{user.shop && user.shop.Shop}}-{{user.OrganizeName}}</div>
                        <div class="msg-s">
                            <van-rate v-model="start" :size="8" disabled disabled-color="#fbc914" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-panel" v-show="false">
                <div class="panel-chart">
                    <div id="chart"></div>
                </div>
                <div class="panel-items">
                    <div class="items">
                        <div class="item color-4276ff">
                            <span>基础薪资</span>
                            <span class="num">￥0.00</span>
                        </div>
                    </div>
                    <div class="items">
                        <div class="item color-ffd042">
                            <span>业绩提成</span>
                            <span class="num">￥0.00</span>
                        </div>
                        <div class="item color-26bc49">
                            <span>手工费</span>
                            <span class="num">￥0.00</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div class="my-block">
                <dl v-show="show">
                    <dt class="color-ff5c5c">{{`￥${$utils.NumberFormat(vault)}`}}</dt>
                    <dd>我的小金库</dd>
                </dl>
                <dl>
                    <dt class="color-ff5c5c">￥{{$utils.NumberFormat(salary)}}</dt>
                    <dd>我的薪资</dd>
                </dl>
                <dl>
                    <dt>0</dt>
                    <dd>交易记录</dd>
                </dl>
            </div> -->

            <div class="my-ul">
                <div class="li" v-show="show">
                    <van-cell is-link>
                        <div class="li-left" slot="title">
                            <span>我的小金库</span>
                        </div>
                        <div class="li-right">
                            <span class="color-ff5c5c">{{`￥${$utils.NumberFormat(vault)}`}}</span>
                        </div>
                    </van-cell>
                </div>
                <div class="li" @click="linkTo('/MySalary')">
                    <van-cell is-link>
                        <div class="li-left" slot="title">
                            <span>我的薪资</span>
                        </div>
                        <div class="li-right">
                            <span class="color-ff5c5c">￥{{$utils.NumberFormat(salary)}}</span>
                        </div>
                    </van-cell>
                </div>
                <div class="li">
                    <van-cell is-link>
                        <div class="li-left" slot="title">
                            <span>本月业绩</span>
                            <span class="color-ff5c5c">￥0.00</span>
                        </div>
                        <div class="li-right">
                            <span>当前排名</span>
                            <span><sub>No.</sub>0</span>
                        </div>
                    </van-cell>
                </div>
                <!-- <div class="li" v-for="(v, i) in list" :key="i" @click="linkTo(v.link)">
                    <van-cell is-link>
                        <div class="li-left" slot="title"><span>{{v.name}}</span></div>
                        <div class="li-right"><span></span></div>
                    </van-cell>
                </div> -->
            </div>
        </div>
        <v-footer slot="footer"></v-footer>
    </layout-base>
</template>

<script>
import Footer from '../../components/Footer/Footer.vue'
import { mapState } from 'vuex'

export default {
    components: {
        'v-footer': Footer
    },
    data () {
        return {
            img    : require('../../assets/image/staff_hg.png'),
            show   : false,
            start  : 5,
            vault  : 0,
            salary : 0,
            list   : [
                { name: '客户新需求', value: '0条', link: '/Guest/CustomerDemand' }
            ]
        }
    },
    computed: {
        ...mapState(['user'])
    },
    // mounted () {
    //     this.$nextTick(() => {
    //         let chart = this.$echarts.init(document.getElementById('chart'))
    //         let option = {
    //             color: ['#4276ff', '#ffd042', '#26bc49'],
    //             title: {
    //                 text: '本月薪资',
    //                 textStyle: {
    //                     fontSize: 13,
    //                     fontWeight: 'normal'
    //                 },
    //                 subtext: '￥0.00',
    //                 subtextStyle: {
    //                     color: '#ff5c5c',
    //                     fontSize: 14,
    //                     fontWeight: 'normal'
    //                 },
    //                 left: 'center',
    //                 bottom: '33%'
    //             },
    //             series: [
    //                 {
    //                     name:'访问来源',
    //                     type:'pie',
    //                     startAngle: -135,
    //                     radius: ['79%', '100%'],
    //                     selectedOffset: 0,
    //                     hoverAnimation: false,
    //                     label: {
    //                         normal: {
    //                             show: false,
    //                             position: 'center'
    //                         }
    //                     },
    //                     labelLine: {
    //                         normal: {
    //                             show: false
    //                         }
    //                     },
    //                     data:[
    //                         {value: 0, name: '基础薪资'},
    //                         {value: 0, name: '业绩提成'},
    //                         {value: 0, name: '手工费'}
    //                     ]
    //                 }
    //             ]
    //         }
    //         chart.setOption(option)
    //     })
    // },
    methods: {
        toPassword () {
            this.$router.push({
                path: '/My/UserPassword'
            })
        },
        linkTo (_link) {
            _link && this.$router.push({
                path: _link
            });
        },
        loginOut () {
            this.$dialog.confirm({
                title: '确认退出登录'
            }).then(() => {
                this.$store.commit('CLEAR_TOKEN')
                this.$router.replace({
                    path: '/Login'
                })
            }).catch(() => {})
        }
    },
    created () {
        this.$ajax({
            url: '/employee/info/getBaseAccount'
        }).then((_res) => {
            this.show   = _res.SmallTreasury.Show
            this.vault  = _res.SmallTreasury.Total
            this.salary = _res.MonthSalary
        })
    }
}
</script>