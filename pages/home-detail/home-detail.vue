<template>
	<view class="detail">
		<view class="detail-title">
			{{formData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-header-logo">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header-content">
				<view class="detail-header-content-title">
					{{formData.author.author_name}}
				</view>
				<view class="detail-header-content-info">
					<text>{{formData.create_time}}</text>
					<text>{{formData.browse_count}} 浏览</text>
					<text>{{formData.thumbs_up_count}} 赞</text>
				</view>
			</view>
			<view class="detail-header-content-concern" v-if="false">
				已关注
			</view>
		</view>
		<view class="detail-content">
			详情数据
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom-input">
				<text>谈谈你的看法</text>
				<text class="iconfont icon-bianji"></text>
			</view>
			<view class="detail-bottom-icons">
				<view class="detail-bottom-iconsBox">
					<text class="iconfont icon-xinxi"></text>
					<text class="iconfont icon-unlike"></text>
					<text class="iconfont icon-dianzan-copy"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData:{}
			}
		},
		onLoad(query) {
			//获取到首页连接中的参数
			this.formData = JSON.parse(query.params)
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	@import '../../common/css/icons.css';

	.detail {
		padding: 15px 0;
		padding-bottom: 54px;
	}

	.detail-title {
		padding: 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}

	.detail-header {
		display: flex;
		align-items: center;
		margin-top: 10px;
		padding: 0 15px;

		.detail-header-logo {
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.detail-header-content {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;
			padding-left: 10px;

			.detail-header-content-title {
				font-size: 14px;
				color: #333;
			}

			.detail-header-content-info {
				color: #999;

				text {
					margin-right: 10px;
				}
			}
		}
	}

	.detail-content {
		height: 1000px;
		border: 1px solid red;
	}

	.detail-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 44px;
		border-top: 1px #f5f5f5 solid;
		background-color: #fff;
		box-sizing: border-box;

		.detail-bottom-input {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 30px;
			padding: 0 10px;
			margin-left: 10px;
			border: 1px solid #ddd;
			border-radius: 5px;

			text {
				font-size: 14px;
				color: #999;
			}

			.icon-bianji {
				color: $base-color;
			}
		}

		.detail-bottom-icons {
			display: flex;
			flex-shrink: 0;
			padding: 0 10px;

			.detail-bottom-iconsBox {
				position: relative;
				display: flex;
				justify-content: space-evenly;
				width: 125px;

				text {
					font-size: 20px;
					color: $base-color;
				}
			}
		}
	}
</style>
