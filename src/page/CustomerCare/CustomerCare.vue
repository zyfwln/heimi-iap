<style lang="less" src="./CustomerCare.less" scoped></style>

<template>
    <layout-base id="CustomerCare">
        <v-header class="header" slot="header">
            <div class="title" slot="center">客户关怀</div>
            <div class="right" slot="right" @click="toAdd()">新增</div>
        </v-header>
        <div class="page">
            <div class="care-tips" v-show="list.length > 0">{{customer ? '该客户有以下特殊日期需要关怀' : '近日需要关怀的客户'}}</div>
            <v-list class="care-list" :length="list.length" :show-loading="showLoading">
                <div class="list-li border-bottom" v-for="(v, i) in list" :key="i" @click="toRegister(v)">
                    <div class="li-img">
                        <img :src="img">
                    </div>
                    <div class="li-wrap">
                        <h3>{{customer || v.Customer.Name}}</h3>
                        <div class="wrap-bd">
                            <span class="date">{{v.SDate}}</span>
                            <span class="type">{{v.CareTypeName}}</span>
                            <div class="fr btn">记录关怀</div>
                        </div>
                    </div>
                </div>
            </v-list>
        </div>
    </layout-base>
</template>

<script>
const row = 20

export default {
    data () {
        return {
            img: require('../../assets/image/headImg.png'),
            showLoading: true,
            list: [],
            page: 0,
            customer: this.$route.query.Name
        }
    },
    methods: {
        toAdd () {
            this.$router.push({
                path: '/Guest/CareAdd',
                query: {
                    ID: this.$route.query.ID,
                    Name: this.$route.query.Name
                }
            })
        },
        toRegister (_v) {
            this.$router.push({
                path: '/Guest/CareRegister',
                query: {
                    ID: _v.ID,
                    Name: this.$route.query.Name || _v.Customer.Name
                }
            })
        }
    },
    created () {
        let api = this.$route.query.ID ? '/customer/Care/getCustomerRemainCareList': '/customer/Care/getRemainCareList'
        this.$ajax({
            url: api,
            data: {
                list_rows: row,
                page: this.page += 1,
                CustomerID: this.$route.query.ID
            }
        }).then((_res) => {
            this.list = this.list.concat(_res.map(_item => {
                _item.SDate = _item.SDate.substr(0, 10)
                return _item
            }))
            this.showLoading = false
        })
    }
}
</script>