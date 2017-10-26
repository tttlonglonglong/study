import axios from 'axios'

import store from '../store'

const API_ROOT = window.API_ROOT


const api = axios.create({
    baseURL: API_ROOT,
    timeout: 60000
})
let timeCount = 0
let timer = null
api.interceptors.request.use((config) => {
    timeCount += 1

    timer && clearTimeout(timer)

    timer = setTimeout(() => {
        timeCount = 0
        store.dispatch('hideLoading')
    }, 60000)

    store.dispatch('showLoading')
    return config;
}, (error) => {
    return Promise.reject(error)
});

api.interceptors.response.use((response) => {
    if (timeCount > 0) {
        timeCount -= 1
    }

    timeCount || store.dispatch('hideLoading')
    // if (response.data && response.data.code && response.data.code == -999 && !(/login/ig.test(response.config.url))) {
    //     window.location.href = window.location.href.replace(window.location.hash, '#/login')
    //     return false
    // }

    return response && response.data || response
}, (error) => {

    timeCount = 0

    store.dispatch('hideLoading')
    // store.dispatch('showMessage', '数据请求出错，请稍后再试或者联系系统管理员')
    // return Promise.reject(error)
})


export default {
    qiniu: {
        token() {
            return api.get(`/qiniuToken`).then(response => {
                return response
            })
        }
    },
    zone: {
        list(data = {}) {
            return api.get(`/zone`, { params: data }).then(response => {
                return response
            })
        },
        get(data) {
            return api.get(`/zone/${data.zone_id}`).then(response => {
                return response.data
            })
        },
        post(data) {
            return api.post(`/zone`, data).then(response => {
                return response.data
            })
        },
        put(data) {
            return api.put(`/zone/${data.zone_id}`, data).then(response => {
                return response.data
            })
        },
        delete(data) {
            return api.delete(`/zone/${data.zone_id}`).then(response => {
                return response.data
            })
        },
        batch(data = {}) {
            return api.get(`/zone/batch`, { params: data }).then(response => {
                return response
            }, error => {
                console.log('error', error)
            })
        }
    },
    device: {
        list(data = {}) {
            return api.get(`/device`, { params: data }).then(response => {
                return response
            }, error => {
                console.log('error', error)
            })
        },
        batch(data = {}) {
            return api.get(`/device/batch`, { params: data }).then(response => {
                return response
            }, error => {
                console.log('error', error)
            })
        }

    },
    deviceAdvert: {
        list(data = {}) {
            return api.get(`/deviceAd`, { params: data }).then(response => {
                return response
            })
        },
        get(data) {
            return api.get(`/deviceAd/${data.ad_id}`, { params: data }).then(response => {
                return response
            })
        },
        post(data) {
            return api.post(`/deviceAd`, data).then(response => {
                return response
            })
        },

        put(data) {
            return api.put(`/deviceAd/${data.ad_id}`, data).then(response => {
                return response
            })
        },
        patch(data) {
            return api.patch(`/deviceAd/${data.ad_id}`, data).then(response => {
                return response
            })
        },
        delete(data) {
            return api.delete(`/deviceAd/${data.ad_id}`).then(response => {
                return response
            })
        },
        batch(data) {
            return api.post(`/deviceAd/batch`, data)
        },
        export () {
            return window.open(API_ROOT + '/export/deviceAd')
        }
    },
    appAdvert: {
        list(data = {}) {
            return api.get(`/appAd`, { params: data }).then(response => {
                return response
            })
        },
        get(data) {
            return api.get(`/appAd/${data.ad_id}`, { params: data }).then(response => {
                return response
            })
        },
        post(data) {
            return api.post(`/appAd`, data).then(response => {
                return response
            })
        },
        put(data) {
            return api.put(`/appAd/${data.ad_id}`, data).then(response => {
                return response
            })
        },
        delete(data) {
            return api.delete(`/appAd/${data.ad_id}`).then(response => {
                return response
            })
        },
        batch(data) {
            return api.post(`/appAd/batch`, data)
        },
        export (type) {
            return window.open(API_ROOT + '/export/appAd?ad_type=' + type)
        }
    },
    user: {
        login(data = {}) {
            return api.post(`/login`, data).then(response => {
                return response
            })
        },
        logout() {
            return api.delete(`/login`).then(response => {
                return response
            })
        }
    },
    invitation: {
        toggle(data = {}) {
            return api.put(`/openCode`, data)
        },
        get(data = {}) {
            return api.get(`/openCode`)
        }
    },
    noticePush: {
        list(data = {}) { //list
            return api.get(`/push`, { params: data }).then(response => {
                return response
            })
        },
        get(data) { //
            return api.get(`/push/${data.notice_id}`, { params: data }).then(response => {
                return response
            })
        },
        post(data) { //create
            return api.post(`/push`, data).then(response => {
                return response
            })
        },
        put(data) { //edit
            return api.put(`/push/${data.notice_id}`, data).then(response => {
                return response
            })
        },
        delete(data) { //delete
            return api.delete(`/push/${data.notice_id}`).then(response => {
                return response
            })
        },
        batch(data) { //batch
            return api.post(`/push/batch`, data)
        },
        // export(){
        //     return window.open(API_ROOT + '/export/appAd' )
        // }
    },
}