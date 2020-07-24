import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		historyLists: uni.getStorageSync("__history") || [] //搜索历史
	},
	mutations: {
		//修改搜索历史数据
		SET_HISTORYLIST(state, history) {
			state.historyLists = history
		},
		CLEAR_HISTORY(state){
			state.historyLists = []
		}
	},
	actions: {
		//修改搜索历史数据
		set_history({commit,state}, history) {
			let list = state.historyLists
			list.unshift(history)
			uni.setStorageSync("__history", list)
			commit('SET_HISTORYLIST', list)
		},
		//清空搜索历史数据
		clearHistory({commit,state}){
			uni.removeStorageSync("__history")
			commit('CLEAR_HISTORY')
		}
	}
})

export default store
