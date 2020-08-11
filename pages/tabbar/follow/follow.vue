<template>
	<view class="follow">
		<!-- 导航栏 -->
		<view class="follow-tab">
			<view class="follow-tab-box">
				<view class="follow-tab-item" :class="{active:activeIndex === 0}" @click="tab(0)">文章</view>
				<view class="follow-tab-item" :class="{active:activeIndex === 1}" @click="tab(1)">作者</view>
			</view>
		</view>
		<view class="follow-list">
			<swiper class="follow-list-swiper">
				<swiper-item>
					<list-scroll>
						<view class="swiper-item" v-for="item in 100">{{item}}</view>
					</list-scroll>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">作者</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0
			}
		},
		methods: {
			tab(index) {
				this.activeIndex = index
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.follow {
		height: 100%;
		display: flex;
		flex: 1;
		flex-direction: column;
		box-sizing: border-box;

		.follow-tab {
			height: 30px;
			padding: 10px 20px;

			.follow-tab-box {
				display: flex;
				width: 100%;
				height: 100%;
				border-radius: 5px;
				border: 1px solid $base-color;

				.follow-tab-item {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #666;
					font-size: 14px;

					&:first-child {
						border-right: 1px solid $base-color;
					}

					&.active {
						color: $base-color;
					}
				}
			}
		}

		.follow-list {
			flex: 1;
			.follow-list-swiper{
				 height: 100%;
				.swiper-item{
					height: 100%;
				}
			}
		}
	}
</style>
