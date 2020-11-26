//引入接口
import { getBannerList } from '../../util/axios'
const state = {
    bannerList: []
}

const getters = {
    getBannerList(state) {
        return state.bannerList
    }
}

const mutations = {
    REQ_BANNERLIST(state, payload) {
        state.bannerList = payload
    }
}

const actions = {
    getBannerListAction({ commit }) {
        getBannerList({
            istree: true
        })
            .then(res => {
                if (res.data.code == 200) {
                    commit("REQ_BANNERLIST", res.data.list)
                }
            })
            .catch(err => {
                console.log(err, '错误响应')
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}