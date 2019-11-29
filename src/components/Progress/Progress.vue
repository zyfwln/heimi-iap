<template>
    <div class="z-progress" :style="classsTyle">
        <div :style="barStyle">
            <span :style="progressStyle"></span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        percentage: {
            type: Number,
            default: 0
        },
        color: {
            type: String,
            default: '#000'
        },
        height: {
            type: Number,
            default: 6
        }
    },
    data () {
        return {
            long: 0
        }
    },
    computed: {
        classsTyle () {
            return `border-radius: ${this.height + 2}px`
        },
        barStyle () {
            return `height: ${this.height}px`
        },
        progressStyle () {
            return `width: ${this.percentage * this.long}px; height: ${this.height}px; background: ${this.color};`
        }
    },
    mounted () {
        this.long = this.$el.childNodes[0].clientWidth
    }
}
</script>

<style lang="less" scoped>
    .z-progress {
        padding: 1px;
        border: 1px solid #999;
        
        div {
            position: relative;
            background-color: #fff;
        }

        span {
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 8px;
        }
    }
</style>
