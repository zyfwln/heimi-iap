<style lang="less" src="./SituationAdd.less" scoped></style>

<template>
    <layout-base id="SituationAdd">
        <v-header class="header" slot="header">
            <div class="title" slot="center">客情新增</div>
        </v-header>
        <div class="page">
            <van-cell title="客户" :value="Name"></van-cell>
            <v-form-textarea v-model="content" title="描述" placeholder="请输入描述内容"></v-form-textarea>
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
                this.$toast(`请输入客情描述`)
                return;
            }
            this.$dialog.confirm({
                title: '确认添加客情吗？'
            }).then(() => {
                this.$ajax({
                    url: '/feedback/Situation/create',
                    data: {
                        CustomerID: this.$route.query.ID,
                        Content: this.content
                    }
                }).then(() => {
                    this.$dialog.confirm({
                        title: '提示',
                        message: '已成功添加一条客情，是否继续添加客情？'
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