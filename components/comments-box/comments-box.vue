<template>
	<view class="comments-box">
		<view class="comment-header">
			<view class="comment-header-logo">
				<image :src="comments.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comment-header-info">
				<view v-if="!comments.is_reply" class="title">{{comments.author.author_name}}</view>
				<view v-else class="title">
				{{comments.author.author_name}}
				<text class="reply-text">回复</text>
				{{comments.to}}
				</view>
				<view class="">{{comments.create_time}}</view>
			</view>
		</view>
		<view class="comments-content">
			<view class="">{{comments.comment_content}}</view>
			<view class="comments-info">
				<view class="comments-button" @click="commentsReply({comments, is_reply:reply})">回复</view>
			</view>
			<view class="comments-reply" v-for="(item, index) in comments.replys" :key="index">
				<comments-box :reply="true" :comments="item" @reply="commentsReply"></comments-box>
			</view>
		</view>
	</view>
</template>

<script>
	import commentsBox from '@/components/comments-box/comments-box.vue'
	export default {
		name: "comments-box",
		props: {
			comments: {
				type: Object,
				default () {
					return {}
				}
			},
			reply: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			};
		},
		components: {
			commentsBox
		},
		methods: {
			commentsReply(comment) {
				//为了区分是住回复还是子回复
				if (comment.is_reply) {
					comment.comments.reply_id = comment.comments.comment_id
					comment.comments.comment_id = this.comments.comment_id
				}
				this.$emit('reply', comment)
			}
		}
	}
</script>

<style lang="scss">
	.comments-box {
		margin: 15px 0;

		.comment-header {
			display: flex;

			.comment-header-logo {
				flex-shrink: 0;
				width: 30px;
				height: 30px;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.comment-header-info {
				display: flex;
				flex-direction: column;
				padding-left: 15px;
				font-size: 12px;
				color: #999;
				line-height: 1;

				.title {
					margin-bottom: 10px;
					font-size: 14px;
					color: #333;
					.reply-text{
						margin: 0 10px;
						font-weight: bold;
						color: #000;
					}
				}
			}
		}

		.comments-content {
			margin-top: 10px;
			font-size: 14px;
			color: #000;

			.comments-info {
				margin-top: 15px;
				display: inline-block;

				.comments-button {
					padding: 2px 10px;
					font-size: 12px;
					color: #999;
					border: 1px #ccc solid;
					border-radius: 20px;
				}
			}

			.comments-reply {
				display: flex;
				margin: 15px 0;
				padding: 0 10px;
				border: 1px #eee solid;
			}
		}
	}
</style>
