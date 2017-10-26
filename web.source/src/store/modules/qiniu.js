import Api from '../../api'

const QINIU_TOKEN = 'QINIU_TOKEN'

const state = {
    token:'',
    domain:''
}

const actions = {
  getQiniuToken({ commit }) {
      Api.qiniu.token().then(response=>{
          commit(QINIU_TOKEN,response)
      })
  }
}

const mutations = {
  [QINIU_TOKEN](state,data){
    state.token = data.token
    state.domain = data.url
  }
}

export default {
  state,
  mutations,
  actions
}