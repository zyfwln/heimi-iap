<style lang="less" src="./ProposalDetail.less" scoped></style>

<template>
    <layout-base id="ProposalDetail">
        <v-header class="header" slot="header">
            <div class="title" slot="center">意见与建议</div>
        </v-header>
        <div class="page">
            <van-cell title="客户" :value="Name"></van-cell>
            <div class="box">
                <div class="hd">描述</div>
                <div class="bd">
                    <p>{{Content}}</p>
                </div>
            </div>
        </div>
    </layout-base>
</template>

<script>
export default {
    data () {
        return {
            Name: this.$route.query.Name,
            Content: this.$route.query.Content
        }
    }
}
</script>