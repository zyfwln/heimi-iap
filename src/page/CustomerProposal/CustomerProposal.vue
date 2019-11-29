<style lang="less" src="./CustomerProposal.less" scoped></style>

<template>
    <layout-base id="CustomerProposal">
        <v-header class="header" slot="header">
            <div class="title" slot="center">客户建议</div>
            <div class="right" slot="right" @click="toAdd()">新增</div>
        </v-header>
        <div class="page">
            <van-list class="cells" v-model="loading" :finished="finished" @load="onLoad">
                <div class="cell is-link" v-for="(v, i) in list" :key="i" @click="toDetail(v)">
                    <div class="date">{{v.IssueDate.substr(0, 10)}}</div>
                    <div class="van-ellipsis content">{{v.Content}}</div>
                </div>
            </van-list>
        </div>
    </layout-base>
</template>

<script>
export default {
    data () {
        return {
            loading: false,
            finished: false,
            row: 20,
            page: 0,
            list: []
        }
    },
    methods: {
        onLoad () {
            setTimeout(() => {
                this.$ajax({
                    url: '/feedback/Opinion/getListByCustomerID',
                    data: {
                        page: this.page += 1,
                        list_rows: this.row,
                        CustomerID: this.$route.query.ID
                    }
                }).then(_res => {
                    this.list = this.list.concat(_res)
                    this.loading = false
                    if (this.row > _res.length) this.finished = true
                })
            }, 500);
        },
        toAdd () {
            this.$router.push({
                path: '/Guest/ProposalAdd',
                query: {
                    ID: this.$route.query.ID,
                    Name: this.$route.query.Name
                }
            })
        },
        toDetail (_v) {
            this.$router.push({
                path: '/Guest/ProposalDetail',
                query: {
                    Name: this.$route.query.Name,
                    Content: _v.Content
                }
            })
        }
    }
}
</script>