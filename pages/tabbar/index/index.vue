<template>
	<view class="">
		<navbar></navbar>
		<tab :tabList="tabList"></tab>
		<view v-for="(item,index) in 100" :key='index'>
			{{item}}
		</view>
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
				console.log(this.$api)
				this.$api.get_label({
					name: 'get_label'
				}).then((res) => {
					this.tabList = res.data
				})
			}
		}
	}
</script>

<style>

</style>
