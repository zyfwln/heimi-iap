<style lang="less" src="./Loading.less" scoped></style>

<template>
    <div class="z-loading" v-show="loading">
        <div class="rotate"></div>
        <span class="text">加载中...</span>
    </div>
</template>

<script>
export default {
    name: 'v-loading',
    model: {
        prop: 'loading'
    },
    props: {
        loading: {
            type: Boolean,
            default: true
        }
    }
}
</script>