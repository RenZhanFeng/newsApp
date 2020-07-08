<template>
	<swiper class="home" @change="change" :current="activeIndex">
		<swiper-item class="swiper-item" v-for="(item, index) in tab" :key="item.id">
			<list-item :list="list"></list-item>
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
				list: []
			};
		},
		components: {
			listItem
		},
		created() {
			this.getList('前端开发')
		},
		methods: {
			change(e) {
				const {current} = e.detail
				this.getList(this.tab[current].name)
				this.$emit("change", current)
			},
			getList(name) {
				this.$api.get_list(name).then(res => {
					const {data} = res
					this.list = data
				})
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
