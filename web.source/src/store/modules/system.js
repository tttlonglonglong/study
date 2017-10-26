import Api from '../../api'

const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

const TOGGLE_LOADING = 'TOGGLE_LOADING'
const SHOW_LOADING = 'SHOW_LOADING'
const HIDE_LOADING = 'HIDE_LOADING'

const SHOW_MESSAGE = 'SHOW_MESSAGE'
const HIDE_MESSAGE = 'HIDE_MESSAGE'


const ACTIVE_MENU = 'ACTIVE_MENU'

const state = {
    sidebar: false,
    loading: false,
    message:{
      open:false,
      content:''
    },
    active: '99'
}

const actions = {
  toggleSidebar({ commit }) {
		commit(TOGGLE_SIDEBAR)
  },
  toggleLoading({ commit }) {
    commit(TOGGLE_LOADING)
  },
  showLoading({ commit }) {
    commit(SHOW_LOADING)
  },
  hideLoading({ commit }) {
    commit(HIDE_LOADING)
  },
  showMessage({ commit }, content){
    commit(SHOW_MESSAGE, content)
  },
  hideMessage({ commit }){
    commit(HIDE_MESSAGE)
  },
  setActiveMenu({ commit },active){
    commit(ACTIVE_MENU,active)
  }
}

const mutations = {
  [TOGGLE_SIDEBAR](state, res){
    state.sidebar = !state.sidebar
  },
  [TOGGLE_SIDEBAR](state, res){
    state.loading = !state.loading
  },
  [SHOW_LOADING](state, res){
    state.loading = true
  },
  [HIDE_LOADING](state, res){
    state.loading = false
  },
  [SHOW_MESSAGE](state, res){
    state.message.open = true
    state.message.content = res
  },
  [HIDE_MESSAGE](state, res){
    state.message.open = false
  },
  [ACTIVE_MENU](state, active){
    state.active = active
  }
}

export default {
  state,
  mutations,
  actions
}
