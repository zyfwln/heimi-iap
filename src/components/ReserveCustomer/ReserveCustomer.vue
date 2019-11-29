<style lang="less" src="./ReserveCustomer.less" scoped></style>

<template>
    <transition name="pop-right">
        <layout-base class="customer-list" v-if="visibile">
            <div class="header" :style="bgColor" slot="header">
                <div class="cancel" @click="closePage()">取消</div>
                <div class="title">客户搜索</div>
                <div class="add" @click="toAdd()">新建</div>
            </div>
            <van-search
                v-model="value"
                placeholder="请输入姓名或手机号，新客请新增"
                show-action
                @search="onSearch">
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>

            <div class="ul">
                <v-list :show-loading="loading" :length="list.length">
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
                </v-list>
            </div>
        </layout-base>
    </transition>
</template>

<script>
export default {
    model: {
        prop    : 'visibile',
        event   : 'Hidden'
    },
    props: {
        visibile    : Boolean,
        bgColor     : {
            type    : String,
            default : 'background-color: #4d95ff'
        }
    },
    data () {
        return {
            loading     : false,
            value       : '',
            history     : [],
            list        : []
        }
    },
    methods: {
        closePage () {
            this.$emit('Hidden', false)
        },
        toAdd () {
            this.$emit('AddCustomer')
            this.closePage()
        },
        load () {
            this.$ajax({
                url : '/customer/info/searchCustomer',
                data: {
                    text: this.value
                }
            }).then((_res) => {
                this.list    = _res.customer.filter(_item => _item.ID)
                this.loading = false
            })
        },
        onSearch () {
            this.list    = []
            this.loading = true

            if (this.value) {
                this.load()
            } else {
                this.$dialog.alert({
                    message: '请输入完整的顾客姓名或电话'
                })
            }
        },
        select (_v) {
            this.closePage()
            this.$emit('Select', _v)
        }
    }
}
</script>