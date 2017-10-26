import Api from '../../api'
import moment from 'moment'

const PUSH_LIST = 'PUSH_LIST'
const PUSH_INFO = 'PUSH_INFO'


const state = {
    page:1,
    pagesize: 20,
    total:0,
    list:[],
    info:{},
    // adtype: '1'
}

const actions = {
  getAppPushList({ commit } , data = {}) {//list
      data.perPage = data.pagesize ? data.pagesize : state.pagesize
      data.page = data.page ? data.page : state.page
      return Api.noticePush.list( data ).then(response=>{
          commit(PUSH_LIST,response)
          return response
      })
  },
  getAppPush({ commit } , data = {}) {//
      return Api.noticePush.get( data ).then(response=>{
          commit(PUSH_INFO,response)
          return response
      })
  },
  addAppPush({ commit,dispatch } , data = {}) {//创建
      return Api.noticePush.post( data ).then(response=>{
          dispatch('getAppPushtList',response)
          return response
      })
  },
  editAppPush({ commit,dispatch } , data = {}) {//edit
      return Api.noticePush.put( data ).then(response=>{
          dispatch('getAppPushList')
          return response
      })
  },
  modifyAppPush({ commit,dispatch } , data = {}) {//
      return Api.noticePush.patch( data ).then(response=>{
          dispatch('getAppPushList')
          return response
      })
  },
  deleteAppPush({ commit,dispatch } , data = {}) {//删除
      return Api.noticePush.delete( data ).then(response=>{
          dispatch('getAppPushList',response)
          return response
      })
  },
  batchDeleteAppPush({ commit,dispatch } , id = []) {//批量删除
      return Api.noticePush.batch({
        delete: id
      }).then(response=>{
          dispatch('getAppPushList',response)
          return response
      })
  },
    exportAppPushData(){
        return Api.noticePush.export()
    }
}

const mutations = {
  [PUSH_LIST](state, res){
    let now = moment().unix()
    res.data.map(item=>{
      now > item.notice_publish && (item.notice_status = 'O') // 已过期  over
      return item
    })
    state.list = res.data
    state.page = parseInt(res.current_page)
    state.pagesize = parseInt(res.per_page)
    state.total = parseInt(res.total)
  },
  [PUSH_INFO](state,data){
    state.info = data
  },
  // [SET_AD_TYPE](state, adtype){
  //   state.adtype = adtype
  // }
}

export default {
  state,
  mutations,
  actions
}