<style lang="less" src="./Calendar.less" scoped></style>

<template>
    <transition name="transition-drop">
        <div class="z-calendar" v-show="visibile">
            <div class="close" @click="cancel()"></div>
            <div class="calendar">
                <div class="c-panel">
                    <div class="p-head">
                        <div class="prev" @click.stop="nextMonth(-1)"></div>
                        <div class="text">{{year}}年{{month + 1}}月</div>
                        <div class="next" @click.stop="nextMonth(1)"></div>
                    </div>
                    <div class="p-week">
                        <div class="week" v-for="(v, i) in weeks" :key="i">{{v}}</div>
                    </div>
                    <div class="p-date">
                        <div class="date gray" v-for="(v, k) in empty.prev" :key="k">{{prevDates + k + 1}}</div>
                        <div class="date"
                                v-for="(v, i) in dates"
                                :class="{'on': activeIndex == i}"
                                :key="i + empty.prev.length"
                                @click.stop="selectDate(v, i)">
                            <span>{{i + 1}}</span>
                        </div>
                        <div class="date gray" v-for="(v, k) in empty.next" :key="k + empty.prev.length + dates.length">{{k + 1}}</div>
                    </div>
                    <div class="btns">
                        <div class="btn confirm fl" @click.stop="confirm()">确定</div>
                        <div class="btn cancel fl" @click.stop="cancel()">取消</div>
                        <div class="btn today fr" @click.stop="toToday()">今天</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
const Count  = 42
const Months = 12

const CountDays = (y, m) => {
    m += 1
    if (m == 2) {
        return y % 4 == 0 ? 29 : 28
    } else if (!([4, 6, 9, 11].indexOf(m) < 0)) {
        return 30
    } else {
        return 31
    }
}

export default {
    name : 'v-calendar',
    model: {
        prop : 'visibile',
        event: 'Calendar.Visibile'
    },
    props: {
        visibile: {
            type: Boolean,
            default: false
        },
        defaultDate: {
            type: Date,
            default: () => new Date()
        }
    },
    data () {
        return {
            weeks       : ['日', '一', '二', '三', '四', '五', '六'],
            now         : this.defaultDate.getTime(),
            activeIndex : this.defaultDate.getDate() - 1
        }
    },
    computed: {
        year () {
            let date = new Date(this.now)
            return date.getFullYear()
        },
        month () {
            let date = new Date(this.now)
            return date.getMonth()
        },
        date () {
            let date = new Date(this.now)
            return date.getDate()
        },
        dates () {
            return new Array(CountDays(this.year, this.month))
        },
        empty () {
            let date = new Date(this.now)
            let f = date
            f.setDate(1)
            let d = f.getDay()
            let obj = {
                prev: [],
                next: []
            };
            if (d == 0) {
                obj.next = new Array(Count - CountDays(this.year, this.month))
            } else {
                obj.prev = new Array(d)
                obj.next = new Array(Count - CountDays(this.year, this.month) - d)
            }
            return obj
        },
        prevDates () {
            return CountDays(this.year, this.month - 1) - this.empty.prev.length
        }
    },
    methods: {
        nextMonth (_n) {
            let date = new Date(this.now)
            let m = this.month + _n
            if (m > Months - 1) {
                date.setFullYear(this.year + 1)
                date.setMonth(0)
            } else if (m < 0) {
                date.setFullYear(this.year - 1)
                date.setMonth(11)
            } else {
                date.setMonth(m)
            }
            this.now = date.getTime()
        },
        selectDate (_v, _i) {
            this.activeIndex = _i
            let date = new Date(this.now)
            date.setDate(_i + 1)
            this.now = +new Date(date)
        },
        cancel () {
            this.$emit('Calendar.Visibile', false)
        },
        confirm () {
            let date = new Date(this.now)
            this.$emit('PickDate', date)
            this.cancel()
        },
        toToday () {
            let d    = new Date().getDate()
            this.now = +new Date()
            this.activeIndex = d - 1
        }
    }
}
</script>