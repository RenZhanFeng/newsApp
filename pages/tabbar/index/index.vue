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
		onLoad(){
			//自定义事件，修改标签的时候通知首页更新标签
			uni.$on('labelChange',() => {
				this.tabList = []
				this.tabIndex = 0
				this.activeIndex = 0
				this.getLabel()
			})
		},
		methods: {
			getLabel() {
				this.$api.get_label().then((res) => {
					//添加“推荐”分类
					res.data.unshift({name:'推荐'})
					this.tabList = res.data
				})
			},
			tab(item, index) {
				this.activeIndex = item.index
			},
			change(current){
				this.tabIndex = current
				this.activeIndex = current
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
