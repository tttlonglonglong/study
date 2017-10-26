import Api from '../../api'
import moment from 'moment'

const APP_ADVERT_LIST = 'APP_ADVERT_LIST'
const APP_ADVERT_INFO = 'APP_ADVERT_INFO'
const SET_AD_TYPE = 'SET_AD_TYPE'

const state = {
    page:1,
    pagesize: 20,
    total:0,
    list:[],
    info:{},
    adtype: '1'
}

const actions = {
  getAppAdvertList({ commit } , data = {}) {
      data.perPage = data.pagesize ? data.pagesize : state.pagesize
      data.page = data.page ? data.page : state.page
      data.ad_type = data.ad_type ? data.ad_type : state.adtype
      return Api.appAdvert.list( data ).then(response=>{
          commit(APP_ADVERT_LIST,response)
          return response
      })
  },
  getAppAdvert({ commit } , data = {}) {
      return Api.appAdvert.get( data ).then(response=>{
          commit(APP_ADVERT_INFO,response)
          return response
      })
  },
  addAppAdvert({ commit,dispatch } , data = {}) {
      return Api.appAdvert.post( data ).then(response=>{
          dispatch('getAppAdvertList',response)
          return response
      })
  },
  editAppAdvert({ commit,dispatch } , data = {}) {
      return Api.appAdvert.put( data ).then(response=>{
          dispatch('getAppAdvertList')
          return response
      })
  },
  modifyAppAdvert({ commit,dispatch } , data = {}) {
      return Api.appAdvert.patch( data ).then(response=>{
          dispatch('getAppAdvertList')
          return response
      })
  },
  deleteAppAdvert({ commit,dispatch } , data = {}) {
      return Api.appAdvert.delete( data ).then(response=>{
          dispatch('getAppAdvertList',response)
          return response
      })
  },
  batchDeleteAppAdvert({ commit,dispatch } , ad_ids = []) {
      return Api.appAdvert.batch({
        delete: ad_ids
      }).then(response=>{
          dispatch('getAppAdvertList',response)
          return response
      })
  },
    exportAppAdvertData(){
        return Api.appAdvert.export(state.adtype)
    }
}

const mutations = {
  [APP_ADVERT_LIST](state, res){
    let now = moment().unix()
    res.data.map(item=>{
      now > item.ad_end && (item.ad_publish = 'O') // 已过期  over
      return item
    })
    state.list = res.data
    state.page = parseInt(res.current_page)
    state.pagesize = parseInt(res.per_page)
    state.total = parseInt(res.total)
  },
  [APP_ADVERT_INFO](state,data){
    state.info = data
  },
  [SET_AD_TYPE](state, adtype){
    state.adtype = adtype
  }
}

export default {
  state,
  mutations,
  actions
}