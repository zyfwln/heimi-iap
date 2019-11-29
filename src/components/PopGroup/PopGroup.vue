<style lang="less" src="./PopGroup.less" scoped></style>

<template>
    <div class="z-pop-group">
        <div class="pop-overlay" v-show="overlay" @click="closePop()"></div>
        <div class="pop-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    model: {
        prop: 'show',
        event: 'ClosePop'
    },
    props: {
        show: Boolean,
        overlay: {
            type: Boolean,
            default: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        closePop () {
            if (this.closeOnClickOverlay) {
                this.$emit('ClosePop', false);
            }
        }
    }
}
</script>