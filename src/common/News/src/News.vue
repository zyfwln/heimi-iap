<style lang="less" src="./News.less" scoped></style>

<template>
    <div class="iconfont icon-news" :class="{ 'news': hasNews }" @click="goMessage()"></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'v-news',
    data () {
        return {
            hasNews: false
        }
    },
    computed: {
        ...mapState(['interval'])
    },
    methods: {
        getNews () {
            this.$ajax({
                url: '/employee/Notice/getRemainTotal'
            }).then((_res) => {
                this.hasNews = Number(_res.RemainTotal) > 0
            })
        },
        goMessage () {
            this.$router.push({
                path: '/Message'
            })
        }
    },
    mounted () {
        this.getNews()

        this.$nextTick(() => {
            if (this.interval) {
                clearInterval(this.interval)
                this.$store.commit('UPDATED_INTERVAL', null)
            }
            let interval = setInterval(() => {
                this.getNews()
            }, 1 * 60 * 1000)
            this.$store.commit('UPDATED_INTERVAL', interval)
        })
    },
    beforeDestroy () {
        clearInterval(this.interval)
    }
}
</script>