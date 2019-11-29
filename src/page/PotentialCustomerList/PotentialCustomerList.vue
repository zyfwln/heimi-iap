<style lang="less" src="./PotentialCustomerList.less" scoped></style>

<template>
    <layout-base id="PotentialCustomerList">
        <v-header class="header" slot="header">
            <div class="title" slot="center">我的潜在客户</div>
        </v-header>
        <div class="page">
            <div class="head border-bottom">
                <div class="left">姓名</div>
                <div class="center">电话</div>
                <div class="right">最后一次跟进</div>
            </div>
            <van-list class="list border-top" v-model="loading" :finished="finished" @load="onLoad">
                <div class="li is-link" v-for="(v, i) in list" :key="i" @click="toDetail(v)">
                    <div class="left">
                        <i class="iconfont icon-sex-man" v-if="v.Sex == '男'"></i>
                        <i class="iconfont icon-sex-women" v-else></i>
                        <span>{{v.CusName}}</span>
                    </div>
                    <div class="center">{{v.Mobile || '-'}}</div>
                    <div class="right">{{v.LastFollowDate && v.LastFollowDate.substr(0, 10)}}</div>
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
            page: 0,
            row: 20,
            list: []
        }
    },
    methods: {
        onLoad() {
            setTimeout(() => {
                this.$ajax({
                    url: '/employee/NewCustomer/getMyFollowList',
                    data: {
                        page: this.page += 1,
                        list_rows: this.row
                    }
                }).then((_res) => {
                    this.list = this.list.concat(_res)
                    this.loading = false
                    if (this.row > _res.length) this.finished = true
                })
            }, 500);
        },
        toDetail (_v) {
            this.$router.push({
                path: '/Guest/PotentialCustomer',
                query: {
                    ID: _v.CusID,
                    CusType: _v.CusType
                }
            })
        }
    }
}
</script>