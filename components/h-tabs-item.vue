<template>
	<!-- tab切换 -->
	<view class="tabs-list" :class="[isAdsorptionTop ? 'tabs-fixed' : '', flex, border ? 'border' : '']">
		<view v-for="(item, index) in arr" :key="index" class="tabs-list-item" :class="{ active: current == index }" @click="tabClick(item, index)">
			{{ item.label }}
			<text v-if="isTotal">（{{ item.total }}）</text>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		arr: {
			type: Array,
			default: () => []
		},
		current: {
			type: Number,
			default: 0
		},
		flex: {
			type: String,
			default: 'space-around'
		},
		isAdsorptionTop: {
			//是否吸附顶部
			type: Boolean,
			default: false
		},
		isTotal: {
			type: Boolean,
			default: false
		},
		border: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			scrollLeft: 0
		};
	},
	methods: {
		tabClick(item, index) {
			this.$emit('change', index, item);
		}
	}
};
</script>

<style lang="scss" scoped>
.tabs-list {
	position: relative;
	z-index: 4;
	font-size: 28rpx;
	width: 100%;
	padding: 0 10rpx;
	box-sizing: border-box;
	background: #FFFFFF;
	display: flex;
	justify-content: space-between;

	.tabs-list-item {
		position: relative;
		color: #333333;
		padding: 22rpx 0 30rpx;
		margin: 0 23rpx;
		&.active {
			border-bottom: 2px solid $theme;
			color: $theme;
		}
	}
}
.tabs-fixed {
	position: fixed;
	/* #ifdef MP-WEIXIN */
	top: 0;
	/* #endif */

	/* #ifdef H5 */
	top: 80rpx;
	/* #endif */

	left: 0;
	right: 0;
	z-index: 9;
}
.tabs-list.border {
	border-bottom: 1rpx solid #f1f1f1;
}
.tabs-list.space-around {
	justify-content: space-around;
}
</style>
