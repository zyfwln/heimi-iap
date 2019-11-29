<style lang="less" src="./CustomerSearch.less" scoped></style>

<template>
    <layout-base id="CustomerSearch">
        <v-header class="header" slot="header">
            <div class="title" slot="center">客户搜索</div>
            <div class="add" @click="toAdd()" slot="right">新增</div>
        </v-header>
        <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            show-action
            @search="onSearch">
            <div slot="action" @click="onSearch">搜索</div>
        </van-search>

        <div class="ul" v-if="type">
            <div class="li is-link border-bottom" v-for="(v, i) in list" :key="i" @click="select(v)">
                <div class="left">
                    <i class="iconfont icon-sex-man" v-if="v.Sex == '男'"></i>
                    <i class="iconfont icon-sex-women" v-else></i>
                    <span class="van-ellipsis">{{v.Name}}</span>
                </div>
                <div>{{v.Mobile}}</div>
                <div>
                    <i class="iconfont icon-right fr"></i>
                    <span class="fr" v-if="v.LevelInfo && v.LevelInfo.CustomerType">{{`${v.LevelInfo.CustomerType}级`}}</span>
                </div>
            </div>
        </div>

        <div class="ul" v-else>
            <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div class="li is-link border-bottom" v-for="(v, i) in list" :key="i" @click="select(v)">
                    <div class="left">
                        <i class="iconfont icon-sex-man" v-if="v.Sex == '男'"></i>
                        <i class="iconfont icon-sex-women" v-else></i>
                        <span class="van-ellipsis">{{v.Name}}</span>
                    </div>
                    <div>{{v.Mobile}}</div>
                    <div>
                        <i class="iconfont icon-right fr"></i>
                    </div>
                </div>
            </van-list>
        </div>
    </layout-base>
</template>

<script>
export default {
    data () {
        return {
            value: '',
            list: [],
            page: 0,
            loading: false,
            finished: false,
            type: this.$route.query.type
        }
    },
    computed: {
        api () {
            return ['/customer/potential/getList', '/customer/info/searchCustomer'][this.type]
        }
    },
    methods: {
        toAdd () {
            this.$router.push({
                path: '/Home/CustomerAdd',
                query: {
                    type: this.type
                }
            })
        },
        onLoad () {
            setTimeout(() => {
                this.$ajax({
                    url: this.api,
                    data: {
                        text: this.value,
                        list_rows: 20,
                        page: this.page += 1
                    }
                }).then((_res) => {
                    this.list = this.list.concat(_res.filter(_item => _item.ID))
                    this.loading = false
                    if (_res && _res.length <= 20) {
                        this.finished = true
                    }
                })
            }, 500);
        },
        onSearch () {
            switch (this.type) {
                case 0:
                    this.list = []
                    this.page = 0
                    this.loading = false
                    this.finished = false
                    this.onLoad()
                    break;

                default:
                    if (this.value) {
                        this.$ajax({
                            url: this.api,
                            data: {
                                text: this.value
                            }
                        }).then((_res) => {
                            this.list = _res.customer.filter(_item => _item.ID)
                        })
                    } else {
                        this.$dialog.alert({
                            message: '请输入完整的顾客姓名或电话'
                        })
                    }
                    break;
            }
        },
        select (_v) {
            this.$router.push({
                path: '/Guest/Customer',
                query: {
                    ID: _v.ID
                }
            })
        }
    }
}
</script>