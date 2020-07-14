import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		historyLists:[]	//搜索历史
	},
	mutations:{
		//修改搜索历史数据
		SET_HISTORYLIST(state, history) {
			state.historyLists = history
		}
	},
	actions:{
		//修改搜索历史数据
		 set_history({commit, state}, history) {
			 let list = state.historyLists
			 list.unshift(history)
			 commit('SET_HISTORYLIST', list)
		 }
	}
})

export default store