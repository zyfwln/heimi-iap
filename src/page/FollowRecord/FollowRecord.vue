<style lang="less" src="./FollowRecord.less" scoped></style>

<template>
    <layout-base id="FollowRecord">
        <v-header class="header" slot="header">
            <div class="center" slot="center">跟进记录</div>
        </v-header>

        <div class="page">
            <v-list class="list" :show-loading="loading" :length="list.length">
                <div class="li border-bottom" v-for="(v, i) in list" :key="i">
                    <div class="cell">{{v.DealDate}}</div>
                    <div class="cell">{{v.Content}}</div>
                </div>
            </v-list>
        </div>
    </layout-base>
</template>

<script>
export default {
    data () {
        return {
            loading: true,
            list: []
        }
    },
    created () {
        this.$ajax({
            url : '/employee/NewCustomer/getMyCusMonthFollowList',
            data: {
                MonthSign: this.$route.query.Date,
                CusType: this.$route.query.Type,
                CusID: this.$route.query.ID
            }
        }).then((data) => {
            this.list = data
            this.loading = false
        })
    }
}
</script>