<style lang="less" src="./Home.less" scoped></style>

<template>
    <layout-base id="Home" :class="homeBg">
        <home-header :index="pageIndex"></home-header>
        <v-slide class="pages" @TouchSlideLeft="slideLeft" @TouchSlideRight="slideRight">
            <transition :name="transname">
                <router-view></router-view>
            </transition>
        </v-slide>

        <v-footer slot="footer"></v-footer>
    </layout-base>
</template>

<script>
import HomeHeader from '../../components/HomeHeader/HomeHeader.vue'
import Slide      from '../../components/Slide/Slide.vue'
import Footer     from '../../components/Footer/Footer.vue'

export default {
    components: {
        'v-slide' : Slide,
        'v-footer': Footer,
        HomeHeader
    },
    data () {
        return {
            route: ['/Home/HomeReturn', '/Home/HomeGuest', '/Home/HomeDebt', '/Home', '/Home/HomeAchievement', '/Home/HomeService', '/Home/HomeReserve'],
            transname: 'router-trans-right'
        }
    },
    computed: {
        pageIndex () {
            return this.route.indexOf(this.$route.path)
        },
        homeBg () {
            return ['bg-01', 'bg-02', 'bg-00', 'bg-04', 'bg-05', 'bg-06', 'bg-03'][this.pageIndex]
        }
    },
    methods: {
        slideLeft (_dis) {
            if (_dis > 30 && this.pageIndex >= 0) {
                this.transname = 'router-trans-left'
                this.$router.replace({
                    path: this.route[this.pageIndex == 6 ? 0 : this.pageIndex + 1],
                    query: {
                        history: this.pageIndex
                    }
                });
            }
        },
        slideRight (_dis) {
            if (_dis > 30 && this.pageIndex >= 0) {
                this.transname = 'router-trans-right'
                this.$router.replace({
                    path: this.route[this.pageIndex == 0 ? 6 : this.pageIndex - 1],
                    query: {
                        history: this.pageIndex
                    }
                });
            }
        }
    }
}
</script>