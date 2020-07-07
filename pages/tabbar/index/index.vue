<template>
	<view class="home">
		<navbar></navbar>
		<tab :tabList="tabList" @tab="tab"></tab>

		<list-scroll>
			<list-card v-for="item in 5"></list-card>
		</list-scroll>

	</view>
</template>

<script>
	//easyCom components/组件名/组件名.vue(组件名和文件名一致就不需要import引用)
	export default {
		data() {
			return {
				tabList: [] //tab的数据
			}
		},
		created() {
			this.getLabel()
		},
		methods: {
			getLabel() {
				this.$api.get_label({
					name: 'get_label'
				}).then((res) => {
					this.tabList = res.data
				})
			},
			tab(item, index) {
				console.log(item, index)
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;

		.home {
			display: flex;
			flex-direction: column;
			flex: 1;
		}
	}
</style>
