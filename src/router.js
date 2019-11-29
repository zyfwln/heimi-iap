import Vue from 'vue';
import store from './store';
import Router from 'vue-router';

import Login from './page/Login/Login.vue';

import Home from './page/Home/Home.vue';
import HomeIndex from './page/HomeIndex/HomeIndex.vue';
import HomeReserve from './page/HomeReserve/HomeReserve.vue';

import HomeReturn from './page/HomeReturn/HomeReturn.vue';
import ReturnRecord from './page/ReturnRecord/ReturnRecord.vue';
import ReturnDetail from './page/ReturnDetail/ReturnDetail.vue';

import HomeGuest from './page/HomeGuest/HomeGuest.vue';
import GuestFollowRecord from './page/GuestFollowRecord/GuestFollowRecord.vue';

import HomeAchievement from './page/HomeAchievement/HomeAchievement.vue';
import AchievementDetail from './page/AchievementDetail/AchievementDetail.vue';
import Achievement from './page/Achievement/Achievement.vue';
import AchievementChange from './page/AchievementChange/AchievementChange.vue';
import AchievementAdd from './page/AchievementAdd/AchievementAdd.vue';
import AchievementApply from './page/AchievementApply/AchievementApply.vue';
import PlainningListForMonth from './page/PlainningListForMonth/PlainningListForMonth.vue';
import SaleDetail from './page/SaleDetail/SaleDetail.vue';

import HomeDebt from './page/HomeDebt/HomeDebt.vue';
import DebtDetail from './page/DebtDetail/DebtDetail.vue';

import HomeService from './page/HomeService/HomeService.vue';
import Service from './page/Service/Service.vue';
import ServiceChargeApply from './page/ServiceChargeApply/ServiceChargeApply.vue';
import ServiceChargeChange from './page/ServiceChargeChange/ServiceChargeChange.vue';
import ServiceDetail from './page/ServiceDetail/ServiceDetail.vue';

import ReserveAdd from './page/ReserveAdd/ReserveAdd.vue';
import CustomerAdd from './page/CustomerAdd/CustomerAdd.vue';
import ConsultAdd from './page/ConsultAdd/ConsultAdd.vue';
import SummaryRemind from './page/SummaryRemind/SummaryRemind.vue';
import WorkSummary from './page/WorkSummary/WorkSummary.vue';

import Guest from './page/Guest/Guest.vue';
import Customer from './page/Customer/Customer.vue';
import CustomerSearch from './page/CustomerSearch/CustomerSearch.vue';
import DemandDetail from './page/DemandDetail/DemandDetail.vue';
import DemandAdd from './page/DemandAdd/DemandAdd.vue';
import CustomerCureEffect from './page/CustomerCureEffect/CustomerCureEffect.vue';
import CureDetail from './page/CureDetail/CureDetail.vue';
import CureRegister from './page/CureRegister/CureRegister.vue';
import CustomerSituation from './page/CustomerSituation/CustomerSituation.vue';
import SituationAdd from './page/SituationAdd/SituationAdd.vue';
import SituationDetail from './page/SituationDetail/SituationDetail.vue';
import CustomerProposal from './page/CustomerProposal/CustomerProposal.vue';
import ProposalAdd from './page/ProposalAdd/ProposalAdd.vue';
import ProposalDetail from './page/ProposalDetail/ProposalDetail.vue';
import CustomerInformation from './page/CustomerInformation/CustomerInformation.vue';
import CustomerCare from './page/CustomerCare/CustomerCare.vue';
import CareAdd from './page/CareAdd/CareAdd.vue';
import CareRegister from './page/CareRegister/CareRegister.vue';
import CustomerArrears from './page/CustomerArrears/CustomerArrears.vue';
import ArrearsDetail from './page/ArrearsDetail/ArrearsDetail.vue';
import CustomersForLevel from './page/CustomersForLevel/CustomersForLevel.vue';
import PotentialCustomerList from './page/PotentialCustomerList/PotentialCustomerList.vue';
import PotentialCustomer from './page/PotentialCustomer/PotentialCustomer.vue';
import FollowRecordDetail from './page/FollowRecordDetail/FollowRecordDetail.vue';
import FollowRecord from './page/FollowRecord/FollowRecord.vue';

import Approval from './page/Approval/Approval.vue';
import ApplyLeave from './page/ApplyLeave/ApplyLeave.vue';

import My from './page/My/My.vue';
import UserPassword from './page/UserPassword/UserPassword.vue';
import CustomerDemand from './page/CustomerDemand/CustomerDemand.vue';
import Message from './page/Message/Message.vue';
import MySalary from './page/MySalary/MySalary.vue';

Vue.use(Router);

const vueRouter = new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: '/Login'
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login
        },
        {
            path: '/Home',
            // name: 'Home',
            component: Home,
            children: [
                {
                    path: '',
                    name: 'HomeIndex',
                    component: HomeIndex
                },
                {
                    path: 'HomeReturn',
                    name: 'HomeReturn',
                    component: HomeReturn
                },
                {
                    path: 'HomeGuest',
                    name: 'HomeGuest',
                    component: HomeGuest
                },
                {
                    path: 'HomeAchievement',
                    name: 'HomeAchievement',
                    component: HomeAchievement
                },
                {
                    path: 'HomeReserve',
                    name: 'HomeReserve',
                    component: HomeReserve
                },
                {
                    path: 'HomeDebt',
                    name: 'HomeDebt',
                    component: HomeDebt
                },
                {
                    path: 'HomeService',
                    name: 'HomeService',
                    component: HomeService
                }
            ]
        },
        {
            path: '/DebtDetail',
            name: 'DebtDetail',
            component: DebtDetail
        },
        {
            path: '/Home/Achievement',
            name: 'Achievement',
            component: Achievement
        },
        {
            path: '/Home/AchievementDetail',
            name: 'AchievementDetail',
            component: AchievementDetail
        },
        {
            path: '/Home/AchievementChange',
            name: 'AchievementChange',
            component: AchievementChange
        },
        {
            path: '/AchievementAdd',
            name: 'AchievementAdd',
            component: AchievementAdd
        },
        {
            path: '/Home/AchievementApply',
            name: '/Home/AchievementApply',
            component: AchievementApply
        },
        {
            path: '/PlainningListForMonth/PlainningListForMonth',
            name: '/PlainningListForMonth',
            component: PlainningListForMonth
        },
        {
            path: '/SaleDetail/SaleDetail',
            name: '/SaleDetail',
            component: SaleDetail
        },
        {
            path: '/Guest',
            name: 'Guest',
            component: Guest
        },
        {
            path: '/Guest/Customer',
            name: 'Customer',
            component: Customer
        },
        {
            path: '/Guest/CustomerSearch',
            name: 'CustomerSearch',
            component: CustomerSearch
        },
        {
            path: '/Guest/PotentialCustomerList',
            name: 'PotentialCustomerList',
            component: PotentialCustomerList
        },
        {
            path: '/Guest/PotentialCustomer',
            name: 'PotentialCustomer',
            component: PotentialCustomer
        },
        {
            path: '/Guest/CustomersForLevel',
            name: 'CustomersForLevel',
            component: CustomersForLevel
        },
        {
            path: '/Guest/DemandDetail',
            name: 'DemandDetail',
            component: DemandDetail
        },
        {
            path: '/Guest/DemandAdd',
            name: 'DemandAdd',
            component: DemandAdd
        },
        {
            path: '/Guest/CustomerCureEffect',
            name: 'CustomerCureEffect',
            component: CustomerCureEffect
        },
        {
            path: '/Guest/CureDetail',
            name: 'CureDetail',
            component: CureDetail
        },
        {
            path: '/Guest/CureRegister',
            name: 'CureRegister',
            component: CureRegister
        },
        {
            path: '/Guest/CustomerDemand',
            name: 'CustomerDemand',
            component: CustomerDemand
        },
        {
            path: '/Guest/CustomerSituation',
            name: 'CustomerSituation',
            component: CustomerSituation
        },
        {
            path: '/Guest/SituationAdd',
            name: 'SituationAdd',
            component: SituationAdd
        },
        {
            path: '/Guest/SituationDetail',
            name: 'SituationDetail',
            component: SituationDetail
        },
        {
            path: '/Guest/CustomerProposal',
            name: 'CustomerProposal',
            component: CustomerProposal
        },
        {
            path: '/Guest/ProposalAdd',
            name: 'ProposalAdd',
            component: ProposalAdd
        },
        {
            path: '/Guest/ProposalDetail',
            name: 'ProposalDetail',
            component: ProposalDetail
        },
        {
            path: '/Guest/CustomerInformation',
            name: 'CustomerInformation',
            component: CustomerInformation
        },
        {
            path: '/Guest/CustomerCare',
            name: 'CustomerCare',
            component: CustomerCare
        },
        {
            path: '/Guest/CareAdd',
            name: 'CareAdd',
            component: CareAdd
        },
        {
            path: '/Guest/CareRegister',
            name: 'CareRegister',
            component: CareRegister
        },
        {
            path: '/Guest/CustomerArrears',
            name: 'CustomerArrears',
            component: CustomerArrears
        },
        {
            path: '/Guest/ArrearsDetail',
            name: 'ArrearsDetail',
            component: ArrearsDetail
        },
        {
            path: '/Guest/FollowRecordDetail',
            name: 'FollowRecordDetail',
            component: FollowRecordDetail
        },
        {
            path: '/Guest/FollowRecord',
            name: 'FollowRecord',
            component: FollowRecord
        },
        {
            path: '/Approval',
            name: 'Approval',
            component: Approval
        },
        {
            path: '/Approval/ApplyLeave',
            name: 'ApplyLeave',
            component: ApplyLeave
        },
        {
            path: '/Home/Service',
            name: 'Service',
            component: Service
        },
        {
            path: '/Home/ServiceChargeChange',
            name: 'ServiceChargeChange',
            component: ServiceChargeChange
        },
        {
            path: '/Home/ServiceChargeApply',
            name: 'ServiceChargeApply',
            component: ServiceChargeApply
        },
        {
            path: '/Home/ServiceDetail',
            name: 'ServiceDetail',
            component: ServiceDetail
        },
        {
            path: '/Home/ReserveAdd',
            name: 'ReserveAdd',
            component: ReserveAdd
        },
        {
            path: '/Home/CustomerAdd',
            name: 'CustomerAdd',
            component: CustomerAdd
        },
        {
            path: '/Home/ConsultAdd',
            name: 'ConsultAdd',
            component: ConsultAdd
        },
        {
            path: '/Home/GuestFollowRecord',
            name: 'GuestFollowRecord',
            component: GuestFollowRecord
        },
        {
            path: '/Home/ReturnRecord',
            name: 'ReturnRecord',
            component: ReturnRecord
        },
        {
            path: '/Home/ReturnDetail',
            name: 'ReturnDetail',
            component: ReturnDetail
        },
        {
            path: '/Home/SummaryRemind',
            name: 'SummaryRemind',
            component: SummaryRemind
        },
        {
            path: '/Home/WorkSummary',
            name: 'WorkSummary',
            component: WorkSummary
        },
        {
            path: '/My',
            name: 'My',
            component: My
        },
        {
            path: '/My/UserPassword',
            name: 'UserPassword',
            component: UserPassword
        },
        {
            path: '/Message',
            name: 'Message',
            component: Message
        }, {
            path: '/MySalary',
            name: 'MySalary',
            component: MySalary
        }
    ]
});

vueRouter.beforeEach((to, from, next) => {
    if (to.name != 'Login' && !store.state.token) {
        vueRouter.replace({ path: '/Login' })
    }
    next()
});

export default vueRouter