import Api from '../../api'

const DEVICE_LIST = 'DEVICE_LIST'

const state = {
    page: 1,
    pagesize: 99,
    total: 0,
    list: []
}

const actions = {

    getDeviceList({ commit, state }, data = {}) {
        return Api.device.list(data).then(response => {
            // commit(DEVICE_LIST, response.list || [])
            return response && response.list.slice() || []
        }, error => {

        })
    },
    batchGetDeviceInfo({ commit, state }, data) {
        return Api.device.batch(data)
    }
}

const mutations = {
    [DEVICE_LIST](state, list) {
        state.list = list
    }
}

export default {
    state,
    mutations,
    actions
}
