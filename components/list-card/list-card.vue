<template>
	<view>
		<!-- 基础卡片 -->
		<view class="listCard">
			<view class="listCard-image">
				<image src="../../static/logo.png" mode="aspectFill"></image>
			</view>
			<view class="listCard-content">
				<view class="listCard-content-title">
					<text>开发框架大萨达所大所大多撒大所开发框架大萨达所大所大多撒大所大所大所多撒多撒大所大所大大所大所多撒多撒大所大所大</text>
				</view>
				<view class="listCard-content-des">
					<view class="listCard-content-des-label">
						<view class="listCard-content-des-label-item">前端</view>
						<view class="listCard-content-des-label-item">框架</view>
					</view>
					<view class="listCard-content-des-browse">120浏览</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.listCard {
		display: flex;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, .1);
		box-sizing: border-box;

		.listCard-image {
			flex-shrink: 0;
			width: 60px;
			height: 60px;
			border-radius: 5px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.listCard-content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 10px;
			width: 100%;

			.listCard-content-title {
				color: #333;
				font-size: 14px;
				font-weight: 400;
				line-height: 1.2;
				text{
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp:2;
					-webkit-box-orient:vertical;
				}
			}

			.listCard-content-des {
				display: flex;
				justify-content: space-between;
				font-size: 12px;

				.listCard-content-des-label {
					display: flex;

					.listCard-content-des-label-item {
						padding: 0 5px;
						margin-right: 5px;
						border-radius: 4px;
						color: $base-color;
						border: 1px $base-color solid
					}
				}
				.listCard-content-des-browse{
					color: #999;
					line-height: 1.5;
				}
			}
		}
	}
</style>
