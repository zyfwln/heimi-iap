<style lang="less" src="./RadioGroup.less" scoped></style>

<template>
    <div class="z-radio-group">
        <div class="radio-box"
            v-for="(v, i) in items"
            :key="i"
            :class="{ 'on': i == active }"
            @click.stop="radioSelect(i)">
            <div class="iconfont icon-radio-yes" :style="rStyle" v-if="active == i"></div>
            <div class="iconfont icon-radio-no" v-else></div>
            <div class="name">{{valueKey ? v[valueKey] : v}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            default: () => []
        },
        activeIndex: Number,
        valueKey: {
            type: String,
            default: null
        },
        rStyle: String
    },
    data () {
        return {
            active: this.activeIndex
        }
    },
    methods: {
        radioSelect (_i) {
            this.active = _i
            this.$emit('RadioSelect', this.active)
        }
    }
}
</script>