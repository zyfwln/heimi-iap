<style lang="less" src="./HomeTab.less" scoped></style>

<template>
    <div id="HomeTab">
        <div class="dl"
            :class="{'on': activeIndex == i}"
            v-for="(v, i) in items"
            :key="i"
            @click="tab(i)">
            <div class="dt">{{v.value}}</div>
            <div class="dd">{{v.text}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        items: Array
    },
    data () {
        return {
            activeIndex: 0
        }
    },
    methods: {
        tab (_i) {
            this.activeIndex = _i
            this.$emit('Tab', _i)
        }
    }
}
</script>