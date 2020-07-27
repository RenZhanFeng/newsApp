<template>
	<view class="detail">
		<view class="detail-title">
			{{formData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-header-logo">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header-content">
				<view class="detail-header-content-title">
					{{formData.author.author_name}}
				</view>
				<view class="detail-header-content-info">
					<text>{{formData.create_time}}</text>
					<text>{{formData.browse_count}} 浏览</text>
					<text>{{formData.thumbs_up_count}} 赞</text>
				</view>
			</view>
			<view class="detail-header-content-concern" v-if="false">
				已关注
			</view>
		</view>
		<view class="detail-content">
			<view class="detail-html">
				<u-parse :content='formData.content' :noData="noData"></u-parse>
			</view>
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content">
					<comments-box></comments-box>
				</view>
			</view>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom-input" @click="openComment">
				<text>谈谈你的看法</text>
				<text class="iconfont icon-bianji"></text>
			</view>
			<view class="detail-bottom-icons">
				<view class="detail-bottom-iconsBox">
					<text class="iconfont icon-xinxi"></text>
					<text class="iconfont icon-unlike"></text>
					<text class="iconfont icon-dianzan-copy"></text>
				</view>
			</view>
		</view>
		<uni-popup type="bottom" ref="popup" :maskClick="false">
			<view class="popup-wrap">
				<view class="pop-header">
					<text class="pop-header-item" @click="closeComment">取消</text>
					<text class="pop-header-item" @click="submit">发布</text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="commentsValue" placeholder="请输入评论内容" maxlength="200" fixed></textarea>
					<view class="popup-count">
						{{commentsValue.length}}/200
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		data() {
			return {
				formData: {},
				noData: '<p style="text-align:center;colof:#666">详情加载中...</p>',
				commentsValue: ''
			}
		},
		components: {
			uParse
		},
		onLoad(query) {
			//获取到首页连接中的参数
			this.formData = JSON.parse(query.params)
			this.getDetail()
		},
		methods: {
			//获取详情信息
			getDetail() {
				this.$api.get_detail({
					article_id: this.formData._id
				}).then(res => {
					const {
						data
					} = res
					this.formData = data
					console.log(res)
				})
			},
			//更新评论
			setUpdateComment(content) {
				uni.showLoading()
				this.$api.updata_comment({
					article_id: this.formData._id,
					content
				}).then(res => {
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title:'评论发布成功'
					})
					this.closeComment()
				})
			},
			//打开评论区的输入框
			openComment() {
				this.$refs.popup.open()
			},
			//关闭评论区的输入框
			closeComment() {
				this.$refs.popup.close()
			},
			//发布评论
			submit() {
				if (!this.commentsValue) {
					uni.showToast({
						title: '请输入内容',
						icon: 'none'
					})
					return
				}
				this.setUpdateComment(this.commentsValue)
			}
		}
	}
</script>

<style lang="scss">
	@import '../../common/css/icons.css';

	.detail {
		padding: 15px 0;
		padding-bottom: 54px;
	}

	.detail-title {
		padding: 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}

	.detail-header {
		display: flex;
		align-items: center;
		margin-top: 10px;
		padding: 0 15px;

		.detail-header-logo {
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.detail-header-content {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;
			padding-left: 10px;

			.detail-header-content-title {
				font-size: 14px;
				color: #333;
			}

			.detail-header-content-info {
				color: #999;

				text {
					margin-right: 10px;
				}
			}
		}
	}

	.detail-content {
		margin-top: 20px;
		min-height: 500px;

		.detail-html {
			padding: 0 15px;
		}
		.detail-comment{
			margin-top: 30px;
			.comment-title{
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;
			}
			.comment-content{
				padding: 0 15px;
				border-top: 1px #eee solid;
			}
		}
	}

	.detail-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 44px;
		border-top: 1px #f5f5f5 solid;
		background-color: #fff;
		box-sizing: border-box;

		.detail-bottom-input {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 30px;
			padding: 0 10px;
			margin-left: 10px;
			border: 1px solid #ddd;
			border-radius: 5px;

			text {
				font-size: 14px;
				color: #999;
			}

			.icon-bianji {
				color: $base-color;
			}
		}

		.detail-bottom-icons {
			display: flex;
			flex-shrink: 0;
			padding: 0 10px;

			.detail-bottom-iconsBox {
				position: relative;
				display: flex;
				justify-content: space-evenly;
				width: 125px;

				text {
					font-size: 20px;
					color: $base-color;
				}
			}
		}
	}

	.popup-wrap {
		background-color: #fff;

		.pop-header {
			display: flex;
			justify-content: space-between;
			border-bottom: 1px #f5f5f5 solid;
			font-size: 14px;
			color: #666;

			.pop-header-item {
				height: 50px;
				line-height: 50px;
				padding: 0 15px;
			}
		}

		.popup-content {
			width: 100%;
			padding: 15px;
			box-sizing: border-box;

			.popup-textarea {
				width: 100%;
				height: 200px;
			}

			.popup-count {
				display: flex;
				justify-content: flex-end;
				font-size: 12px;
				color: #999;
			}
		}
	}
</style>
