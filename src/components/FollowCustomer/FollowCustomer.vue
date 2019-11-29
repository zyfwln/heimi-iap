<style lang="less" src="./FollowCustomer.less" scoped></style>

<template>
    <transition name="pop-right">
        <layout-base id="FollowCustomer" v-show="visibile">
            <div class="header" slot="header">
                <div class="iconfont icon-back" @click="back()"></div>
                <div class="title">我的潜在客户</div>
            </div>
            <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                show-action
                @search="onSearch">
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>

            <div class="ul">
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                    <van-cell is-link v-for="(v, i) in list" :key="i" @click="select(v)">
                        <div class="left" slot="title">
                            <i class="iconfont icon-sex-man" v-if="v.Sex == '男'"></i>
                            <i class="iconfont icon-sex-women" v-else></i>
                            <span class="van-ellipsis">{{v.CusName}}</span>
                        </div>
                        <span>{{v.Mobile}}</span>
                    </van-cell>
                </van-list>
            </div>
        </layout-base>
    </transition>
</template>

<script>
export default {
    model: {
        prop: 'visibile',
        event: 'HiddenPop'
    },
    props: {
        visibile: Boolean
    },
    data () {
        return {
            value: '',
            list: [],
            page: 0,
            loading: false,
            finished: false
        }
    },
    methods: {
        back () {
            this.$emit('HiddenPop', false)
        },
        onLoad () {
            setTimeout(() => {
                this.$ajax({
                    url: '/employee/NewCustomer/getMyFollowList',
                    data: {
                        text: this.value,
                        list_rows: 20,
                        page: this.page += 1
                    }
                }).then((_res) => {
                    this.list = this.list.concat(_res.filter(_item => _item.CusID))
                    this.loading = false
                    if (_res && _res.length <= 20) {
                        this.finished = true
                    }
                })
            }, 500);
        },
        onSearch () {
            this.list = []
            this.page = 0
            this.loading = false
            this.finished = false
            this.onLoad()
        },
        select (_v) {
            this.back()
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