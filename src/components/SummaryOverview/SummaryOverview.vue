<style lang="less" src="./SummaryOverview.less" scoped></style>

<template>
    <div class="ul">
        <div class="li">
            <span>疗效记录</span>
            <span>{{summaryOverview[0]}}条</span>
        </div>
        <div class="li">
            <span>客户需求</span>
            <span>{{summaryOverview[1]}}条</span>
        </div>
        <div class="li">
            <span>客情登记</span>
            <span>{{summaryOverview[2]}}条</span>
        </div>
        <div class="li">
            <span>客户投诉</span>
            <span>{{summaryOverview[3]}}条</span>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['summaryOverview'])
    }
}
</script>