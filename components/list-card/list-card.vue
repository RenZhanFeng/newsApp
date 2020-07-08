<template>
	<view>
		<!-- 基础模式 -->
		<view v-if="item.mode === 'base'" class="listCard">
			<view class="listCard-image">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="listCard-content">
				<view class="listCard-content-title">
					<text>{{item.title}}</text>
				</view>
				<view class="listCard-content-des">
					<view class="listCard-content-des-label">
						<view class="listCard-content-des-label-item">{{item.classify}}</view>
					</view>
					<view class="listCard-content-des-browse">{{item.browse_count}}浏览</view>
				</view>
			</view>
		</view>

		<!-- 多图模式 -->
		<view v-if="item.mode === 'column'" class="listCard mode-column">
			<view class=" listCard-content">
				<view class="listCard-content-title">
					<text>{{item.title}}</text>
				</view>
				<view class="listCard-image">
					<view class="listCard-image-item" v-for="(item, index) in item.cover" :key="item._id" v-if="index < 3">
						<image :src="item" mode="aspectFill"></image>
					</view>
				</view>
				<view class="listCard-content-des">
					<view class="listCard-content-des-label">
						<view class="listCard-content-des-label-item">{{item.classify}}</view>
					</view>
					<view class="listCard-content-des-browse">{{item.browse_count}}浏览</view>
				</view>
			</view>
		</view>

		<!-- 大图模式 -->
		<view v-if="item.mode === 'image'" class="listCard mode-image">
			<view class=" listCard-image">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="listCard-content">
				<view class="listCard-content-title">
					<text>{{item.title}}</text>
				</view>
				<view class="listCard-content-des">
					<view class="listCard-content-des-label">
						<view class="listCard-content-des-label-item">{{item.classify}}</view>
					</view>
					<view class="listCard-content-des-browse">{{item.browse_count}}浏览</view>
				</view>
			</view>
		</view>


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

				text {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
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

				.listCard-content-des-browse {
					color: #999;
					line-height: 1.5;
				}
			}
		}

		&.mode-column {
			.list-content {
				width: 100%;
				padding-left: 0;
			}

			.listCard-image {
				display: flex;
				margin-top: 10px;
				width: 100%;
				height: 70px;

				.listCard-image-item {
					margin-left: 10px;
					width: 100%;
					border-radius: 5px;
					overflow: hidden;

					&:first-child {
						margin-left: 0;
					}

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.listCard-content-des {
				margin-top: 10px;
			}
		}

		&.mode-image {
			flex-direction: column;

			.listCard-image {
				width: 100%;
				height: 100px;
			}

			.listCard-content {
				padding-left: 0;
				margin-top: 10px;

				.listCard-content-des {
					display: flex;
					align-items: center;
					margin-top: 10px;
				}
			}
		}
	}
</style>
