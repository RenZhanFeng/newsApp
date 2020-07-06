<template>
	<view class="tab">
		<scroll-view scroll-x="true" class="tab-scroll">
			<view class="tab-scroll-box">
				<view class="tab-scroll-item" v-for="(item,index) in tabList" :key="item._id">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="tab-icon">
			<text class="iconfont icon-icon-test"></text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tabList: {
				type: Array,
				default () {
					return []
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
	@import '../../common/css/icons.css';

	.tab {
		display: flex;
		box-sizing: border-box;
		border: 1px solid #f5f5f5;
		background-color: #fff;

		.tab-scroll {
			.tab-scroll-box {
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				height: 45px;
				box-sizing: border-box;

				.tab-scroll-item {
					flex-shrink: 0;
					padding: 0 10px;
					color: #333;
					font-size: 14px;
				}
			}
		}

		.tab-icon {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 45px;

			&::after {
				content: '';
				position: absolute;
				top: 12px;
				bottom: 12px;
				left: 0;
				width: 1px;
				background-color: #ddd;
			}

			.icon-icon-test {
				color: #666;
			}
		}
	}
</style>
