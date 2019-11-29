<style lang="less" src="./List.less" scoped></style>

<template>
    <div class="z-list">
        <v-loading v-model="showLoading"></v-loading>
        <slot></slot>
        <div class="baseline" v-show="showEnding && !showLoading && length > 0">
            <div class="line"></div>
            <div class="text">我是有底线的</div>
            <div class="line"></div>
        </div>
        <div class="no-data" v-show="length <= 0 && !showLoading">
            <div class="iconfont icon-no-data"></div>
            <div>暂无数据</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'v-list',
    props: {
        showLoading: {
            type: Boolean,
            default: true
        },
        showEnding: {
            type: Boolean,
            default: true
        },
        length: {
            type: Number,
            default: 0
        }
    }
}
</script>