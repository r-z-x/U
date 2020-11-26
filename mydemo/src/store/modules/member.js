import { getMemberList } from '../../util/axios'

const state = {
    memberList: []
}

const getters = {
    getMemberList() {
        return state.memberList
    }
}

const mutations = {
    REQ_MEMBERLIST(state, payload) {
        state.memberList = payload
    }
}

const actions = {
    getMemberListAction({ commit }) {
        getMemberList().then(res => {
            if (res.data.code == 200) {
                commit('REQ_MEMBERLIST', res.data.list)
            }
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