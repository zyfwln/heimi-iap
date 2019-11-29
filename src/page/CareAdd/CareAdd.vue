<style lang="less" src="./CareAdd.less" scoped></style>

<template>
    <layout-base id="CareAdd">
        <v-header class="header" slot="header">
            <div class="title" slot="center">添加客户关怀</div>
        </v-header>
        <div class="page">
            <van-cell title="客户" is-link @click="showC = true">
                <span v-if="customer.Name">{{customer.Name}}</span>
                <span class="placeholder" v-else>请选择关怀的客户</span>
            </van-cell>
            <van-cell title="事件">
                <div class="input">
                    <input type="text" v-model="content" placeholder="输入内容">
                </div>
            </van-cell>
            <van-cell title="日期" is-link @click="showD = true">
                <span v-if="date">{{date}}</span>
                <span class="placeholder" v-else>请选择日期</span>
            </van-cell>
        </div>

        <div class="button" @click="submit">确认新增</div>

        <van-popup v-model="showD">
            <van-datetime-picker v-model="now" type="date" @confirm="confirm" @cancel="cancel" />
        </van-popup>
        
        <customer-search v-model="showC" @Select="selectCustomer"></customer-search>
    </layout-base>
</template>

<script>
import CustomerSearch from '../../components/CustomerSearch/CustomerSearch.vue'

export default {
    components: {
        CustomerSearch
    },
    data () {
        return {
            showC: false,
            showD: false,
            currentDate: +new Date(),
            now: new Date(),
            content: '',
            customer: {
                ID: this.$route.query.ID,
                Name: this.$route.query.Name
            }
        }
    },
    computed: {
        date () {
            return new Date(this.currentDate).DateFormat()
        }
    },
    methods: {
        cancel () {
            this.showD = false
        },
        confirm (_v) {
            this.showD = false
            this.currentDate = +new Date(_v)
        },
        selectCustomer (_c) {
            this.customer = _c
        },
        submit () {
            if (!this.content) {
                this.$toast('请输入事件内容')
                return;
            }
            this.$dialog.confirm({
                title: '确认添加客户关怀吗？'
            }).then(() => {
                this.$ajax({
                    url: '/customer/Care/addNewCarePlan',
                    data: {
                        CustomerID: this.customer.ID,
                        CareTypeName: this.content,
                        SDate: this.date
                    }
                }).then(() => {
                    this.$dialog.confirm({
                        title: '提示',
                        message: '成功添加一条客户关怀，是否继续添加？'
                    }).then(() => {
                        this.customer = {}
                        this.content = ''
                        this.currentDate = +new Date()
                    }).catch(() => {
                        this.$router.go(-1)
                    })
                })
            }).catch(() => {})
        }
    }
}
</script>