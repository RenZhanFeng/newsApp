<template>
	<view class="home">
		<navbar></navbar>
		<tab :tabList="tabList" :tabIndex="tabIndex" @tab="tab"></tab>
		<view class="home-list">
			<list :tab="tabList" :activeIndex="activeIndex" @change="change"></list>
		</view>
	</view>
</template>

<script>
	//easyCom components/组件名/组件名.vue(组件名和文件名一致就不需要import引用)
	export default {
		data() {
			return {
				tabList: [], //tab的数据
				tabIndex:0,
				activeIndex:0
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
				this.activeIndex = item.index
			},
			change(current){
				this.tabIndex = current
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
			// overflow: hidden;
			.home-list{
				flex:1;
				box-sizing: border-box;
			}
		}
	}
</style>
