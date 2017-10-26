import Api from '../../api'

const ZONE_LIST = 'ZONE_LIST'
const ZONE_OBJECT = 'ZONE_OBJECT'
const ZONE_INFO = 'ZONE_INFO'

const state = {
    page: 1,
    pagesize: 99,
    total: 0,
    list: [],
    info: {},
    zones: [], // 小区列表
    ozones: {}
}

const actions = {
    getZoneList({ commit, state }, data = {}) {
        if( data.zone_pid && state.ozones[ data.zone_pid ] && !data.zone_level ){
          return  new Promise((resolve, reject)=>{
            resolve(state.ozones[ data.zone_pid ])
          })
        }else{
          return Api.zone.list(data).then(response => {
              // commit(ZONE_OBJECT, {
              //   list: response.list || [],
              //   pid: data.zone_pid || 0
              // })
              return response && response.list.slice() || []
          }, error => {

          })
        }
    },
    getZone({ commit }, data = {}) {
        return Api.zone.get(data).then(response => {
            commit(ZONE_INFO, response)
            return response
        })
    },
    addZone({ commit, dispatch }, data = {}) {
        return Api.zone.post(data).then(response => {
            dispatch(ZONE_LIST, response.data)
            return response
        })
    },
    editZone({ commit, dispatch }, data = {}) {
        return Api.zone.put(data).then(response => {
            dispatch(ZONE_LIST, response.data)
            return response
        })
    },
    deleteZone({ commit, dispatch }, data = {}) {
        return Api.zone.delete(data).then(response => {
            dispatch(ZONE_LIST, response.data)
            return response
        })
    },
    batchGetZoneInfo({ commit, state }, data ) {
      return Api.zone.batch(data)
    }
}

const mutations = {
    [ZONE_OBJECT](state, {list, pid}) {
        state.ozones[pid] = list

        // if ('zone_pid_path' in data) {
        //     let pids = data.zone_pid_path.split('-')
        //     let fn = (pids, list) => {
        //         let id = pids.shift()
        //         let item = list.find(item => item.zone_id == id)
        //         if (pids.length) {
        //             item && item.list && fn(pids, item.list)
        //         } else {
        //             item.list = list
        //         }
        //     }
        //     fn(pids, state.list)
        // } else {
        //     list.map(item => {
        //         item.list = []
        //         return item
        //     })
        //     state.list = list
        // }
    },
    [ZONE_INFO](state, data) {
        state.info = data
    }
}

export default {
    state,
    mutations,
    actions
}
