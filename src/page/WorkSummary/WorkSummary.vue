<style lang="less" src="./WorkSummary.less" scoped></style>

<template>
    <layout-base id="WorkSummary">
        <v-header slot="header" class="header">
            <div class="title" slot="center">工作小结</div>
        </v-header>
        <div class="pages">
            <summary-page v-for="(v, i) in steps"
                            :key="i"
                            :index="i"
                            :text="v"
                            :info="selected"
                            @SummaryNext="summaryNext"
                            @Submit="submit"
                            v-if="activeStep == i">
                <span slot="tips" v-if="i == 0">已达到记录次数的客户</span>
                <div slot="list" v-if="i == 0">
                    <div class="cell is-link" v-for="(v, i) in photoList" :key="i" @click="selectPhoto(v, i)">
                        <div class="left">
                            <div class="iconfont icon-radio-yes" v-if="activeIndex == i"></div>
                            <div class="iconfont icon-radio-no" v-else></div>
                            <div>{{v.Customer.Name}}</div>
                        </div>
                        <div class="center van-ellipsis">{{v.ProjectName}}</div>
                        <div class="right">
                            <span class="color-62acff">第{{v.Times}}次记录</span>
                        </div>
                    </div>
                </div>
                <div slot="list" v-else>
                    <div class="cell is-link" v-for="(v, i) in serviceList" :key="i" @click="selectPerson(v, i)">
                        <div class="left">
                            <div class="iconfont icon-radio-yes" v-if="activeIndex2 == i"></div>
                            <div class="iconfont icon-radio-no" v-else></div>
                            <div>{{v.customer.Name}}</div>
                        </div>
                        <div class="center van-ellipsis">{{v.ProjectName}}</div>
                        <div class="right">
                            <span>{{v.CustomerInfo.CustomerType}}级</span>
                        </div>
                    </div>
                </div>
            </summary-page>
        </div>
    </layout-base>
</template>

<script>
import SummaryPage from '../../components/SummaryPage/SummaryPage.vue'

export default {
    components: {
        SummaryPage
    },
    data () {
        return {
            activeStep: 0,
            steps: [
                '以下客户已达到拍照次数，<br>记得给他们拍照哦！',
                '回想一下，今日服务及回访的客户中，<br>是否有副反应的客户需要记录',
                '回想一下，今日服务及回访的客户中，<br>是否有新需求需要记录',
                '回想一下，今日服务及回访的客户中，<br>是否有客情需要记录',
                '回想一下，今日服务及回访的客户中，<br>是否有客户意见或建议需要登记',
                '已经快完成了哦，我们来复核一下以上<br>内容是否有遗漏。',
                '再坚持一下，马上就要结束了，<br>最后一项每日工作小结'
            ],
            list: [],
            photoList: [],
            serviceList: [],
            activeIndex: null,
            activeIndex2: null,
            selected: {},
            overview: false
        }
    },
    methods: {
        getPhotoList () {
            this.$ajax({
                url: '/feedback/DailySummary/getPhotoList'
            }).then((_res) => {
                this.photoList = _res
            })
        },
        getTodayServiceList () {
            this.$ajax({
                url: '/feedback/DailySummary/getTodayServiceList'
            }).then((_res) => {
                this.serviceList = _res
            })
        },
        selectPhoto (_v, _i) {
            this.activeIndex = _i
            this.selected = this.photoList[_i]
        },
        selectPerson (_v, _i) {
            this.activeIndex2 = _i
            this.selected = this.serviceList[_i]
            this.selected.Customer = this.selected.customer
        },
        summaryNext (_i) {
            this.activeStep = _i + 1

            switch (_i) {
                case 0:
                    break;

                case 1:
                    break;
            
                default:
                    break;
            }
        },
        submit () {
            if (this.activeStep == 0) {
                this.getPhotoList()
            } else {
                this.getTodayServiceList()
            }
        }
    },
    created () {
        this.getPhotoList()
        this.getTodayServiceList()
    }
}
</script>