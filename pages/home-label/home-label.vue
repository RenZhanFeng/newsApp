<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="editLabel">{{is_edit ? '完成' : '编辑'}}</view>
			</view>
			<uni-load-more status="loading" iconType="snow" v-if="loading"></uni-load-more>
			<view class="label-content" v-if="!loading">
				<view class="label-content-item" v-for="(item,index) in myLabel" :key="item._id">
					{{item.name}}
					<view class="label-content-item-delete" v-if="is_edit" @click="delLabel(index)">
						<text class="iconfont icon-shanchu"></text>
					</view>
				</view>
				<view class="no-data" v-if="myLabel.length === 0 && !loading">
					当前没有数据
				</view>
			</view>
		</view>

		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<uni-load-more status="loading" iconType="snow" v-if="loading"></uni-load-more>
			<view class="label-content" v-if="!loading">
				<view class="label-content-item" v-for="(item,index) in recommendLabel" :key="item._id" @click="addLabel(index)">
					{{item.name}}
				</view>
				<view class="no-data" v-if="recommendLabel.length === 0 && !loading">
					当前没有数据
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_edit: false,
				myLabel: [],
				recommendLabel: [],
				loading: true
			}
		},
		onLoad() {
			this.getLabel()
			//自定义事件

		},
		methods: {
			//显示/隐藏标签右上角的删除按钮
			editLabel() {
				if (this.is_edit) {
					this.is_edit = false
					this.setUpdataLabel(this.myLabel)
				} else {
					this.is_edit = true
				}
			},
			//获取标签数据
			getLabel() {
				this.loading = true
				this.$api.get_label({
					type: 'all'
				}).then((res) => {
					console.log(res)
					const {
						data
					} = res
					this.myLabel = data.filter(item => item.current)
					this.recommendLabel = data.filter(item => !item.current)
					this.loading = false
				})
			},
			//删除标签
			delLabel(index) {
				this.recommendLabel.push(this.myLabel[index])
				this.myLabel.splice(index, 1)
			},
			//增加标签
			addLabel(index) {
				if (!this.is_edit) return
				this.myLabel.push(this.recommendLabel[index])
				this.recommendLabel.splice(index, 1)
			},
			//更新数据库中Label数据
			setUpdataLabel(label) {
				let newArrIds = []
				label.forEach(item => {
					newArrIds.push(item._id)
				})
				uni.showLoading()
				this.$api.updata_label({
					label: newArrIds
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: '更新成功',
						icon: 'none'
					})
					//发送自定义事件通知首页刷新
					uni.$emit('labelChange')
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../common/css/icons.css';

	page {
		background-color: #f5f5f5;
	}

	.label {
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;

			.label-header {
				display: flex;
				justify-content: space-between;
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;

				.label-edit {
					color: $base-color;
					font-weight: bold;
				}
			}

			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;

				.label-content-item {
					position: relative;
					padding: 2px 5px;
					margin-top: 12px;
					margin-right: 10px;
					border: 1px #666 solid;
					border-radius: 5px;
					font-size: 14px;
					color: #666;

					.label-content-item-delete {
						position: absolute;
						top: -9px;
						right: -6px;

						.icon-shanchu {
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

	.no-data {
		width: 100%;
		text-align: center;
		padding: 25px 0;
		color: #666;
		font-size: 16px;
	}
</style>
