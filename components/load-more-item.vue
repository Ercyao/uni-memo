<template>
	<!-- 下拉加载 下拉刷新 -->
	<view class="h-load-more" :style="{ paddingTop: top + 'rpx' }" ref="loadMoreItem">
		<slot></slot>

		<!-- 0：无状态  1: 加载中   2: 加载结束    -->
		<view class="h-load-text" :style="{ color: color }" v-if="loadingType === 0 || loadingType === 1 || loadingType === 2">
			<text class="loader-01" v-if="loadingType === 1"></text>
			<text>{{ loadingType === 0 ? tips.pullingText : loadingType === 1 ? tips.loadingText : tips.finishText }}</text>
		</view>

		<!-- 3: 暂无数据 -->
		<view class="h-empty-text" :style="{ color: color }" v-if="loadingType === 3">
			<slot name="empty">
				<image :src="emptyImg" mode="widthFix" class="empty-img" v-if="emptyIcon"></image>
				<view>{{ emptyText || tips.emptyText }}</view>
			</slot>
		</view>

		<!-- 4: 加载失败 -->
		<view class="h-error-text" :style="{ color: color }" v-if="loadingType === 4" @click="onLoadData">
			<text>{{ tips.errorText }}</text>
		</view>
	</view>
</template>

<script>
export default {
	name: 'load-more',
	props: {
		showImage: {
			type: Boolean,
			default: true
		},
		color: {
			type: String,
			default: '#b6b6b6'
		},
		top: {
			type: String,
			default: ''
		},
		emptyText: {
			type: String,
			default: ''
		},
		emptyIcon: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			tips: {
				pullingText: '上拉加载更多',
				loadingText: '加载中...',
				finishText: '没有更多了',
				emptyText: '暂无数据',
				errorText: '数据加载错误，请点击重试'
			},
			loadingType: 1, //0：上拉加载更多  1: 加载中   2: 加载结束   3: 暂无数据  4: 加载失败 5:刷新中
			page: 1,
			iconType: 'loading',
			emptyImg: this.$url.IMG_URL + '/static/img/icon/no-data.png',
			isNoPage: false //是否没有下一页
		};
	},
	pageEvent: {
		// 下拉刷新
		onPullDownRefresh() {
			// console.log('下拉刷新');
			this.refresh();
			uni.stopPullDownRefresh(); //这里是防止下拉的回不去，回去效果卡顿
		},
		// 上拉加载
		onReachBottom() {
			// console.log('上拉加载');
			this.onLoadData();
		}
	},
	methods: {
		returnObj() {
			let that = this;
			return {
				page: that.page,

				// 表示加载成功
				success(len, nextPage) {
					setTimeout(() => {
						that.loadingType = len < 1 ? 3 : nextPage > 0 ? 0 : 2;
						that.page = nextPage > 0 ? nextPage : 1;
						that.isNoPage = nextPage > 0 ? false : true;
					}, 500);
				},

				// 表示加载中
				load() {
					that.loadingType = 1;
				},

				// 加载结束
				finish() {
					that.loadingType = 2;
				},

				// 表示暂无数据
				empty() {
					that.loadingType = 3;
				},

				// 表示加载失败，显示失败布局，page会减1
				error() {
					// that.page > 1 && that.page--;

					that.loadingType = 4;
				}
			};
		},

		// 刷新
		refresh() {
			this.page = 1;

			// this.$emit('refresh', this);
			let options = this.returnObj();
			this.$emit('pullDown', options);
		},

		// 加载更多
		onLoadData(page) {
			if (!page) {
				// this.page++;

				// this.$emit('loadMore', this);
				if (this.isNoPage) return;
			} else {
				this.page = page;
			}

			let options = this.returnObj();
			this.$emit('pullUp', options);
		},

		// 表示加载成功
		success(len, nextPage) {
			if (len < 1) {
				this.empty();
			} else {
				nextPage < 1 ? this.finish() : (this.loadingType = 0);

				this.page = nextPage > 0 ? nextPage : 1;
				this.isNoPage = nextPage > 0 ? false : true;
			}
		},
		// success(len, total,type) {
		// 	if (len < 1) {
		// 		this.empty();
		// 	} else {
		// 		len >= Number(total) ? this.finish() : (this.loadingType = 0);
		// 	}
		// },

		// 表示加载中
		load() {
			this.loadingType = 1;
		},

		// 加载结束
		finish() {
			this.loadingType = 2;
		},

		// 表示暂无数据
		empty() {
			this.loadingType = 3;
		},

		// 表示加载失败，显示失败布局，page会减1
		error() {
			// this.page > 1 && this.page--;

			this.loadingType = 4;
		}
	}
};
</script>

<style lang="scss" scoped>
.h-load-more {
	.load-content {
	}
	.h-load-text,
	.h-error-text,
	.h-empty-text {
		display: block;
		width: 100%;
		font-size: 28rpx;
		color: #b6b6b6;
		box-sizing: border-box;
	}
	.h-load-text,
	.h-error-text {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 15rpx 10rpx;
	}
	.h-empty-text {
		text-align: center;
		// padding: 150px 10px;
		padding: 30% 0;
	}
}

.empty-img {
	width: 240rpx;
	height: 240rpx;
	margin-bottom: 50rpx;
}
</style>
