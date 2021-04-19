<template>
	<!-- 按钮 -->
	<view class="h-button-box" :class="[block ? 'block' : '']">
		<view class="h-button" :class="[type, size, plain ? 'plain' : '']" @click="onClick" v-if="!disabled && !to">
			<navigator :url="to" hover-class="navigator-hover" v-if="to"><slot></slot></navigator>
			<text v-if="!to" :style="{ fontSize: fontSize + 'rpx' }"><slot></slot></text>
		</view>

		<navigator :url="to" hover-class="navigator-hover" v-if="!disabled && to">
			<view class="h-button" :class="[type, size, plain ? 'plain' : '']" @click="onClick">
				<text :style="{ fontSize: fontSize + 'rpx' }"><slot></slot></text>
			</view>
		</navigator>

		<view class="h-button disabled" :class="[type, size, plain ? 'plain' : '']" v-if="disabled">
			<text v-if="!to" :style="{ fontSize: fontSize + 'rpx' }"><slot></slot></text>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		type: {
			// primary info
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		size: {
			//large  normal  small  mini
			type: String,
			default: ''
		},
		to: {
			type: String,
			default: ''
		},
		block: {
			type: Boolean,
			default: false
		},
		plain: {
			type: Boolean,
			default: false
		},
		fontSize: {
			type: String,
			default: ''
		}
	},
	data() {
		return {};
	},
	methods: {
		onClick() {
			this.$emit('click');
		}
	}
};
</script>

<style lang="scss" scoped>
.h-button-box {
	display: inline-block;
}
.h-button {
	min-width: 156rpx;
	height: 58rpx;
	line-height: 56rpx;
	background: #fff;
	color: #1e1d19;
	border: 2rpx solid rgba(102, 102, 102, 1);
	border-radius: 3rpx;
	padding: 0 12rpx;
	font-size: 28rpx;
	// font-weight: bold;
	text-align: center;
	box-sizing: border-box;
	white-space: nowrap;
}
.h-button.large {
	font-size: 30rpx;
	min-width: 184rpx;
	height: 64rpx;
}
.h-button.normal {
	min-width: 213rpx;
	height: 64rpx;
}
.h-button.small {
	font-size: 28rpx;
	min-width: 156rpx;
	height: 56rpx;
}
.h-button.mini {
}
.h-button-box.block {
	display: block;
	.h-button {
		width: 100%;
		height: 81rpx;
		line-height: 81rpx;
	}
}
.h-button.disabled {
	opacity: 0.4;
}

.h-button.primary {
	color: rgba(255, 255, 255, 1);
	background: rgba(30, 29, 25, 1);
	border: 2rpx solid rgba(30, 29, 25, 1);
}
.h-button.primary.plain {
	color: rgba(30, 29, 25, 1);
	background: #fff !important;
}

.h-button.info {
	color: rgba(255, 255, 255, 1);
	background: rgba(214, 187, 109, 1);
	border: 2rpx solid rgba(214, 187, 109, 1);
}
.h-button.info.plain {
	color: rgba(214, 187, 109, 1);
	background: #fff !important;
}
</style>
