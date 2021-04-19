<template>
	<view class="h-radio" :class="block ? '' : 'flex-flow'">
		<view class="h-radio-item" :style="{ minWidth: minWidth }" v-for="(item, index) in arr" :key="item.value" @click="onChange(item, index)">
			<view class="h-radio-radio"><h-icon :path="item.value === current ? 'icon/radio-active' : 'icon/radio'" /></view>
			<view class="h-radio-name" v-if="!isSlot">{{ item.label }}</view>
			<slot name="content"></slot>
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
		obj: {
			type: Object,
			default: () => {}
		},
		value: {
			type: String,
			default: ''
		},
		block: {
			type: Boolean,
			default: false
		},
		minWidth: {
			type: String,
			default: ''
		},
		isSlot: {
			type: Boolean,
			default: false
		}
	},
	components: {},
	data() {
		return {
			list: [],
			current: null // 0
		};
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			if (this.arr && this.arr.length > 0) {
				this.list = this.arr;
			}
			if (this.obj && this.obj.value) {
				this.list = [this.obj];
			}

			this.findIndex(this.value);
		},
		onChange(item, index) {
			this.findIndex(item.value);
		},
		findIndex(value) {
			this.current = value;
			this.$emit('change', value);
		}
	},
	watch: {
		value() {
			this.init();
		}
	}
};
</script>

<style lang="scss" scoped>
.flex-flow {
	display: flex;
	flex-flow: wrap row;
}
.h-radio {
	width: 100%;
	.h-radio-item {
		width: max-content;
		margin-right: 20rpx;
		margin-bottom: 30rpx;
		cursor: pointer;
		-webkit-user-select: none;
		user-select: none; //不要能被选中
		.h-radio-radio {
			display: inline;
			margin-right: 10rpx;
		}
		.h-radio-name {
			font-size: 24rpx;
			display: inline;
			white-space: nowrap;
		}
	}
}
</style>
