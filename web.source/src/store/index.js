import Vue from 'vue'
import Vuex from 'vuex'

// import * as actions from './actions'
// import * as getters from './getters'

import system from './modules/system'
import user from './modules/user'
import zone from './modules/zone'
import device from './modules/device'
import qiniu from './modules/qiniu'
import deviceAdvert from './modules/deviceAdvert'
import invitation from './modules/invitation'

import appAdvert from './modules/appAdvert'

import pushNotice from './modules/push'

const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)
Vue.config.debug = debug
Vue.config.warnExpressionErrors = false

export default new Vuex.Store({
  modules: {
    system,
    zone,
    deviceAdvert,
    appAdvert,
    qiniu,
    device,
    user,
    invitation,
    pushNotice
  },
  // actions,
  // getters,
  strict: debug
  // middlewares
})
