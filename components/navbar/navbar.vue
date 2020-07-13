<template>
	<view class="navbar">
		<view class="nav-fixed">
			<!-- 保留出手机顶部状态栏的位置 -->
			<view :style="{height: statusBarHeight + 'px'}"></view>
			<!-- 导航栏内容 -->
			<view class="navbar-conten" :class="{search: isSearch}" :style="{height: navBarHeight + 'px',width: navBarWidth + 'px'}"
			 @click="open">
				<view class="back" @click="back" v-if="isSearch">
					<text class="iconfont icon-fanhui2"></text>
				</view>
				<view class="navbar-serch">
					<view class="navbar-search-icon"><text class="iconfont icon-soushuo"></text></view>
					<view class="navbar-serch-text">
						uni-app、vue
					</view>
				</view>
			</view>
		</view>
		<view :style="{height: statusBarHeight+navBarHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		props: {
			isSearch: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				statusBarHeight: 20, //手机顶部状态栏高度
				navBarHeight: 45, //导航栏高度
				navBarWidth: 375, //导航栏宽度
			}
		},
		created() {
			//获取手机系统信息
			const deviceInfo = uni.getSystemInfoSync()
			this.statusBarHeight = deviceInfo.statusBarHeight
			this.navBarWidth = deviceInfo.windowWidth

			//#ifndef H5 || APP-PLUS || MP-ALIPAY
			//获取右上角胶囊的信息
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.navBarHeight = (menuButtonInfo.bottom - this.statusBarHeight) + (menuButtonInfo.top - this.statusBarHeight) * 2
			this.navBarWidth = menuButtonInfo.left
			//#endif
		},
		methods: {
			open() {
				uni.navigateTo({
					url: '/pages/home-search/home-search'
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../common/css/icons.css';

	.navbar {
		.nav-fixed {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 100;
			width: 100%;
			background-color: $base-color;

			.navbar-conten {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 15px;
				box-sizing: border-box;

				.navbar-serch {
					display: flex;
					align-items: center;
					padding: 0 10px;
					width: 100%;
					height: 30px;
					border-radius: 30px;
					background: #ffff;

					.navbar-search-icon {
						margin-right: 10px;
						color: #999;
					}

					.navbar-serch-text {
						width: 100%;
						font-size: 14px;
						color: #999;
					}
				}

				&.search {
					.back {
						margin-left: -10px;
						margin-right: 10px;

						.icon-fanhui2 {
							color: #fff;
							font-size: 20px;
						}
					}
					.navbar-serch{
						border-radius: 5px;
					}
				}
			}
		}
	}
</style>
