<template>
	<view class="content">
		<view class="record-list">
			<view v-for="(item, index) in list" :key="index" class="record-list-item" @click="onClickItem(item)">
				<view class="record-list-item-header">
					<view class="record-list-item-header-left">{{ item.createDate }} {{ item.createDay }}</view>

					<view class="record-list-item-header-right">
						<view class="record-list-item-category">
							{{ item.category == 'expenfiture' ? '支出' : item.category == 'income' ? '收入' : item.category == 'balance' ? '余额' : '计划' }}:
						</view>
						<view class="record-list-item-price">{{ item.price }}</view>
					</view>
				</view>

				<view class="record-list-item-content">
					<view class="record-list-item-content-left">
						<view class="record-list-item-icon"><h-icon :path="item.icon" width="30" /></view>
						<view class="record-list-item-name">{{ item.name }}</view>
					</view>

					<view class="record-list-item-content-right">
						<view class="record-list-item-category">{{ item.category == 'expenfiture' || item.category == 'balance' ? '-' : '' }}</view>
						<view class="record-list-item-price">{{ item.price }}</view>
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
			list: [],
			total: 0
		};
	},
	onShow() {
		this.getRecordList();
	},
	methods: {
		/* 请求 明细列表 */
		async getRecordList() {
			try {
				let { data } = await this.$api.getRecordList();
				this.list = data.list;
				this.total = data.total;
				console.log('获取 明细列表', data);
			} catch (e) {
				console.error('获取 明细列表 失败', e);
			}
		},

		/* 点击 列表某行数据 */
		onClickItem(item) {
			console.log(444,item)
			uni.navigateTo({ url: '/pages/list/detail?id=' + item.id });
			// this.currentItem = item;
		}
	}
};
</script>

<style lang="scss" scoped>
.record-list-item {
	margin-bottom: 30rpx;
	.record-list-item-header {
		color: #999;
		font-size: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #ececec;
		padding: 15rpx 20rpx;
		&-right {
			display: flex;
			.record-list-item-category {
				margin-right: 15rpx;
			}
		}
	}
	.record-list-item-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 20rpx;
		.record-list-item-icon {
			width: 80rpx;
			height: 80rpx;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #ececec;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 10rpx;
		}
		&-left {
			display: flex;
			align-items: center;
		}
		&-right {
			display: flex;
		}
	}
}
</style>
