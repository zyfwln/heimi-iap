<style lang="less" src="./Header.less" scoped></style>

<template>
    <div id="Header">
        <div class="left">
            <slot name="left">
                <div class="iconfont icon-back" @click.stop="goBack()"></div>
            </slot>
        </div>
        <div class="center">
            <slot name="center"></slot>
        </div>
        <div class="right">
            <slot name="right">
                <div class="no"></div>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'v-header',
    methods: {
        goBack () {
            this.$router.go(-1);
        }
    }
}
</script>