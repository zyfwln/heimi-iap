<style lang="less" src="./AchievementApply.less" scoped></style>

<template>
    <layout-base id="AchievementApply">
        <v-header class="header" slot="header">
            <div class="title" slot="center">申请分配业绩</div>
        </v-header>
        <div class="page">
            <v-list :show-loading="loading" :length="list.length">
                <div class="li is-link" v-for="(v, i) in list" :key="i + 100" @click="selectCustomer(v, i)">
                    <div class="left">
                        <div class="iconfont" :class="activeIndex == i ? 'icon-radio-yes' : 'icon-radio-no'"></div>
                        <div class="name">{{v.CustomerName}}</div>
                        <div class="mobile">（***）</div>
                    </div>
                    <div class="right">￥{{$utils.NumberFormat(v.SellMoney)}}</div>
                    <div class="iconfont icon-right"></div>
                </div>
            </v-list>
        </div>
        <achievement-apply v-model="show" :info="info" @Submit="apply"></achievement-apply>
    </layout-base>
</template>

<script>
import AchievementApply from '../../components/AchievementApply/AchievementApply.vue'

export default {
    components: {
        AchievementApply
    },
    data () {
        return {
            activeIndex : undefined,
            show        : false,
            loading     : true,
            list        : [],
            info        : {
                customerName: '',
                employeeName: '',
                items       : []
            }
        }
    },
    methods: {
        selectCustomer (_v, _i) {
            this.activeIndex = _i
            this.show        = true
            this.info        = {
                items       : _v.buy,
                customerName: _v.CustomerName,
                employeeName: _v.EmployeeName
            }
        },
        getList () {
            this.$ajax({
                url : '/employee/achieve/getConsumeList',
                data: {
                    StartTime   : new Date().DateFormat(),
                    EndTime     : new Date().DateFormat()
                }
            }).then((_res) => {
                this.list = _res.ConsumeList
                this.loading = false
            })
        },
        apply (_selected) {
            if (_selected.length <= 0) {
                this.$toast('请选择要申请的业绩')
                return;
            }
            this.$dialog.confirm({
                title: '确定申请业绩'
            }).then(() => {
                let data = []
                for (let i = 0, len = _selected.length; i < len; i++) {
                    let _item = _selected[i]
                    if (!Number(_item.Rate) || Number(_item.Rate) <= 0) {
                        this.$toast('比例必须大于0')
                        return;
                    } else {
                        data.push({
                            BuyDetailID : _item.ID,
                            Proportion  : _item.Rate
                        })
                    }
                }
                this.$ajax({
                    url : '/employee/achieve/applyAchieve',
                    data: {
                        AchieveArray: data
                    }
                }).then(() => {
                    this.$toast('申请成功')
                    this.activeIndex = undefined
                    this.show        = false
                    this.getList()
                })
            }).catch(() => {})
        }
    },
    created () {
        this.getList()
    }
}
</script>