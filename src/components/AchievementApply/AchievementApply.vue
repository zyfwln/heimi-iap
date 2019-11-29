<style lang="less" src="./AchievementApply.less" scoped></style>

<template>
    <transition name="pop-right">
        <layout-base class="charge-apply" v-if="show">
            <v-header class="header" slot="header">
                <div class="iconfont icon-back" slot="left" @click="$emit('Hidden', false)"></div>
                <div class="title" slot="center">申请分配业绩</div>
            </v-header>
            <div class="page">
                <van-cell title="服务客户" @click="$emit('Hidden', true)">
                    <div class="value">{{info.customerName}}</div>
                </van-cell>
                <van-cell class="no" title="专属技师">
                    <div class="value">{{info.employeeName}}</div>
                </van-cell>
                <ul>
                    <achievement-apply-item :value="v" v-for="(v, i) in info.items" :key="i" @Select="select" @Change="changeData"></achievement-apply-item>
                </ul>
            </div>
            <van-button tag="div" @click="$emit('Submit', selected)">提交申请</van-button>
        </layout-base>
    </transition>
</template>

<script>
import AchievementApplyItem from '../AchievementApplyItem/AchievementApplyItem.vue'

export default {
    components: {
        AchievementApplyItem
    },
    model: {
        prop: 'show',
        event: 'Hidden'
    },
    props: {
        show: Boolean,
        info: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            selected: []
        }
    },
    watch: {
        show (_v) {
            !_v && Object.assign(this.$data, this.$options.data())
        }
    },
    methods: {
        select (_data) {
            let index = this.selected.indexOf(_data)
            index >= 0 ? this.selected.splice(index, 1) : this.selected.push(_data)
        },
        changeData (_data) {
            let index = this.selected.indexOf(_data)
            if (index >= 0) {
                this.selected.splice(index, 1)
                this.selected.push(_data)
            }
        }
    }
}
</script>