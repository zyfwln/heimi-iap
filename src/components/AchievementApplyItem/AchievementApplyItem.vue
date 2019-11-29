<style lang="less" src="./AchievementApplyItem.less" scoped></style>

<template>
    <li>
        <div class="left">
            <div class="iconfont" :class="checked ? 'icon-checkbox-yes-2' : 'icon-checkbox-no'" @click="select()"></div>
            <div class="name">{{value.Name}}</div>
        </div>
        <div class="center">￥{{$utils.NumberFormat(value.TotalMoney)}}</div>
        <div class="right">
            <input type="number" v-model="rate">
            <i>%</i>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        value   : Object
    },
    data () {
        return {
            checked : false,
            rate    : ''
        }
    },
    computed: {
        applyData () {
            let data    = this.value
            data.Rate   = this.rate
            return data
        }
    },
    watch: {
        rate (_v) {
            if (Number(_v) > 100) this.rate = 100
            if (Number(_v) > 0 && this.checked) {
                this.$emit('Change', this.applyData)
            }
        }
    },
    methods: {
        select () {
            this.checked = !this.checked
            this.$emit('Select', this.applyData)
        }
    }
}
</script>