<style lang="less" src="./NewCustomerApply.less" scoped></style>

<template>
    <transition name="pop-right">
        <layout-base id="NewCustomerApply" v-show="visibile">
            <div class="header" slot="header">
                <div class="iconfont icon-back" @click="back()"></div>
                <div class="title">新客成交</div>
            </div>

            <div class="ul">
                <van-cell is-link v-for="(v, i) in list" :key="i" @click="select(v)">
                    <div class="left" slot="title">
                        <i class="iconfont icon-sex-man" v-if="v.Sex == '男'"></i>
                        <i class="iconfont icon-sex-women" v-else></i>
                        <span class="van-ellipsis">{{v.Name}}</span>
                    </div>
                    <span>{{v.Mobile}}</span>
                </van-cell>
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
            list: []
        }
    },
    watch: {
        visibile (_v) {
            if (_v) {
                this.getList()
            }
        }
    },
    methods: {
        back () {
            this.$emit('HiddenPop', false)
        },
        select (_v) {
            this.back()
            this.list = []
            this.$emit('Select', _v)
        },
        getList() {
            this.$ajax({
                url: '/employee/NewCustomer/findNewCustomerApplyList'
            }).then((_res) => {
                this.list = _res.filter(_item => _item.CustomerID)
            })
        }
    },
    created () {
        this.getList()
    }
}
</script>