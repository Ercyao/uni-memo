<template>
	<view class="list-content">
		<view class="list-header">
			<view class="list-header-title item-flex-between">
				<view><h-icon path="icon/date" width="50" /></view>
				<view>{{ title }}</view>
				<view><h-icon path="icon/more" width="50" /></view>
			</view>
			<view class="money-box">
				<view class="list-budget">
					<view class="number">{{ price.budget }}</view>
					<view class="title">预算</view>
				</view>
				<view class="item-flex-around">
					<view class="list-income">
						<view class="number">{{ price.income }}</view>
						<view class="title">收入</view>
					</view>
					<view class="list-expenses">
						<view class="number">{{ price.expenses }}</view>
						<view class="title">支出</view>
					</view>
				</view>
			</view>
		</view>

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

				<view class="record-list-item-content" v-for="(ele, eindex) in item.list" :key="eindex">
					<view class="record-list-item-content-left">
						<view class="record-list-item-icon"><h-icon :path="'type/' + ele.icon" width="50" /></view>
						<view class="record-list-item-name">{{ ele.name }}</view>
					</view>

					<view class="record-list-item-content-right">
						<view class="record-list-item-category">{{ ele.category == 'expenfiture' || ele.category == 'balance' ? '-' : '' }}</view>
						<view class="record-list-item-price">{{ ele.price }}</view>
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
			title: '今天又是贫穷的一天',
			price: {
				budget: 10,
				income: 0,
				expenses: 0
			},
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
				// this.list = data.list;
				this.total = data.total;
				this.list = this.setList(data.list);
				console.log('获取 明细列表', data);
			} catch (e) {
				console.error('获取 明细列表 失败', e);
			}
		},

		setList(list) {
			let result = [];
			let index = 0;
			for (let i in list) {
				// console.log(23423, i, list[i]);
				if (i > 0 && list[i].createDate == list[i - 1].createDate) {
					result[index].list.push(list[i]);
				} else {
					index = i < 1 ? index : index + 1;
					result[index] = { list: [] };
					result[index].createDate = list[i].createDate;
					result[index].createDay = list[i].createDay;
					result[index].createTime = list[i].createTime;
					result[index].category = list[i].category;
					result[index].time = list[i].time;
					result[index].list.push(list[i]);
				}
				result[index].totalPrice = +list[i].price;
			}
			return result;
		},

		/* 点击 列表某行数据 */
		onClickItem(item) {
			console.log(444, item);
			uni.navigateTo({ url: '/pages/list/detail?id=' + item.id });
			// this.currentItem = item;
		}
	}
};
</script>

<style lang="scss" scoped>
.list-content {
	min-height: 92.5vh;
	background: #f3f3f3;

	.list-header {
		position: relative;
		width: 100%;
		height: 400rpx;
		color: #ffffff;
		text-align: center;
		background-image: url(../../static/img/cover/cover.jpg);
		background-size: cover;
		overflow: hidden;
		padding: 20rpx;
		box-sizing: border-box;
		.list-header-title {
			font-size: 30rpx;
		}
		.money-box {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			padding: 20rpx 0 30rpx;

			.list-budget {
				padding: 20rpx 0 40rpx;
				.number {
					font-size: 54rpx;
				}
			}
			.list-income {
				.number {
					font-size: 28rpx;
				}
			}
			.list-expenses {
				.number {
					font-size: 30rpx;
				}
			}
		}
	}

	.record-list {
		height: 62vh;
		overflow-y: auto;
		.record-list-item {
			background: #ffffff;
			padding: 20rpx;
			margin: 20rpx 20rpx 30rpx;
			box-shadow: 0 3rpx 20rpx rgba(#333333, 0.15);
			border-radius: 20rpx;
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
				font-size: 28rpx;
				.record-list-item-icon {
					width: 80rpx;
					height: 80rpx;
					margin: 0 auto;
					display: flex;
					justify-content: center;
					align-items: center;
					background: #fcfcfc;
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
					font-size: 34rpx;
					font-weight: 600;
				}
			}
		}
	}
}
</style>
