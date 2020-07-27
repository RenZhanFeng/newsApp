<template>
	<view class="comments-box">
		<view class="comment-header">
			<view class="comment-header-logo">
				<image src="../../static/logo.png" mode="aspectFill"></image>
			</view>
			<view class="comment-header-info">
				<view class="title">mingzi</view>
				<view class="">2020</view>
			</view>
		</view>
		<view class="comments-content">
			<view class="">
				这里就是评论内容了
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.comments-box {
		margin: 15px 0;

		.comment-header {
			display: flex;

			.comment-header-logo {
				flex-shrink: 0;
				width: 30px;
				height: 30px;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.comment-header-info {
				display: flex;
				flex-direction: column;
				padding-left: 15px;
				font-size: 12px;
				color: #999;
				line-height: 1;

				.title {
					margin-bottom: 10px;
					font-size: 14px;
					color: #333;
				}
			}
		}

		.comments-content {
			margin-top: 10px;
			font-size: 14px;
			color: #000;
		}
	}
</style>
