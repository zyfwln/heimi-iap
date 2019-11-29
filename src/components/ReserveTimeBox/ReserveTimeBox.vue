<style lang="less" src="./ReserveTimeBox.less" scoped></style>

<template>
    <transition name="pop-right">
        <layout-base id="ReserveTimeBox" v-if="visibile">
            <v-header class="header" slot="header">
                <div class="iconfont icon-back" slot="left" @click="cancel()"></div>
                <div class="title" slot="center">预约时间</div>
            </v-header>
            <div class="page">
                <div class="time-grids">
                    <div class="grids-hd">
                        <div class="grid grid-gh"
                                :class="{ 'on': i == activeDate }"
                                v-for="(v, i) in dates"
                                :key="i"
                                @click.stop="tabDate(v, i)">{{v.text}}</div>
                    </div>
                    <div class="grids-bd">
                        <div class="grid grid-gd"
                                :class="{ 'off': checkOff(v), 'reserved': checkReserved(v), 'on': i == activeTime }"
                                v-for="(v, i) in times"
                                :key="i"
                                @click.stop="tabTime(v, i)">{{v}}</div>
                    </div>
                </div>
            </div>

            <div class="button" @click="confirm()">确定预约时间</div>
        </layout-base>
    </transition>
</template>

<script>
import { Times } from '../../assets/js/const.js'

const testNum = (num) => {
    return num < 10 ? '0' + num : num
}

export default {
    model: {
        prop    : 'visibile',
        event   : 'Hidden'
    },
    props: {
        visibile: Boolean,
        employee: String
    },
    data () {
        return {
            activeDate  : 0,
            activeTime  : undefined,
            reserveDate : new Date().DateFormat(),
            reserveList : [],
            workEmployee: [],
            reserveTime : ''
        }
    },
    computed: {
        times () {
            return Times[0]
        },
        dates () {
            let dates = []
            for (let i = 0; i < 6; i++) {
                let date = new Date()
                date.setDate(date.getDate() + i)
                date = date.DateFormat()
                dates.push({
                    text : i < 3 ? ['今天', '明天', '后天'][i]
                                : date.substr(5, 5).replace(/-/g, '.'),
                    value: date
                })
            }
            return dates
        }
    },
    methods: {
        cancel () {
            this.$emit('Hidden', false)
        },
        checkOff (_v) {
            let now = new Date()
            // 没排班
            let isNotWork = !this.workEmployee.some((_item) => _item.ID == this.employee)
            // 小于当前时间点
            let lessNowTime = this.activeDate == 0 && _v < `${testNum(now.getHours())}:${testNum(now.getMinutes())}`
            return isNotWork || lessNowTime
        },
        checkReserved (_v) {
            let b = false
            this.reserveList.map((_item) => {
                if (_item.AppointDate.indexOf(_v) > -1) {
                    b = true
                }
            })
            return b
        },
        getWorkEmployee () {
            this.$ajax({
                url: '/employee/Info/getShopWorkEmployee',
                data: {
                    Date: this.reserveDate
                }
            }).then((_res) => {
                this.workEmployee = _res.employeeList
            })
        },
        getReserveList () {
            this.$ajax({
                url : '/employee/appoint/shopAppoint',
                data: {
                    EmployeeID: this.employee,
                    Start     : this.reserveDate,
                    End       : this.reserveDate
                }
            }).then((_res) => {
                this.reserveList = _res.list.filter(_item => _item.ID && _item.customer.ID)
            })
        },
        tabDate (_v, _i) {
            this.activeDate  = _i
            this.activeTime  = undefined
            this.reserveDate = _v.value
        },
        tabTime (_v, _i) {
            if (this.checkReserved(_v) || this.checkOff(_v)) {
                return;
            } else {
                this.activeTime  = _i
                this.reserveTime = _v
            }
        },
        confirm () {
            if (this.activeTime >= 0) {
                this.$emit('Select', `${this.reserveDate} ${this.reserveTime}`)
                this.cancel()
            } else {
                this.$toast('请选择预约的时间点')
            }
        }
    },
    watch: {
        reserveDate () {
            this.getReserveList()
            this.getWorkEmployee()
        }
    },
    created () {
        this.getReserveList()
        this.getWorkEmployee()
    }
}
</script>
