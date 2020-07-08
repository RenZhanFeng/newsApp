<template>
	<view class="tab">
		<scroll-view scroll-x="true" class="tab-scroll">
			<view class="tab-scroll-box">
				<view class="tab-scroll-item" :class="{active: activeIndex === index}" v-for="(item,index) in tabList" :key="item._id"
				 @click="clickTab(item, index)">
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
			},
			tabIndex: {
				type: Number,
				default () {
					return 0
				}
			}
		},
		watch: {
			tabIndex(newVal, oldVal){
				this.activeIndex = newVal
			}
		},
		data() {
			return {
				activeIndex: 0
			}
		},
		methods: {
			clickTab(item, index) {
				this.activeIndex = index
				this.$emit('tab', {
					item: item,
					index: index
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../common/css/icons.css';

	.tab {
		// position: fixed;
		// top: 45px;
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

					&.active {
						color: $base-color;
					}
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
