/**
 * Created by Guandeqin on 2017/4/20.
 */

import Api from '../../api'

const TOGGLE = 'TOGGLE'

const state = {
    active: false
}

const actions = {
    setActiveCode({ commit }, data) {
        return Api.invitation.toggle(data).then(response => {
            commit(TOGGLE, response)
        })
    },
    getActiveCode({ commit }) {
        return Api.invitation.get().then(response => {
            commit(TOGGLE, response)
        })
    }
}

const mutations = {
    [TOGGLE](state, data) {
        state.active = !!data.status
    }
}

export default {
    state,
    mutations,
    actions
}
