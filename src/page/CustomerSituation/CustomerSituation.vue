<style lang="less" src="./CustomerSituation.less" scoped></style>

<template>
    <layout-base id="CustomerSituation">
        <v-header class="header" slot="header">
            <div class="title" slot="center">客情</div>
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
        toAdd () {
            this.$router.push({
                path: '/Guest/SituationAdd',
                query: {
                    ID: this.$route.query.ID,
                    Name: this.$route.query.Name
                }
            })
        },
        toDetail (_v) {
            this.$router.push({
                path: '/Guest/SituationDetail',
                query: {
                    Name: this.$route.query.Name,
                    Content: _v.Content
                }
            })
        },
        onLoad () {
            setTimeout(() => {
                this.$ajax({
                    url: '/feedback/Situation/getListByCustomerID',
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
        }
    }
}
</script>