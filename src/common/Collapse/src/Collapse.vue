<style lang="less" src="./Collapse.less" scoped></style>

<template>
    <div class="z-collapse-item collapse_expanded">
        <div class="z-c-title">
            <slot name="title">
                <div class="title">标题</div>
            </slot>
            <div class="iconfont icon-right"></div>
        </div>
        <div class="z-c-panel">
            <slot>
                <div class="panel-content">内容</div>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'v-collapse',
    props: {
        right: {
            type: Boolean,
            default: true
        }
    },
    created () {
        // console.log(this.$parent.$options.name)
    }
}
</script>