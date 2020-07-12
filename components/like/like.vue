<template>
	<view class="like" @click.stop="likeTap">
		<text class="iconfont" :class="{'icon-like':like,'icon-unlike':!like}"></text>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				like: false
			};
		},
		watch:{
			item(newVal){
				this.like = this.item.is_like
			}
		},
		created(){
			this.like = this.item.is_like
		},
		methods: {
			likeTap() {
				this.like = !this.like
				this.setUpdateLikes()
			},
			setUpdateLikes() {
				uni.showLoading()
				this.$api.update_like({
					user_id: '5f01a335e9159b00010797e1',
					article_id: this.item._id
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title:this.like?'收藏成功':'取消收藏',
						icon:'none'
					})
					console.log(res)
				}).catch(()=>{
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../common/css/icons.css';

	.like {
		position: absolute;
		top: 0;
		right: 0;

		.icon-like,
		.icon-unlike {
			font-size: 16px;
			color: $base-color;
		}
	}
</style>
