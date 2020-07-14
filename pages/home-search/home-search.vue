<template>
	<view class="home">
		<navbar :isSearch="true"></navbar>
		<view class="home-list">
			<view class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<view class="label-clear">
						<text class="label-clear-text">清空</text>
						<text class="iconfont icon-lajitong"></text>
					</view>
				</view>
				<view class="label-content" v-if="historyList.length > 0">
					<view class="label-content-item" v-for="item in 10" :key="item">
						{{item}}内容
					</view>
				</view>
				<view class="no-data" v-else>
					没有搜索历史
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historyList: '123'
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	@import '../../common/css/icons.css';

	page {
		height: 100%;
		display: flex;
		background: #f5f5f5;
	}

	.home {
		display: flex;
		flex-direction: column;
		flex: 1;

		.home-list {
			.label-box {
				background-color: #fff;
				margin-bottom: 10px;

				.label-header {
					display: flex;
					justify-content: space-between;
					font-size: 14px;
					color: #666;
					padding: 10px 15px;
					border-bottom: 1px #f5f5f5 solid;

					.label-title {
						color: #666;
					}

					.label-clear {
						color: $base-color;
					}
				}

				.label-content {
					display: flex;
					flex-wrap: wrap;
					padding: 5px 15px 15px;
					box-shadow: 0 5px 5px -3px #ccc;

					.label-content-item {
						padding: 2px 10px;
						margin: 6px 5px;
						border: 1px solid #666;
						border-radius: 5px;
						font-size: 14px;
						color: #666;
					}
				}

				.no-data {
					height: 200px;
					line-height: 200px;
					width: 100%;
					text-align: center;
					color: #666;
					font-size: 14px;
					box-shadow: 0 5px 5px -3px #ccc;
				}
			}
		}
	}
</style>
