<style lang="less" src="./MySalary.less" scoped></style>

<template>
    <layout-base id="MySalary">
        <v-header class="header" slot="header">
            <div class="title" slot="center">本月薪资</div>
        </v-header>
        <div class="total">￥{{$utils.NumberFormat(total)}}</div>
        <div class="page">
            <van-list v-model="loading" :finished="finished" finished-text="我是有底线的" @load="load">
                <li v-for="(v, i) in list" :key="i">
                    <div class="li">
                        <div class="label">
                            <div>{{v.Type}}</div>
                        </div>
                        <div class="name van-ellipsis">{{v.ProductName || v.Type}}</div>
                        <div class="num">{{v.ProductName && `x${Number(v.Quantity)}`}}</div>
                    </div>
                    <div class="li">
                        <div class="time">日期：{{v.IssueDate && v.IssueDate.substr(0, 16)}}</div>
                        <div class="price">￥{{$utils.NumberFormat(v.Bonus)}}</div>
                    </div>
                </li>
            </van-list>
        </div>
    </layout-base>
</template>

<script>
export default {
    data () {
        return {
            loading : false,
            finished: false,
            total   : 0,
            page    : 1,
            list    : []
        }
    },
    methods: {
        load () {
            setTimeout(() => {
                this.$ajax({
                    url : '/employee/info/getMonthSalaryList',
                    data: {
                        page: this.page,
                        list_rows: 20,
                        Month: undefined
                    }
                }).then((_res) => {
                    this.total   = _res.MonthSalary
                    this.list    = this.list.concat(_res.List)
                    this.loading = false
                    this.page += 1
                    if (_res.List.length < 20) {
                        this.finished = true
                    }
                })
            }, 300)
        }
    }
}
</script>