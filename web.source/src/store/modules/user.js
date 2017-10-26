import Api from '../../api'
import router from '../../router'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

const getAccessToken = () => {
    const matches = document.cookie.match(/access_token=(\w+);*/)

    if (matches && matches.length === 2) {
        return matches.pop()
    } else {
        return null
    }
}


const state = { //getAccessToken()
    access_token: getAccessToken(),
    info: localStorage.getItem('userinfo')
}



const actions = {
    login({ commit }, data) {
        return Api.user.login(data).then(response => {
            response.info = data
            commit(LOGIN, response)
            return response
        })
    },
    logout({ commit }, tokenOutofdate) {
        if (tokenOutofdate) {
            commit(LOGOUT)
            return Promise.resolve(true)
        } else {
            commit(LOGOUT)
            return Api.user.logout()


        }
    }
}

const mutations = {
    [LOGIN](state, data) {
        state.access_token = getAccessToken();
        state.info = data.info
    },
    [LOGOUT](state) {
        state.access_token = ''
        state.info = {}
        router.push({ path: '/login' })
    }
}

export default {
    state,
    mutations,
    actions
}