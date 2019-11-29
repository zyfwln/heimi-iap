<style lang="less" src="./EmployeeSearch.less" scoped></style>

<template>
    <van-popup v-model="visibile"
                id="EmployeeSearch"
                position="right"
                :overlay="false"
                :lock-scroll="true">
        <layout-base>
            <div class="header" :style="bgColor" slot="header">
                <div class="iconfont icon-back" @click="back()"></div>
                <div class="title">技师列表</div>
            </div>
            <!-- <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                show-action
                @search="onSearch">
                <div slot="action" @click="onSearch">搜索</div>
            </van-search> -->

            <div class="ul">
                <van-cell is-link v-for="(v, i) in employeeList" :key="i" @click="selectEmployee(v, i)">
                    <div class="title" slot="title">
                        <i class="iconfont icon-checkbox-yes-r" v-if="activeIndex == i"></i>
                        <i class="iconfont icon-checkbox-no-r" v-else></i>
                        <span>{{v.Name}}</span>
                    </div>
                </van-cell>
            </div>
        </layout-base>
    </van-popup>
</template>

<script>

export default {
    model: {
        prop: 'visibile',
        event: 'HiddenPop'
    },
    props: {
        visibile : Boolean,
        isWorking: Boolean,
        workDate : {
            type: String,
            default: () => new Date().DateFormat()
        },
        bgColor  : {
            type    : String,
            default : 'background-color: #4d95ff'
        }
    },
    data () {
        return {
            activeIndex : undefined,
            value       : '',
            employeeList: []
        }
    },
    methods: {
        back () {
            this.$emit('HiddenPop', false);
        },
        getEmployees () {
            this.$ajax({
                url : ['/employee/info/getShopEmployee', '/employee/Info/getShopWorkEmployee'][~~this.isWorking],
                data: {
                    Date: this.workDate
                }
            }).then((_res) => {
                this.employeeList = this.isWorking ? _res.employeeList : _res.employee
            })
        },
        selectEmployee (_v, _i) {
            this.activeIndex = _i
            this.$emit('Select', _v)
            this.back()
        }
    },
    created () {
        this.getEmployees()
    }
}
</script>