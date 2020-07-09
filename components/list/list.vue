<template>
	<swiper class="home" @change="change" :current="activeIndex">
		<swiper-item class="swiper-item" v-for="(item, index) in tab" :key="item.id">
			<list-item :list="listCatchData[index]" @loadMore="loadMore"></list-item>
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
				page: 1,
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
		created() {

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

				this.$api.get_list({
					name: this.tab[current].name,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					console.log(res)
					const {
						data
					} = res
					// this.list = data
					// this.listCatchData[current] = data
					this.$set(this.listCatchData, current, data)
					console.log(this.listCatchData)
				})
			},
			loadMore() {
				this.page++;
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
