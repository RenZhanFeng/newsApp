<template>
	<swiper class="home" @change="change" :current="activeIndex">
		<swiper-item class="swiper-item" v-for="(item, index) in tab" :key="item.id">
			<list-item :list="listCatchData[index]"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		props: {
			tab: {
				type: Array,
				default () {
					return []
				}
			},
			activeIndex: {
				type: Number,
				default () {
					return 0
				}
			}
		},
		data() {
			return {
				list: [],
				listCatchData: {}

			}
		},
		components: {
			listItem
		},
		watch:{
			 tab(newVal){
				 if(newVal.length === 0){
					 return
				}else{
					this.getList(this.activeIndex)
				}
			 }
		},
		created() {
			
		},
		methods: {
			change(e) {
				const {
					current
				} = e.detail
				this.getList(current)
				this.$emit("change", current)
			},
			getList(current) {

				this.$api.get_list({
					name: this.tab[current].name
				}).then(res => {
					const {
						data
					} = res
					// this.list = data
					// this.listCatchData[current] = data
					this.$set(this.listCatchData,current,data)
					console.log(this.listCatchData)
				})
			}
		}
	}
</script>

<style lang="scss">
	.home {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;
		}
	}
</style>
