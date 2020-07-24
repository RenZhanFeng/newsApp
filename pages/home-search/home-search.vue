<template>
	<view class="home">
		<navbar :isSearch="true" @input="change" v-model="value"></navbar>
		<view class="home-list">
			<view class="label-box" v-if="is_history">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<view class="label-clear">
						<text class="label-clear-text" @click="clear">清空</text>
						<text class="iconfont icon-lajitong"></text>
					</view>
				</view>
				<view class="label-content" v-if="historyLists.length > 0">
					<view class="label-content-item" v-for="(item, index) in historyLists" :key="index" @click="useHistory(item)">
						{{item.name}}
					</view>
				</view>
				<view class="no-data" v-else>
					没有搜索历史
				</view>
			</view>
			<list-scroll v-else class="list-scroll">
				<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
				<view v-if="searchList.length > 0">
					<list-card v-for="item in searchList" :key="item._id" :item="item" @addHistory='addHistory'></list-card>
				</view>
				<view v-if="searchList.length === 0 && loading === false" class="no-data">
					没有搜索到相关数据
				</view>
			</list-scroll>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				is_history: true, //true表示在搜索结果页面
				searchList: [], //搜索结果数据列表
				value: '', //储存搜索栏的数据
				loading: false //是否要显示loading动画
			}
		},
		computed: {
			...mapState(['historyLists'])
		},
		methods: {
			//清除搜索历史数据
			clear(){
				this.$store.dispatch('clearHistory')
				uni.showToast({
					title:'已清空'
				})
			},
			//搜索栏内容变化时触发
			change(value) {
				if (value === '') {
					clearTimeout(this.timer)
					this.searchList = []
					this.is_history = true
					this.mark = false
					return
				}
				//节流
				if (!this.mark) {
					this.mark = true
					this.timer = setTimeout(() => {
						this.getSearch(value)
						this.mark = false
					}, 1000)
				}
			},
			//请求搜索结果
			getSearch(value) {
				this.is_history = false
				this.loading = true
				this.$api.get_search({
					value
				}).then(res => {
					console.log(res)
					const {
						data
					} = res
					this.loading = false
					this.searchList = data
				}).catch(() => {
					this.loading = false
				})
			},
			addHistory() {
				let boo = this.historyLists.some((item) => {
					return item.name === this.value
				})
				if (boo === false) {
					this.$store.dispatch('set_history', {
						name: this.value
					})
				} else {
					return
				}
			},
			useHistory(item) {
				this.value = item.name
				this.getSearch(this.value)
			}
		}
	}
</script>

<style lang="scss">
	@import '../../common/css/icons.css';

	page {
		height: 100%;
		display: flex;
		background: #f5f5f5;
	}

	.home {
		display: flex;
		flex-direction: column;
		flex: 1;

		.home-list {
			.label-box {
				background-color: #fff;
				margin-bottom: 10px;

				.label-header {
					display: flex;
					justify-content: space-between;
					font-size: 14px;
					color: #666;
					padding: 10px 15px;
					border-bottom: 1px #f5f5f5 solid;

					.label-title {
						color: #666;
					}

					.label-clear {
						color: $base-color;
					}
				}

				.label-content {
					display: flex;
					flex-wrap: wrap;
					padding: 5px 15px 15px;
					box-shadow: 0 5px 5px -3px #ccc;

					.label-content-item {
						padding: 2px 10px;
						margin: 6px 5px;
						border: 1px solid #666;
						border-radius: 5px;
						font-size: 14px;
						color: #666;
					}
				}

			}
		}
	}

	.no-data {
		height: 200px;
		line-height: 200px;
		width: 100%;
		text-align: center;
		color: #666;
		font-size: 14px;
		box-shadow: 0 5px 5px -3px #ccc;
	}
</style>
