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
			<button type="default" class="detail-header-button" @click="follow(formData.author.id)">{{formData.is_author_like?'取消关注':'关注'}}</button>
		</view>
		<view class="detail-content">
			<view class="detail-html">
				<u-parse :content='formData.content' :noData="noData"></u-parse>
			</view>
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content" v-for="(item, index) in commentsList" :key="item.comment_id">
					<comments-box :comments="item" @reply="reply"></comments-box>
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
					<text class="iconfont icon-xinxi" @click="open"></text>
					<text class="iconfont" :class="[formData.is_like?'icon-like':'icon-unlike']" @click="likeTap(formData._id)"></text>
					<text class="iconfont" :class="[formData.is_thumbs_up?'icon-dianzan-copy':'icon-dianzan']" @click="thumbsup(formData._id)"></text>
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
				commentsValue: '',
				commentsList: [],
				replyFormData:{}
			}
		},
		components: {
			uParse
		},
		onLoad(query) {
			//获取到首页连接中的参数
			this.formData = JSON.parse(query.params)
			this.getDetail()
			this.getComments()
		},
		methods: {
			//打开评论列表
			open(){
				uni.navigateTo({
					url: `../detail-comments/detail-comments?id=${this.formData._id}`
				})
			},
			//获取详情信息
			getDetail() {
				this.$api.get_detail({
					article_id: this.formData._id
				}).then(res => {
					const {
						data
					} = res
					this.formData = data
				})
			},
			//获取评论内容
			getComments(){
				this.$api.get_comments({
					article_id: this.formData._id
				})
				.then(res => {
					const {data} = res
					this.commentsList = data
				})
			},
			//更新评论
			setUpdateComment(content) {
				const formdata = {
					article_id: this.formData._id,
					...content
				}
				uni.showLoading()
				this.$api.updata_comment(formdata).then(res => {
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title:'评论发布成功'
					})
					this.getComments()
					this.closeComment()
					this.replyFormData = {}
				})
			},
			//关注/取消关注
			setUpdateAuthor(author_id){
				uni.showLoading()
				this.$api.update_author({
					author_id
				}).then(res=>{
					uni.hideLoading()
					this.formData.is_author_like = !this.formData.is_author_like
					uni.showToast({
						title:this.formData.is_author_like? '关注作者成功':'取消关注作者',
						icon:'none'
					})
				})
			},
			//收藏文章
			setUpdateLike(article_id){
				uni.showLoading()
				this.$api.update_like({
					article_id
				}).then(res=>{
					uni.hideLoading()
					this.formData.is_like = !this.formData.is_like
					uni.$emit('update_article')
					uni.showToast({
						title:this.formData.is_like? '收藏成功':'取消成功',
						icon:'none'
					})
				})
			},
			//点赞
			UpdateThumbs(article_id){
				uni.showLoading()
				this.$api.update_thumbsup({
					article_id
				}).then(res=>{
					uni.hideLoading()
					this.formData.is_thumbs_up = true
					this.formData.thumbs_up_count++
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				})
			},
			//打开评论区的输入框
			openComment() {
				this.$refs.popup.open()
			},
			//关闭评论区的输入框
			closeComment() {
				this.$refs.popup.close()
				this.commentsValue = ''
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
				this.setUpdateComment({content:this.commentsValue,...this.replyFormData})
			},
			//回复评论
			reply(e){
				this.replyFormData = {
					"comment_id": e.comments.comment_id,
					"is_reply": e.is_reply
				}
				if(e.comments.reply_id){
					this.replyFormData.reply_id = e.comments.reply_id
				}
				this.openComment()
			},
			follow(author_id){
				this.setUpdateAuthor(author_id)
			},
			//收藏文章
			likeTap(article_id){
				this.setUpdateLike(article_id)
			},
			//点赞
			thumbsup(article_id){
				this.UpdateThumbs(article_id)
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
		.detail-header-button{
			flex-shrink: 0;
			height: 30px;
			font-size: 12px;
			color: #fff;
			background-color: $base-color;
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
				align-items: center;
				width: 125px;

				text {
					font-size: 20px;
					color: $base-color;
				}
				.icon-dianzan{
					font-size: 24px;
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
