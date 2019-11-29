<style lang="less" src="./CustomersForLevel.less" scoped></style>

<template>
    <layout-base id="CustomersForLevel">
        <v-header class="header" slot="header">
            <div class="title" slot="center">客户分析</div>
        </v-header>
        <div class="page">
            <van-list v-model="loading" :finished="finished" @load="onLoad">
                <li v-for="(v, i) in list" :key="i" @click="toDetail(v)">
                    <div class="left">
                        <img :src="v.sex == '男' ? manImg : womenImg">
                        <dl>
                            <dt>
                                <span>{{v.Name}}</span>
                                <i>{{v.CustomerType}}级</i>
                            </dt>
                            <dd>{{v.Mobile}}</dd>
                        </dl>
                    </div>
                    <div class="right">
                        <dl>
                            <dt class="van-ellipsis">总消费：￥{{$utils.MoneyFormat(v.ConsumeTotal)}}</dt>
                            <dd>总转介人数：{{v.IntroductionNum}}人</dd>
                        </dl>
                    </div>
                </li>
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
            list: [],
            manImg: require('../../assets/image/man.png'),
            womenImg: require('../../assets/image/women.png')
        }
    },
    methods: {
        onLoad () {
            let b = this.$route.query.isLast
            setTimeout(() => {
                this.$ajax({
                    url: '/customer/info/getTypeList',
                    data: {
                        list_rows: this.row,
                        page: this.page += 1,
                        Type: this.$route.query.type,
                        LastLevel: b == true || b == 'true' ? true : false
                    }
                }).then((_res) => {
                    this.list = this.list.concat(_res)
                    this.loading = false
                    if (this.row > _res.length) {
                        this.finished = true
                    }
                })
            }, 500);
        },
        toDetail (_v) {
            this.$router.push({
                path: '/Guest/Customer',
                query: {
                    ID: _v.CustomerID
                }
            })
        }
    }
}
</script>