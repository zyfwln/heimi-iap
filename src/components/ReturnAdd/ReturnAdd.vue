<style lang="less" src="./ReturnAdd.less" scoped></style>

<template>
    <transition name="pop-right">
        <layout-base id="ReturnAdd" v-show="show">
            <div class="header" :style="bgColor" slot="header">
                <div class="cancel" @click="back()">取消</div>
                <div class="title">客户搜索</div>
            </div>
            <van-search
                v-model="value"
                placeholder="请输入姓名或手机号"
                show-action
                @search="onSearch">
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
            <ul class="condition">
                <li :class="{ 'on': activeIndex == i }" v-for="(v, i) in conditions" :key="i" @click="getConditionList(i)">{{v}}</li>
            </ul>

            <v-list class="result" :show-loading="loading" :length="list.length">
                <li class="is-link border-bottom" v-for="(v, i) in list" :key="i + 3" @click="selectCustomer(v)">
                    <div class="left">
                        <i class="iconfont icon-sex-man" v-if="v.Sex == '男'"></i>
                        <i class="iconfont icon-sex-women" v-else></i>
                        <span class="van-ellipsis">{{v.Name}}</span>
                    </div>
                    <div class="right">{{v.Mobile}}</div>
                    <div class="iconfont icon-right"></div>
                </li>
            </v-list>
        </layout-base>
    </transition>
</template>

<script>

export default {
    model: {
        prop    : 'show',
        event   : 'Hidden'
    },
    props: {
        show: Boolean,
        bgColor: String
    },
    data () {
        return {
            value       : '',
            conditions  : ['6个月未到店', '3个月未到店', '1个月未到店'],
            loading     : true,
            list        : [],
            condition   : [null, null],
            activeIndex : null
        }
    },
    watch: {
        show (_v) {
            if (_v) {
                this.onSearch()
            } else {
                this.value          = ''
                this.activeIndex    = null
                this.condition      = [null, null]
                this.clear()
            }
        }
    },
    methods: {
        back () {
            this.$emit('Hidden', false)
            this.$emit('Cancel', false)
        },
        clear () {
            this.list       = []
            this.loading    = true
        },
        onSearch () {
            this.clear()
            setTimeout(() => {
                this.$ajax({
                    url: '/customer/Info/getNotPatronizeByNumOfMonth',
                    data: {
                        page        : 1,
                        list_rows   : 100,
                        Text        : this.value,
                        MaxOfMonth  : this.condition[1],
                        MinOfMonth  : this.condition[0]
                    }
                }).then((_res) => {
                    this.list       = _res.filter(_item => _item.ID)
                    this.loading    = false
                })
            }, 300);
        },
        getConditionList (_i) {
            this.activeIndex = this.activeIndex == _i ? null : _i
            if (this.activeIndex != null) {
                this.condition = [
                    [1, 3],
                    [3, 6],
                    [6, null]
                ][_i]
            } else {
                this.condition = [null, null]
            }

            this.onSearch()
        },
        selectCustomer (_c) {
            this.$emit('Select', _c)
        }
    }
}
</script>