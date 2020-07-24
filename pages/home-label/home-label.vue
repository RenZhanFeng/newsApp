<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit">编辑</view>
			</view>
			<view class="label-content">
				<view class="label-content-item" v-for="item in 10" :key="item">
					{{item}}内容
					<view class="label-content-item-delete">
						<text class="iconfont icon-shanchu"></text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<view class="label-content">
				<view class="label-content-item" v-for="item in 5" :key="item">
					{{item}}内容
					<view class="label-content-item-delete">
						<text class="iconfont icon-shanchu"></text>
					</view>
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
@import '../../common/css/icons.css';
	page{
		background-color: #f5f5f5;
	}
	.label{
		.label-box{
			background-color: #fff;
			margin-bottom: 10px;
			.label-header{
				display: flex;
				justify-content: space-between;
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;
				.label-edit{
					color: $base-color;
					font-weight: bold;
				}
			}
			.label-content{
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;
				.label-content-item{
					position: relative;
					padding: 2px 5px;
					margin-top: 12px;
					margin-right: 10px;
					border: 1px #666 solid;
					border-radius: 5px;
					font-size: 14px;
					color: #666;
					.label-content-item-delete{
						position: absolute;
						top:-9px;
						right:-6px;
						.icon-shanchu{
							font-size: 14px;
							color: #fff;
							border: 1px solid $base-color;
							border-radius: 50%;
							background: $base-color;
						}
					}
				}
			}
		}
	}
</style>
