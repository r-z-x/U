//引入商品列表接口
import { getGoodsList, getGoodsCount } from "../../util/axios";

//state
const state = {
    goodsList: [],
    size: 2, //每个组件渲染的条数
    page: 1,
    total: 0 //总条数
};

const getters = {
    getGoodsList() {
        return state.goodsList;
    },
    //导出总条数
    getGoodsCount() {
        return state.total;
    },
    //导出总条数
    getGoodsSize() {
        return state.size;
    }
};

//mutations
const mutations = {
    //修改state的GoodsList
    REQ_GOODSLIST(state, payload) {
        state.goodsList = payload;
    },
    //修改state中的total总条数
    REQ_GOODSCOUNT(state, payload) {
        state.total = payload;
    },
    REQ_PAGE(state, payload) {
        state.page = payload
    }
};

const actions = {
    getGoodsAction(context) {
        console.log(context);
        getGoodsList({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            if (res.data.code == 200) {
                let data = res.data.list ? res.data.list : []
                context.commit("REQ_GOODSLIST", data);
                if (context.state.page != 1 && data.length == 0) {
                    context.dispatch('changePageAction',context.state.page-1)
                    this.getGoodsAction()
                }

            }
        });
    },

    getCountAction({ commit }) {
        getGoodsCount().then(res => {
            if (res.data.code == 200) {
                commit("REQ_GOODSCOUNT", res.data.list[0].total);
            }
        });
    },
    //封装一个修改page的action
    changePageAction(context, payload) {
        context.commit('REQ_PAGE', payload)
        context.dispatch('getGoodsAction')
    }
};
export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
};
