<style lang="less" src="./HomeHeader.less" scoped></style>

<template>
    <div id="HomeHeader" class="header">
        <div class="history" slot="left" @click="dateShow = true">
            <span class="iconfont icon-calendar"></span>
        </div>
        <div class="ul">
            <div class="li" :class="{ 'on': 3 == i }" v-for="(v, i) in navs" :key="i" @click="tab(v, i)">{{v.nav}}</div>
        </div>
        <div class="right">
        </div>

        <calendar v-model="dateShow" @PickDate="pickDate"></calendar>
    </div>
</template>

<script>
import Calendar from '../Calendar/Calendar.vue'

export default {
    components: {
        Calendar
    },
    props: {
        index: Number
    },
    data () {
        return {
            currentDate : new Date(),
            minDate     : '',
            route       : ['/Home/HomeReturn', '/Home/HomeGuest', '/Home/HomeDebt', '/Home', '/Home/HomeAchievement', '/Home/HomeService', '/Home/HomeReserve'],
            hasNews     : false,
            dateShow    : false
        }
    },
    computed: {
        navs () {
            return [
                [
                    { nav: '销售', route: '/Home/HomeAchievement' },
                    { nav: '耗卡', route: '/Home/HomeService' },
                    { nav: '预约', route: '/Home/HomeReserve' },
                    { nav: '回访', route: '/Home/HomeReturn' },
                    { nav: '新客', route: '/Home/HomeGuest' },
                    { nav: '欠款', route: '/Home/HomeDebt' },
                    { nav: '总览', route: '/Home' },
                ],
                [
                    { nav: '耗卡', route: '/Home/HomeService' },
                    { nav: '预约', route: '/Home/HomeReserve' },
                    { nav: '回访', route: '/Home/HomeReturn' },
                    { nav: '新客', route: '/Home/HomeGuest' },
                    { nav: '欠款', route: '/Home/HomeDebt' },
                    { nav: '总览', route: '/Home' },
                    { nav: '销售', route: '/Home/HomeAchievement' }
                ],
                [
                    { nav: '预约', route: '/Home/HomeReserve' },
                    { nav: '回访', route: '/Home/HomeReturn' },
                    { nav: '新客', route: '/Home/HomeGuest' },
                    { nav: '欠款', route: '/Home/HomeDebt' },
                    { nav: '总览', route: '/Home' },
                    { nav: '销售', route: '/Home/HomeAchievement' },
                    { nav: '耗卡', route: '/Home/HomeService' }
                ],
                [
                    { nav: '回访', route: '/Home/HomeReturn' },
                    { nav: '新客', route: '/Home/HomeGuest' },
                    { nav: '欠款', route: '/Home/HomeDebt' },
                    { nav: '总览', route: '/Home' },
                    { nav: '销售', route: '/Home/HomeAchievement' },
                    { nav: '耗卡', route: '/Home/HomeService' },
                    { nav: '预约', route: '/Home/HomeReserve' }
                ],
                [
                    { nav: '新客', route: '/Home/HomeGuest' },
                    { nav: '欠款', route: '/Home/HomeDebt' },
                    { nav: '总览', route: '/Home' },
                    { nav: '销售', route: '/Home/HomeAchievement' },
                    { nav: '耗卡', route: '/Home/HomeService' },
                    { nav: '预约', route: '/Home/HomeReserve' },
                    { nav: '回访', route: '/Home/HomeReturn' }
                ],
                [
                    { nav: '欠款', route: '/Home/HomeDebt' },
                    { nav: '总览', route: '/Home' },
                    { nav: '销售', route: '/Home/HomeAchievement' },
                    { nav: '耗卡', route: '/Home/HomeService' },
                    { nav: '预约', route: '/Home/HomeReserve' },
                    { nav: '回访', route: '/Home/HomeReturn' },
                    { nav: '新客', route: '/Home/HomeGuest' }
                ],
                [
                    { nav: '总览', route: '/Home' },
                    { nav: '销售', route: '/Home/HomeAchievement' },
                    { nav: '耗卡', route: '/Home/HomeService' },
                    { nav: '预约', route: '/Home/HomeReserve' },
                    { nav: '回访', route: '/Home/HomeReturn' },
                    { nav: '新客', route: '/Home/HomeGuest' },
                    { nav: '欠款', route: '/Home/HomeDebt' },
                ]
            ][this.index]
        }
    },
    methods: {
        cancel () {
            this.dateShow = false
        },
        pickDate (_date) {
            this.$store.commit('UPDATED_HOMEDATE', _date.DateFormat())
        },
        tab (_v) {
            this.$router.push({
                path: _v.route
            })
        }
    },
    created () {
        this.$store.commit('UPDATED_HOMEDATE', new Date().DateFormat())
    }
}
</script>