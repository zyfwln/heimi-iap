<style lang="less" src="./CustomerDemand.less" scoped></style>

<template>
    <layout-base id="CustomerDemand">
        <v-header class="header" slot="header">
            <div class="title" slot="center">客户需求</div>
            <div class="right" slot="right" @click="toAdd()">新增</div>
        </v-header>
        <div class="page">
            <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div class="cell is-link" v-for="(v, i) in list" :key="i" @click="linkTo(v)">
                    <div class="left">{{v.IssueDate.substr(0, 10)}}</div>
                    <div class="center van-ellipsis">{{v.Demand.join('，')}}</div>
                </div>
            </van-list>
        </div>
    </layout-base>
</template>

<script>
export default {
    data () {
        return {
            list: [],
            page: 0,
            row: 20,
            loading: false,
            finished: false
        }
    },
    methods: {
        linkTo (_v) {
            this.$router.push({
                path: '/Guest/DemandDetail',
                query: {
                    ID: _v.ID,
                    CustomerName: this.$route.query.Name || _v.Name
                }
            });
        },
        toAdd () {
            this.$router.push({
                path: '/Guest/DemandAdd',
                query: {
                    ID: this.$route.query.ID,
                    Name: this.$route.query.Name
                }
            });
        },
        onLoad () {
            let api = this.$route.query.ID ? '/feedback/demand/getListByCustomerID' : '/feedback/demand/getListByEmployeeID'
            setTimeout(() => {
                this.$ajax({
                    url: api,
                    data: {
                        CustomerID: this.$route.query.ID,
                        list_rows: this.row,
                        page: this.page += 1
                    }
                }).then((_res) => {
                    this.list = this.list.concat(_res)
                    this.loading = false
                    if (this.row > _res.length) this.finished = true
                })
            }, 500);
        }
    }
}
</script>