<template>
	<swiper class="home" @change="change" :current="activeIndex">
		<swiper-item class="swiper-item" v-for="(item, index) in tab" :key="item.id">
			<list-item :list="listCatchData[index]" :load="load[index]" @loadMore="loadMore"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		props: {
			tab: {
				type: Array,
				default () {
					return []
				}
			},
			activeIndex: {
				type: Number,
				default () {
					return 0
				}
			}
		},
		data() {
			return {
				list: [],
				listCatchData: {},
				load:{},
				pageSize: 10
			}
		},
		components: {
			listItem
		},
		watch: {
			tab(newVal) {
				if (newVal.length === 0) {
					return
				} else {
					this.getList(this.activeIndex)
				}
			}
		},
		methods: {
			change(e) {
				const {
					current
				} = e.detail
				this.$emit("change", current)
				//当数据不存在或者长度是0的情况下才去重新请求数据
				if (!this.listCatchData[current] || this.listCatchData[current].length === 0) {
					this.getList(current)
				}
			},
			getList(current) {
				if(!this.load[current]){
					this.load[current] = {
						page:1,
						loading:'loading'
					}
				}
				this.$api.get_list({
					name: this.tab[current].name,
					page: this.load[current].page,
					pageSize: this.pageSize
				}).then(res => {
					console.log(res)
					const {
						data
					} = res
					if(data.length === 0){
						let oldLoad = {}
						oldLoad.loading = 'noMore'
						oldLoad.page = this.load[current].page
						this.$set(this.load,current,oldLoad)
						//强制渲染页面
						this.$forceUpdate()
						return
					}
					let oldList = this.listCatchData[current] || []
					oldList.push(...data)
					//懒加载
					this.$set(this.listCatchData, current, oldList)
				})
			},
			loadMore() {
				if(this.load[this.activeIndex].loading === 'noMore'){
					return
				}
				this.load[this.activeIndex].page++;
				this.getList(this.activeIndex)
			}
		}
	}
</script>

<style lang="scss">
	.home {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;
		}
	}
</style>
