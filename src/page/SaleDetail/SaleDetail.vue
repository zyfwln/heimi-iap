<template>
    <layout-base id="SaleDetail">
        <v-header slot="header" class="header">
            <div class="title" slot="center">{{actionbarTitle}}</div>
        </v-header>
        <div class="page" style="font-size: 14px;color: #333;overflow-y: auto;">
            <div class="cell van-hairline--bottom center-h-flex">
                <div class="flex1">消费客户</div>
                <div>
                    <!--<i class="ic-sex-nan"></i>-->
                    {{saleDetail.ConsumeDetail&&saleDetail.ConsumeDetail.CustomerName?saleDetail.ConsumeDetail.CustomerName:""}}
                </div>
            </div>
            <div class="cell van-hairline--bottom center-h-flex">
                <div class="flex1">服务技师</div>
                <div>
                    <!--<i class="ic-sex-nan"></i>-->
                    {{saleDetail.ConsumeDetail&&saleDetail.ConsumeDetail.EmployeeName?saleDetail.ConsumeDetail.EmployeeName:""}}
                </div>
            </div>

            <!--销售计划 PlanDetail-->
            <div class="mt-10">
                <div class="cell van-hairline--bottom center-h-flex">
                    <div class="flex1">销售计划</div>
                </div>
                <div class="cell van-hairline--bottom center-h-flex">
                    <div class="flex1 ml-30">
                        <span style="background: #3F8CFF;color: #fff;padding: 1px 3px;font-size: 11px;border-radius: 2px;">项目</span>
                        {{saleDetail.PlanDetail.ProjectName}}
                    </div>
                    <div>￥{{saleDetail.PlanDetail.PlanMoney}}</div>
                </div>
                <div class="cell van-hairline--bottom center-h-flex" style="text-align: right;">
                    <div class="flex1">总计</div>
                    <div style="width: 100px">￥{{saleDetail.PlanDetail.PlanMoney}}</div>
                </div>
            </div>

            <!--销售明细 ConsumeDetail-->
            <div class="mt-10" v-if="saleDetail.ConsumeDetail&&saleDetail.ConsumeDetail.buy">
                <div class="cell van-hairline--bottom center-h-flex">
                    <div class="flex1">销售明细</div>
                    <div>{{saleDetail.ConsumeDetail&&saleDetail.ConsumeDetail.IssueDate?saleDetail.ConsumeDetail.IssueDate.split(" ")[0]:""}}</div>
                </div>
                <div class="cell van-hairline--bottom center-h-flex" v-for="(item,index) in saleDetail.ConsumeDetail.buy" :key="index">
                    <div class="flex1 ml-30">
                        <span style="background: #FF5555;color: #fff;padding: 1px 3px;font-size: 11px;border-radius: 2px;">{{item.Type}}</span>
                        {{item.ProductName}}
                    </div>
                    <div>￥{{item.TotalMoney}}</div>
                </div>
                <div class="cell van-hairline--bottom center-h-flex" style="text-align: right;">
                    <div class="flex1">总计</div>
                    <div style="width: 100px">￥{{saleDetail.ConsumeDetail.SellMoney}}</div>
                </div>
                <div class="cell van-hairline--bottom center-h-flex" style="text-align: right;">
                    <div class="flex1">现金支付</div>
                    <div style="width: 100px">{{saleDetail.ConsumeDetail.Cash}}</div>
                </div>
                <div class="cell van-hairline--bottom center-h-flex" style="text-align: right;">
                    <div class="flex1">欠款</div>
                    <div style="width: 100px">{{saleDetail.ConsumeDetail.Debt}}</div>
                </div>
            </div>

            <!--销售业绩分配比例"-->
            <div class="mt-10" v-if="saleDetail.AchieveDetail&&saleDetail.AchieveDetail.length>0&&saleDetail.ConsumeDetail.buy">
                <div class="cell van-hairline--bottom center-h-flex">
                    <div class="flex1">销售业绩分配比例</div>
                </div>
                <div v-for="(item,index) in saleDetail.AchieveDetail" :key="index">
                    <div class="cell van-hairline--bottom center-h-flex">
                        <div class="flex1 ml-30">
                            <span style="background: #3F8CFF;color: #fff;padding: 1px 3px;font-size: 11px;border-radius: 2px;">项目</span>
                            {{item.buy.ProductName}}
                        </div>
                        <div class="position-relative" style="width: 100px;">
                            <div style="border-radius: 5px;height: 10px;border: 1px solid #7688fc;"></div>
                            <div style="position: absolute;left: 0;top:0;margin-top:2px;border-radius: 5px;height: 8px;background: #7688fc;" :style="{width:item.Proportion+'%'}"></div>
                        </div>
                        <div style="color: #7688fc;margin-left: 5px;">{{item.Proportion}}%</div>
                    </div>
                    <div class="cell van-hairline--bottom center-h-flex" style="text-align: right;">
                        <div class="flex1">销售业绩</div>
                        <div style="width: 100px;color: #FF5555;">￥{{item.Cash}}</div>
                    </div>
                </div>
            </div>
            <!--<div class="center-h-flex bg-white p-15 font-14 font-gray-333">-->
                <!--<div class="ml-20" style="flex: 2.5">-->
                    <!--<span>销售目标</span>-->
                <!--</div>-->
                <!--<div class="flex1 center">目标金额</div>-->
                <!--<div class="flex1 center mr-30">成交金额</div>-->
            <!--</div>-->
        </div>
    </layout-base>
</template>

<script>
    // import { mapState } from 'vuex'

    export default {
        data () {
            return {
                actionbarTitle:undefined,
                AchievePlanID:undefined,
                saleDetail:{
                    PlanDetail:{},//销售计划
                    ConsumeDetail:{},//实际销售明细
                    AchieveDetail:{}, //销售业绩分配比例
                },
            }
        },
        created () {
            var vm = this;
            vm.AchievePlanID = vm.$route.query.AchievePlanID;
            vm.getSaleDetail();
        },
        methods: {
            getSaleDetail(){
                var vm = this;
                vm.$ajax({
                    url: '/employee/AchievePlan/getSaleDetail',
                    data: {
                        AchievePlanID:vm.AchievePlanID
                    }
                }).then((_res) => {
                    vm.saleDetail = _res;
                    if(vm.saleDetail.ConsumeDetail&&vm.saleDetail.ConsumeDetail.buy){
                        vm.actionbarTitle = "销售明细";
                    }else {
                        vm.actionbarTitle = "未成交";
                    }
                })
            }
        },
    }
</script>
<style lang="less" scoped>
    .cell{
        background: #fff;
        padding: 15px 15px;
    }
</style>