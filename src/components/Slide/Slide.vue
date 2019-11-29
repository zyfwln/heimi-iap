<template>
    <div id="Slide"
        @touchstart="touchStart" 
        @touchmove="touchMove" 
        @touchend="touchEnd">
        <slot></slot>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['swipe'])
    },
    methods: {
        touchStart (_event) {
            // tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
            if (_event.touches.length == 1) {
                // 记录开始位置
                this.startPoint = _event.touches[0]
            }
        },
        touchMove (_event) {
            if (_event.touches.length == 1) {
                // 滑动时距离浏览器左侧的距离
                this.moveX = _event.touches[0].clientX;
                // 实时的滑动的距离-起始位置=实时移动的位置
                this.disX = this.moveX - this.startPoint.clientX;
            }
        },
        touchEnd (_event) {
            if (_event.changedTouches.length == 1 && this.swipe) {
                let endPoint = _event.changedTouches[0];
                let deg = Math.atan((endPoint.clientY - this.startPoint.clientY) / (endPoint.clientX - this.startPoint.clientX)) * 360 / (2 * Math.PI)
                this.disX = endPoint.clientX - this.startPoint.clientX;
                this.disY = endPoint.clientY - this.startPoint.clientY;

                //- 往左翻
                if (this.disX < 0 && deg > -45 && deg < 45) {
                    this.$emit('TouchSlideLeft', 0 - this.disX, _event);
                }
                //- 往右翻
                else if (this.disX > 0 && deg > -45 && deg < 45) {
                    this.$emit('TouchSlideRight', this.disX, _event);
                }
                //- 往下翻
                else if (this.disY > 0 && (deg < -45 || deg > 45)) {
                    this.$emit('TouchSlideDown', 0 - this.disX, _event);
                }
                //- 往上翻
                else if (this.disY < 0 && (deg < -45 || deg > 45)) {
                    this.$emit('TouchSlideUp', this.disX, _event);
                }
            }
        }
    }
}
</script>