<template>
	<view class="">
		<navbar></navbar>
		<tab></tab>
		<view v-for="item in 100">
			{{item}}
		</view>
	</view>
</template>

<script>
	//easyCom components/组件名/组件名.vue(组件名和文件名一致就不需要import引用)
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	
</style>
