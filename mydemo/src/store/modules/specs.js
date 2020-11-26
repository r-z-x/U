//引入角色接口
import { getSpecsList, getSpecsCount } from "../../util/axios";

const state = {
  specsList: [],
  newspecsList: [],
  size: 2, //每个组件渲染的条数
  page: 1, //页码
  total: 0 //总条数
};
const getters = {
  getSpecsList() {
    return state.specsList;
  },
  getNewSpecsList() {
    return state.newspecsList;
  },
  getSpecsCount() {
    return state.total;
  },
  getSpecsSize() {
    return state.size;
  }
};

const mutations = {
  REQ_SPECSLIST(state, payload) {
    state.specsList = payload;
  },
  REQ_NEWSPECSLIST(state, payload) {
    state.newspecsList = payload;
  },
  REQ_SPECSCOUNT(state, payload) {
    state.total = payload;
  },
  REQ_PAGE(state,payload){
    state.page = payload
  }
};


const actions = {
  getSpecsAction(context) {
    getSpecsList({
      size: context.state.size,
      page: context.state.page
    }).then(res => {
      if (res.data.code == 200) {
        context.commit("REQ_SPECSLIST", res.data.list);
      }
    });
  },

  getNewSpecsAction(context) {
    getSpecsList().then(res => {
      if (res.data.code == 200) {
        context.commit("REQ_NEWSPECSLIST", res.data.list);
      }
    });
  },
  getCountAction({ commit }) {
    getSpecsCount().then(res => {
      if (res.data.code == 200) {
        commit("REQ_SPECSCOUNT", res.data.list[0].total);
      }
    });
  },
  changePageAction(context,payload){
    context.commit('REQ_PAGE',payload)
    context.dispatch('getSpecsAction')
  }
};

//导出
export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
