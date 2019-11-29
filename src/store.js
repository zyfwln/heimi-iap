import Vue  from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    token           : '',
    user            : undefined,
    employees       : [],
    source          : [],
    swipe           : true,
    summaryOverview : [0, 0, 0, 0],
    interval        : undefined,
    homeDate        : undefined
}

const mutations = {
    UPDATED_TOKEN(state, token) {
        let now = new Date()
        let date = now.setDate(now.getDate() + 7)
        localStorage.setItem('h_m_e_u_date', new Date(date).DateFormat())
        
        localStorage.setItem('h_m_e_u_tk', token)
        state.token = token
    },
    CLEAR_TOKEN(state) {
        localStorage.setItem('h_m_e_u_tk', '')
        localStorage.setItem('h_m_e_u_date', '')
        state.token = ''
    },
    UPDATED_USER(state, user) {
        state.user = user
    },
    UPDATED_EMPLOYEES(state, employees) {
        state.employees = employees
    },
    UPDATED_SOURCE(state, source) {
        state.source = source
    },
    UPDATED_HOME_SWIPE(state, swipe) {
        state.swipe = swipe
    },
    UPDATED_SUMMARY_OVERVIEW(state, summaryOverview) {
        state.summaryOverview = summaryOverview
    },
    UPDATED_INTERVAL(state, interval) {
        state.interval = interval
    },
    UPDATED_HOMEDATE(state, date) {
        state.homeDate = date
    }
};

export default new Vuex.Store({
    state,
    mutations
})