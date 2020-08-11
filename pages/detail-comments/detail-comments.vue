<template>
	<view>
		<view class="comments-content" v-for="item in commentsList" :key='item.comment_id'>
			<comments-box :comments='item'></comments-box>
		</view>
		<uni-load-more v-if="commentsList.length === 0 || commentsList.length > 5" iconType="sonw" :status="loading"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article_id: '',
				commentsList: [],
				page: 1,
				pageSize: 6,
				loading: 'loading'
			}
		},
		onLoad(query) {
			this.article_id = query.id
			this.getComments()
		},
		//页面滚动到底部就会触发的页面生命周期钩子
		onReachBottom() {
			if (this.loading === 'noMore') {
				return
			}
			this.page++
			this.getComments()
		},
		methods: {
			//获取评论内容
			getComments() {
				this.$api.get_comments({
						article_id: this.article_id,
						pageSize: this.pageSize,
						page: this.page
					})
					.then(res => {
						const {
							data
						} = res
						if (data.length === 0) {
							this.loading = 'noMore'
							return
						}
						let oldFormData = JSON.parse(JSON.stringify(this.commentsList))
						oldFormData.push(...data)
						this.commentsList = oldFormData
					})
			}
		}
	}
</script>

<style lang="scss">
	.comments-content {
		padding: 0 15px;
		border-top: 1px #eee solid;
	}
</style>
