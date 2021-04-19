<template>
	<image
		class="h-icon"
		:class="[size, align]"
		:style="{ width: width + 'rpx', height: height + 'rpx' }"
		:src="iconSrc"
		:mode="mode"
		@click="onClick"
		@error="handleError"
	></image>
</template>

<script>
export default {
	props: {
		path: {
			type: String,
			default: 'primary'
		},
		size: {
			//large  normal  small  mini
			type: String,
			default: ''
		},
		width: {
			type: String,
			default: '29'
		},
		height: {
			type: String,
			default: '29'
		},
		align: {
			type: String,
			default: ''
		},
		mode: {
			type: String,
			default: 'widthFix' //宽度不变，高度自动变化，保持原图宽高比不变
		}
	},
	data() {
		return {};
	},
	computed: {
		iconSrc: {
			get() {
				// console.log('iconSrc')
				return '/static/img/' + this.path + '.png';
			},
			set() {}
		}
	},
	methods: {
		onClick() {
			this.$emit('click');
		},

		handleError() {
			// console.log('handleError', this.iconSrc);
			this.iconSrc = '/static/img/error.png'; //require('@/static/img/error.png');
		}
	}
};
</script>

<style lang="scss" scoped>
.h-icon.top {
	vertical-align: top;
}
.h-icon.middle {
	vertical-align: middle;
}
.h-icon {
	width: 29rpx;
	vertical-align: bottom;
	margin: 0 5rpx;
}
.h-icon.large {
	width: 36rpx;
}
.h-icon.normal {
	width: 29rpx;
}
.h-icon.small {
	width: 24rpx;
}
.h-icon.mini {
	width: 19rpx;
}
</style>
