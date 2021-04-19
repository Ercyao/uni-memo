<template>
	<!-- 懒加载图片 -->
	<view class="h-lazy-img-box" :class="[auto ? 'auto' : '']" :style="{ width: width ? width + 'rpx' : '100%', height: height ? height + 'rpx' : '100%', borderRadius: radius }">
		<image
			class="h-lazy-img"
			:class="[!hideLoad && isLoading ? 'absolute' : '']"
			:style="{ opacity: !hideLoad && isLoading ? 0 : 1 }"
			:src="imgSrc"
			:mode="mode"
			:show-menu-by-longpress="showMenuByLongpress"
			lazy-load
			@load="handleLoad"
			@error="handleError"
			@click="previewImage"
		></image>
		<!-- "/static/img/loading.gif" -->
		<image class="h-loading-img" :src="loadImg" :mode="mode" v-if="!hideLoad && isLoading"></image>
	</view>
</template>

<script>
export default {
	props: {
		src: {
			type: String,
			default: ''
		},
		width: {
			type: String,
			default: ''
		},
		height: {
			type: String,
			default: ''
		},
		radius: {
			type: String,
			default: ''
		},
		mode: {
			type: String,
			default: 'scaleToFill' //不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
		},
		showMenuByLongpress: {
			type: Boolean,
			default: false
		},
		hideLoad: {
			type: Boolean,
			default: false
		},
		auto: {
			type: Boolean,
			default: false
		},
		preview: {
			type: Boolean,
			default: false
		},
		previewIndex: {
			type: String,
			default: '0'
		},
		previewImg: {
			type: String,
			default: ''
		},
		isPreviewArr: {
			type: Boolean,
			default: false
		},
		previewList: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			isLoading: true,
			loadImg: this.$url.IMG_URL + '/static/img/loading.gif'
		};
	},
	computed: {
		imgSrc: {
			get() {
				if (this.src.indexOf('https://') > -1) {
					return this.src;
				} else {
					return this.$url.IMG_URL + this.src;
				}
			},
			set() {}
		}
	},
	methods: {
		handleLoad(e) {
			setTimeout(() => {
				this.isLoading = false;
			}, 300);
		},
		handleError() {
			this.isLoading = false;
			this.imgSrc = this.$url.IMG_URL + '/static/img/error.png'; //require('@/static/img/error.png');
		},
		previewImage() {
			if (this.preview) {
				if (this.isPreviewArr) {
					uni.previewImage({
						indicator: 'number',
						current: this.previewIndex, //  传 Number H5端出现不兼容
						urls: this.previewList
					});
				} else {
					uni.previewImage({
						current: this.previewIndex, //  传 Number H5端出现不兼容
						urls: this.previewImg ? [this.previewImg] : [this.src]
					});
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.auto {
	margin: 0 auto;
}
.h-lazy-img-box {
	position: relative;
	z-index: 1;
	overflow: hidden;
	.h-lazy-img {
		position: relative;
		z-index: 1;
		display: inline-block;
		width: 100%;
		height: 100%;
		will-change: transform;
	}
	.h-loading-img {
		position: relative;
		z-index: 1;
		display: inline-block;
		width: 100%;
		height: 100%;
	}
	.absolute {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
}
</style>
