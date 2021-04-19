<template>
	<view class="record-container">
		<h-tabs-item :arr="navList" border :current="current" :isAdsorptionTop="true" @change="onChangeTab" />

		<view class="categoy-list">
			<view v-for="item in list" :key="item.name" class="categoy-list-item" @click="onClickItem(item)">
				<view class="categoy-list-item-icon"><h-icon :path="item.icon" width="30" /></view>
				<view class="categoy-list-item-text">{{ item.name }}</view>
			</view>
		</view>

		<popup-keyboard ref="popupKeyboard" :obj="currentItem" />
	</view>
</template>

<script>
import hTabsItem from '@/components/h-tabs-item';
import popupKeyboard from './modules/popup-keyboard';
export default {
	components: { hTabsItem, popupKeyboard },
	data() {
		return {
			navList: [{ label: '支出', value: 0 }, { label: '收入', value: 1 }, { label: '余额', value: 2 }, { label: '计划', value: 3 }],
			current: 0,
			list: [],
			expenditureList: [], // 支出列表
			incomeList: [], // 收入列表
			balanceList: [], // 余额列表
			planList: [], // 计划列表
			currentItem: {} // 当前点击的
		};
	},
	computed: {},
	mounted() {
		this.getExpenfitureCategoryList();
	},
	methods: {
		//tab点击
		onChangeTab(index, item) {
			this.current = index;
			if (index == 0) {
				this.getExpenfitureCategoryList();
			} else if (index == 1) {
				this.getIncomeCategoryList();
			} else if (index == 2) {
				this.getBalanceCategoryList();
			} else if (index == 3) {
				this.getPlanCategoryList();
			}
		},

		/* 请求 收入分类列表 */
		async getExpenfitureCategoryList() {
			try {
				let { data } = await this.$api.getExpenfitureCategoryList();
				this.list = data;
			} catch (e) {
				console.error('收入分类列表', e);
			}
		},

		/* 请求 支出分类列表 */
		async getIncomeCategoryList() {
			try {
				let { data } = await this.$api.getIncomeCategoryList();
				this.list = data;
			} catch (e) {
				console.error('支出分类列表', e);
			}
		},

		/* 请求 余额分类列表 */
		async getBalanceCategoryList() {
			try {
				let { data } = await this.$api.getBalanceCategoryList();
				this.list = data;
			} catch (e) {
				console.error('余额分类列表', e);
			}
		},

		/* 请求 计划分类列表 */
		async getPlanCategoryList() {
			try {
				let { data } = await this.$api.getPlanCategoryList();
				this.list = data;
			} catch (e) {
				console.error('计划分类列表', e);
			}
		},

		/* 点击 列表某行数据 */
		onClickItem(item) {
			this.currentItem = item;
			this.$refs.popupKeyboard.show();
		}
	}
};
</script>

<style lang="scss" scoped>
.categoy-list {
	display: flex;
	flex-flow: wrap row;
	padding-top: 110rpx;
	padding-bottom: 40rpx;
	&-item {
		width: 148rpx;
		text-align: center;
		margin: 10rpx 20rpx 15px;
		&-icon {
			width: 130rpx;
			height: 130rpx;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #ececec;
			border-radius: 50%;
			overflow: hidden;
		}
		.active {
			background: $theme;
		}
		&-text {
			font-size: 28rpx;
			text-align: center;
			padding: 10rpx 2rpx;
		}
	}
}
</style>
