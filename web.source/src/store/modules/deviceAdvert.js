import Api from '../../api'
import moment from 'moment'

const DEVICE_ADVERT_LIST = 'DEVICE_ADVERT_LIST'
const DEVICE_ADVERT_INFO = 'DEVICE_ADVERT_INFO'

const state = {
    page: 1,
    pagesize: 20,
    total: 0,
    list: [],
    info: {}
}

const actions = {
    getDeviceAdvertList({ commit }, data) {
        data.perPage = data.pagesize ? data.pagesize : state.pagesize
        data.page = data.page ? data.page : state.page
        Api.deviceAdvert.list(data).then(response => {
            commit(DEVICE_ADVERT_LIST, response)
            return response
        })
    },
    getDeviceAdvert({ commit }, data = {}) {
        return Api.deviceAdvert.get(data).then(response => {
            commit(DEVICE_ADVERT_INFO, response)
            return response
        })
    },
    addDeviceAdvert({ commit, dispatch }, data = {}) {
        return Api.deviceAdvert.post(data).then(response => {
            dispatch('getDeviceAdvertList', response)
            return response
        })
    },
    editDeviceAdvert({ commit, dispatch }, data = {}) {
        return Api.deviceAdvert.put(data).then(response => {
            dispatch('getDeviceAdvertList', response)
            return response
        })
    },
    modifyDeviceAdvert({ commit, dispatch }, data = {}) {
        return Api.deviceAdvert.patch(data).then(response => {
            dispatch(DEVICE_ADVERT_LIST, response)
            return response
        })
    },
    deleteDeviceAdvert({ commit, dispatch }, data = {}) {
        return Api.deviceAdvert.delete(data).then(response => {
            dispatch('getDeviceAdvertList', response)
            return response
        })
    },
    batchDeleteDeviceAdvert({ commit, dispatch }, ad_ids = []) {
        return Api.deviceAdvert.batch({
            delete: ad_ids
        }).then(response => {
            dispatch(DEVICE_ADVERT_LIST, response.data)
            return response
        })
    },
    exportDeviceAdvertData() {
        return Api.deviceAdvert.export()
    }

}

const mutations = {
    [DEVICE_ADVERT_LIST](state, res) {
        let now = moment().unix()
        res.data.map(item => {
            now > item.ad_end && (item.ad_publish = 'O') // 已过期  over
            return item
        })
        state.list = res.data
        state.page = parseInt(res.current_page)
        state.pagesize = parseInt(res.per_page)
        state.total = parseInt(res.total)
    },
    [DEVICE_ADVERT_INFO](state, data) {
        state.info = data
    }
}

export default {
    state,
    mutations,
    actions
}
