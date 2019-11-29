<style lang="less" src="./CustomerSearch.less" scoped></style>

<template>
    <transition name="pop-right">
        <layout-base id="CustomerSearch" v-if="visibile">
            <div class="header" :style="bgColor" slot="header">
                <div class="cancel" @click="back()">取消</div>
                <div class="title">客户搜索</div>
                <div class="add" @click="toAdd()">新建</div>
            </div>
            <van-search
                v-show="exclusive"
                v-model="value"
                placeholder="请输入姓名或手机号"
                show-action
                @search="onSearch">
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>

            <div class="ul" v-if="exclusive">
                <div class="li is-link border-bottom" v-for="(v, i) in list" :key="i + 5" @click="select(v)">
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
                <van-list v-model="loading" :finished="finished" finished-text="我是有底线的" @load="onLoad" v-if="!exclusive">
                    <div class="li is-link border-bottom" v-for="(v, i) in list" :key="i" @click="select(v)">
                        <div class="left van-ellipsis">
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
    </transition>
</template>

<script>
export default {
    model: {
        prop : 'visibile',
        event: 'Hidden'
    },
    props: {
        visibile   : Boolean,
        exclusive  : {
            type   : Boolean,
            default: true
        },
        bgColor    : {
            type   : String,
            default: 'background-color: #4d95ff'
        }
    },
    data () {
        return {
            value   : '',
            list    : [],
            page    : 0,
            loading : false,
            finished: false,
            api     : ['/customer/potential/getList', '/customer/info/searchCustomer'][~~this.exclusive]
        }
    },
    methods: {
        back () {
            this.$emit('Hidden', false)
            this.$emit('Cancel', false)
        },
        toAdd () {
            this.$emit('AddCustomer')
            this.$emit('Hidden', false)
        },
        onLoad () {
            setTimeout(() => {
                this.$ajax({
                    url : this.api,
                    data: {
                        text      : this.value,
                        list_rows : 20,
                        page      : this.page += 1
                    }
                }).then((_res) => {
                    this.list       = this.list.concat(_res.filter(_item => _item.ID))
                    this.loading    = false
                    if (_res && _res.length <= 20) {
                        this.finished = true
                    }
                })
            }, 500)
        },
        onSearch () {
            switch (~~this.exclusive) {
                case 0:
                    this.list     = []
                    this.page     = 0
                    this.loading  = false
                    this.finished = false
                    this.onLoad()
                    break;

                default:
                    if (this.value) {
                        this.$ajax({
                            url : this.api,
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
            this.$emit('Hidden', false)
            this.$emit('Select', _v)
        }
    },
    created () {
        if (!this.exclusive) {
            this.onLoad()
        }
    }
}
</script>