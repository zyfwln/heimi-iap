<template>
    <div id="TouchLongPress" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <slot></slot>
    </div>
</template>

<script>
let timeOutEvent = 2

export default {
    data () {
        return {
            timeOutID: null
        }
    },
    methods: {
        touchStart () {
            event.preventDefault()
            this.timeOutID = setTimeout(() => {
                this.$emit('TouchLongPressDone')
                timeOutEvent = 1
            }, 1500)
        },
        touchMove () {
            clearTimeout(this.timeOutID)
            timeOutEvent = 0
            return false;
        },
        touchEnd () {
            event.preventDefault()
            clearTimeout(this.timeOutID)
            if(timeOutEvent == 0){
                this.$emit('TouchDrag')
            } else if (timeOutEvent == 1) {
                this.$emit('TouchLongPress')
            } else {
                this.$emit('TouchClick')
            }
            this.timeOutID = null
            timeOutEvent = 2
            return false;
        }
    }
}
</script>