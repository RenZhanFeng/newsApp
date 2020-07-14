<template>
	<view class="navbar">
		<view class="nav-fixed">
			<!-- 保留出手机顶部状态栏的位置 -->
			<view :style="{height: statusBarHeight + 'px'}"></view>
			<!-- 导航栏内容 -->
			<view class="navbar-conten" :class="{search: isSearch}" :style="{height: navBarHeight + 'px',width: navBarWidth + 'px'}"
			 @click.stop="open">
				<view class="back" @click="back" v-if="isSearch">
					<text class="iconfont icon-fanhui2"></text>
				</view>
				<!-- 在非搜索页面显示这个搜索框 -->
				<view class="navbar-search" v-if="!isSearch">
					<view class="navbar-search-icon"><text class="iconfont icon-soushuo"></text></view>
					<view class="navbar-search-text">
						uni-app、vue
					</view>
				</view>
				<!-- 在搜索页面显示这个搜索框 -->
				<view class="navbar-search" v-if="isSearch">
					<input class="navbar-search-text" type="text" @input="inputChange" v-model="val" placeholder="请输入您要搜索的内容" />
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
				val: '' //搜索栏的数据
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
				if (this.isSearch) return
				uni.navigateTo({
					url: '/pages/home-search/home-search'
				})
			},
			back() {
				uni.navigateBack({
					url: '/pages'
				})
			},
			inputChange(e) {
				const {
					value
				} = e.detail
				this.$emit('input', value)
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

				.navbar-search {
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

					.navbar-search-text {
						width: 100%;
						font-size: 14px;
						color: #999;
					}
				}

				&.search {
					padding-left: 0;

					.back {
						margin-left: 10px;
						margin-right: 10px;

						.icon-fanhui2 {
							color: #fff;
							font-size: 20px;
						}
					}

					.navbar-search {
						border-radius: 5px;
					}
				}
			}
		}
	}
</style>
