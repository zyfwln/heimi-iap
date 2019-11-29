<style lang="less" src="./ReserveAdd.less" scoped></style>

<template>
    <layout-base id="ReserveAdd">
        <v-header slot="header" class="header">
            <div class="title" slot="center">客户预约</div>
        </v-header>
        <div class="page">
            <van-cell title="预约客户" is-link @click="showC = true">
                <span>{{customer.Name}}</span>
            </van-cell>
            <van-cell title="预约类型">
                <radio-group :items="radios" :value-key="'name'" :activeIndex="type" @RadioSelect="radioSelect"></radio-group>
            </van-cell>
            <van-cell title="服务技师" is-link @click="showE = true">
                <span>{{employee.Name}}</span>
            </van-cell>
            <van-cell title="服务项目" is-link @click="toSelectProject()">
                <span>{{reserveProject.ProjectName}}</span>
            </van-cell>
            <van-cell title="预约时间" is-link @click="showT = true">
                <span>{{reserveTime}}</span>
            </van-cell>
            <van-cell title="预约床位" is-link @click="toSelectBed()" v-show="type == 0">
                <span class="van-ellipsis">{{reserveSeat && `${reserveSeat.RoomName}>${reserveSeat.SeatName}>${reserveSeat.SeatType}`}}</span>
            </van-cell>
        </div>
        <div class="button" @click="submit()">提交预约</div>

        <reserve-customer v-model="showC" @Select="selectCustomer" @AddCustomer="toAddCustomer"></reserve-customer>
        <customer-add     v-model="showA" @AddCustomer="selectCustomer" @Cancel="cancelAdd"></customer-add>
        <employee-search  v-model="showE" :is-working="true" :work-date="reserveTime" @Select="selectEmployee"></employee-search>
        <project-list     v-model="showP" :is-customer="isCustomer" :customer="customer.ID" @Select="selectProject"></project-list>
        <reserve-time-box v-model="showT" :employee="employee.ID" @Select="selectTime"></reserve-time-box>
        <reserve-bed      v-model="showB" @Select="selectSeat" :date="reserveTime"></reserve-bed>
    </layout-base>
</template>

<script>
import { mapState }    from 'vuex'
import RadioGroup      from '../../components/RadioGroup/RadioGroup.vue'
import ReserveCustomer from '../../components/ReserveCustomer/ReserveCustomer.vue'
import CustomerAdd     from '../../components/CustomerAdd/CustomerAdd.vue'
import EmployeeSearch  from '../../components/EmployeeSearch/EmployeeSearch.vue'
import ProjectList     from '../../components/ProjectList/ProjectList.vue'
import ReserveTimeBox  from '../../components/ReserveTimeBox/ReserveTimeBox.vue'
import ReserveBed      from '../../components/ReserveBed/ReserveBed.vue'

import { isEmpty } from '../../assets/js/utils'

export default {
    components: {
        RadioGroup,
        ReserveCustomer,
        CustomerAdd,
        EmployeeSearch,
        ProjectList,
        ReserveTimeBox,
        ReserveBed
    },
    data () {
        return {
            reserveTime   : undefined,
            reserveSeat   : undefined,
            showC         : false,
            showA         : false,
            showE         : false,
            showP         : false,
            showT         : false,
            showB         : false,
            type          : 0,
            customer      : {},
            employee      : {},
            reserveProject: {}
        }
    },
    computed: {
        ...mapState(['user']),
        isCustomer () {
            return this.type == 0 && !isEmpty(this.customer.ID)
        },
        radios () {
            return [
                { name: '服务', value: 0 },
                { name: '咨询', value: 1 }
            ]
        },
        reserveData () {
            let o = {
                CustomerID  : this.customer.ID,
                AppointDate : this.reserveTime,
                EmployeeID  : this.employee.ID,
                ShopID      : this.user.ShopID,
                Type        : this.type,
                CourseID    : this.reserveProject.ID
            }
            return Object.assign(o, this.reserveSeat)
        }
    },
    methods: {
        getReserveList () {
            let date = new Date(this.reserveDate).DateFormat()
            this.$ajax({
                url : '/employee/appoint/shopAppoint',
                data: {
                    Start: date,
                    End  : date
                }
            }).then((_res) => {
                this.reserveList = _res.list.filter(_item => _item.ID && _item.customer.ID)
            })
        },
        radioSelect (_i) {
            this.type = this.radios[_i].value
        },
        selectCustomer (_c) {
            this.customer = _c
            this.reserveProject = {}
        },
        toAddCustomer () {
            // 添加
            this.showA = true
        },
        cancelAdd () {
            this.showC = true
        },
        selectEmployee (_e) {
            this.employee = _e
        },
        toSelectProject () {
            if (this.customer.ID) {
                this.showP = true
            } else {
                this.$toast('请先选择会员')
            }
        },
        selectProject (_p) {
            this.reserveProject = this.isCustomer ? {
                ID: _p.ID,
                ProjectName: _p.project.ProjectName
            } : _p
        },
        selectTime (_d) {
            this.reserveTime = _d
        },
        selectSeat (_s) {
            this.reserveSeat = _s
        },
        toSelectBed () {
            if (!this.reserveTime) {
                this.$toast('请先选择预约时间')
                return;
            }
            this.showB = true
        },
        submit () {
            this.$dialog.confirm({
                title   : '提示',
                message : '是否确认预约'
            }).then(() => {
                this.$ajax({
                    url : '/employee/appoint/appoint',
                    data: this.reserveData
                }).then(() => {
                    this.$toast('预约成功')
                    this.$router.go(-1)
                })
            }).catch(() => {})
        }
    },
    created () {
        this.customer = {
            ID: this.$route.query.ID,
            Name: this.$route.query.Name
        }

        this.employee = {
            ID  : this.$store.state.user.ID,
            Name: this.$store.state.user.Name
        }
    }
}
</script>