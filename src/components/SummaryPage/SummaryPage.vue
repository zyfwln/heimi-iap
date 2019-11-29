<style lang="less" src="./SummaryPage.less" scoped></style>

<template>
    <transition name="ctn-tran">
        <div class="page">
            <div class="overview">
                <div class="ctn">
                    <div class="text" v-html="text"></div>
                    <div class="rate" v-show="index < 5">({{index + 1}}/5)</div>
                    <summary-overview v-show="index == 5"></summary-overview>
                </div>
            </div>
            <div class="wrap" v-show="index < 5">
                <div class="tips border-bottom">
                    <slot name="tips">
                        <span>今日服务及回访的客户</span>
                    </slot>
                </div>
                <div class="cells">
                    <slot name="list"></slot>
                </div>
                <div class="bottom">
                    <!-- <div class="b-tips">
                        <div class="iconfont icon-radio-no" :class="{ 'icon-radio-yes': notHandle }" @click="notHandle = !notHandle"></div>
                        <div class="text">暂时不处理（客户不方便明日进行处理）</div>
                    </div> -->
                    <div class="btns">
                        <div class="btn" @click="record()">开始记录</div>
                        <div class="btn" @click.stop="next()">下一项工作</div>
                    </div>
                </div>
            </div>

            <div class="all" v-show="index == 5">
                <div class="btns">
                    <div class="btn off" @click.stop="back()">我要补充</div>
                    <div class="btn" @click.stop="next()">下一步</div>
                </div>
            </div>

            <div class="summary" v-show="index == 6">
                <div class="box">
                    <div class="hd">每日小结</div>
                    <div class="bd">
                        <textarea v-model="dailySummary" placeholder="请输入服务心得、工作感想、工作情况等"></textarea>
                    </div>
                </div>
                <div class="button" @click="finish()">工作完成</div>
            </div>
            <summary-register :visibile="visibile" :info="info" :index="index" @Submit="submit" @RegisterHidden="registerHidden"></summary-register>
        </div>
    </transition>
</template>

<script>
import SummaryRegister from '../../page/SummaryRegister/SummaryRegister.vue'
import SummaryOverview from '../../components/SummaryOverview/SummaryOverview.vue'
import { mapState } from 'vuex'

export default {
    components: {
        SummaryRegister,
        SummaryOverview
    },
    props: {
        text: String,
        index: {
            type: Number,
            default: 0
        },
        info: Object
    },
    data () {
        return {
            visibile: false,
            dailySummary: ''
        }
    },
    computed: {
        ...mapState(['summaryOverview'])
    },
    methods: {
        registerHidden () {
            this.visibile = false
        },
        record () {
            if (!this.info.ID) {
                this.$toast('请先选择服务的客户')
                return;
            }
            else {
                this.visibile = true
            }
        },
        next () {
            this.$emit('SummaryNext', this.index)
        },
        back () {
            this.$emit('SummaryNext', -1)
        },
        submit () {
            this.summaryOverview[this.index - 1] += 1
            this.$store.commit('UPDATED_SUMMARY_OVERVIEW', this.summaryOverview)
            this.$emit('Submit')
        },
        finish () {
            this.$ajax({
                url: '/feedback/DailySummary/finished',
                data: {
                    DailySummary: this.dailySummary
                }
            }).then(() => {
                this.$router.go(-1)
            })
        }
    }
}
</script>