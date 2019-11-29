<style lang="less" src="./Footer.less" scoped></style>

<template>
    <div id="Footer" class="z-footer border-top">
        <div class="footer-nav">
            <router-link active-class="on" to="/Home">
                <div class="nav-item">
                    <div class="item-hd home"></div>
                    <div class="item-bd">工作</div>
                </div>
            </router-link>
            <router-link active-class="on" to="/Guest">
                <div class="nav-item">
                    <div class="item-hd guest"></div>
                    <div class="item-bd">客户</div>
                </div>
            </router-link>
            <a href="javascript:;" @click.stop="moreShow = true">
                <div class="more">
                    <div class="hd"></div>
                    <!-- <div class="bd">更多</div> -->
                </div>
            </a>
            <router-link active-class="on" to="/Message">
                <div class="nav-item">
                    <div class="item-hd approval"></div>
                    <div class="item-bd">消息</div>
                </div>
            </router-link>
            <router-link active-class="on" to="/My">
                <div class="nav-item">
                    <div class="item-hd my"></div>
                    <div class="item-bd">我的</div>
                </div>
            </router-link>
        </div>
        <transition name="more-trans">
            <div class="footer-more" v-show="moreShow">
                <div class="close" @click.stop="moreShow = false"></div>
                <div class="wrap">
                    <div class="ul">
                        <div class="dl" v-for="(v, i) in mores" :key="i" @click.stop="linkTo(v.link)">
                            <div class="dt">
                                <i class="iconfont" :class="v.icon"></i>
                            </div>
                            <div class="dd">{{v.name}}</div>
                        </div>
                    </div>
                    <div class="bottom">
                        <i class="iconfont icon-close-1" @click.stop="moreShow = false"></i>
                    </div>
                </div>
            </div>
        </transition>    
    </div>
</template>

<script>
export default {
    name: 'v-footer',
    data () {
        return {
            moreShow: false,
            mores: [
                { icon: 'icon-appointment', name: '客户预约', link: '/Home/ReserveAdd' },
                { icon: 'icon-summary', name: '工作小结', link: '/Home/SummaryRemind' },
                { icon: 'icon-consult', name: '咨询记录', link: '/Home/ConsultAdd' }
            ]
        }
    },
    methods: {
        linkTo (_link) {
            _link && this.$router.push({ path: _link })
        }
    }
}
</script>