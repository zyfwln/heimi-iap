<template>
    <layout-base id="PlainningListForMonth">
        <v-header slot="header" class="header">
            <div class="title" slot="center">本月规划列表</div>
        </v-header>
        <div class="page">
            <div id="tableFix" class="center-h-flex bg-white font-14 font-gray-333" style="height: 45px;">
                <div class="ml-20" style="flex: 2.5">
                    <span>销售目标</span>
                </div>
                <div class="center" style="width: 80px">目标金额</div>
                <div class="center mr-30" style="width: 80px">成交金额</div>
            </div>
            <v-list class="list van-hairline--top" :show-loading="loading" :length="list.length"
                    style="height: calc(100% - 148px);overflow-y: auto;">
                <div class="bg-white center-h-flex p-15 font-14 font-gray-666 van-hairline--bottom" v-for="(item,index) in list" :key="index"
                     @click="goSaleDetail(item)">
                    <div style="flex: 2.5">
                        <i v-if="item.customer&&item.customer.Sex==='男'" class="ic-sex-nan"></i>
                        <i v-else class="ic-sex-nv"></i>
                        <i class="iconfont" :class="1 ? 'icon-man' : 'icon-women'"></i>
                        <span>{{item.customer ?item.customer.Name:""}}</span>
                    </div>
                    <div class="center" style="width: 80px">￥{{item.PlanMoney}}</div>
                    <div class="center" style="width: 80px">{{item.ConsumeCash>0?"￥"+item.ConsumeCash:"未成交"}}</div>
                    <van-icon name="arrow ml-15"/>
                </div>
            </v-list>
        </div>
        <div class="suspended-bottom">
            <div class="center-h-flex"
                 style="background: #754EFF;color: #fff;font-size: 14px;height: 50px;line-height: 50px;padding: 0 15px;">
                <div style="flex: 2.5">总计</div>
                <div class="" style="width: 80px">{{list.length}}人</div>
                <div class="" style="width: 80px">￥{{totalPlanMoney}}</div>
                <div class="" style="width: 80px">￥{{totalConsumeCash}}</div>
            </div>
        </div>
    </layout-base>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                loading: false,
                list: [],
                totalConsumeCash: 0,
                totalPlanMoney: 0,
            }
        },
        computed: {
            ...mapState(['homeDate']),
            paramDate() {
                let start = undefined;
                let end = undefined;
                if (this.homeDate) {
                    var timeArr = this.homeDate.split("-");
                    start = timeArr[0] + "-" + timeArr[1] + "-" + "01";
                    end = timeArr[0] + "-" + timeArr[1] + "-" + "30";
                }
                return {
                    EndTime: end,
                    StartTime: start
                }
            }
        },
        created() {
            var vm = this;
            vm.initUI();
            vm.getEmpPlanList();
        },
        methods: {
            initUI(){
                var vm = this;
            },
            goSaleDetail(item) {
                this.$router.push({
                    path: '/SaleDetail/SaleDetail',
                    query: {
                        AchievePlanID: item.AchievePlanID
                    }
                })
            },
            getEmpPlanList(){
                var vm = this;
                vm.totalConsumeCash = 0;
                vm.totalPlanMoney = 0;
                vm.$ajax({
                    url: '/employee/achievePlan/getEmpPlanList',
                    data: this.paramDate
                }).then((_res) => {
                    vm.list = _res.list;
                    vm.loading = false;

                    vm.list.map(function (item) {
                        var consumeCash = 0;
                        var planMoney = 0;
                        planMoney = parseFloat(item.PlanMoney);
                        consumeCash = parseFloat(item.ConsumeCash);
                        item.PlanMoney = planMoney;
                        item.ConsumeCash = consumeCash;
                        //
                        vm.totalPlanMoney = vm.totalPlanMoney + planMoney;
                        vm.totalConsumeCash = vm.totalConsumeCash + consumeCash;
                        return item;
                    });
                })
            }
        },
    }
</script>
<style lang="less" scoped>
    #Header {
        background: #754EFF;
    }
</style>