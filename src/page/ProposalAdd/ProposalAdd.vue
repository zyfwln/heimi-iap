<style lang="less" src="./ProposalAdd.less" scoped></style>

<template>
    <layout-base id="ProposalAdd">
        <v-header class="header" slot="header">
            <div class="title" slot="center">新增建议与意见</div>
        </v-header>
        <div class="page">
            <van-cell title="客户" :value="Name"></van-cell>
            <v-form-textarea v-model="content" title="描述" placeholder="请输入意见内容"></v-form-textarea>
            <div class="button" @click.stop="submit()">确认提交</div>
        </div>
    </layout-base>
</template>

<script>
export default {
    data () {
        return {
            Name: this.$route.query.Name,
            content: ''
        }
    },
    methods: {
        submit () {
            if (!this.content) {
                this.$toast(`请输入意见描述`)
                return;
            }
            this.$dialog.confirm({
                title: '确认添加客情吗？'
            }).then(() => {
                this.$ajax({
                    url: '/feedback/Opinion/create',
                    data: {
                        CustomerID: this.$route.query.ID,
                        Content: this.content
                    }
                }).then(() => {
                    this.$dialog.confirm({
                        title: '提示',
                        message: '已成功新增一条客户意见，是否继续新增？'
                    }).then(() => {
                        this.content = ''
                    }).catch(() => {
                        this.$router.go(-1)
                    })
                })
            }).catch(() => {})
        }
    }
}
</script>