<script>
export default {
	onLaunch: function() {
		uni.onTabBarMidButtonTap(() => {
			console.log(333333)
			uni.navigateTo({
				url: 'pages/record/index'
			});
		});
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
.hide {
	display: none;
}
.show {
	display: block;
}
.text-wrap {
	word-wrap: break-word;
}
/*每个页面公共css */
page {
	font-family: PingFang SC;
	color: #333333;
	font-size: 26rpx;
	width: 100%;
	overflow-x: hidden;
}
image {
	content: normal !important;
	border: 0 none;
	max-width: 100%;
	height: auto;
	letter-spacing: 0;
}
.main-container {
	width: 100%;
	/* #ifdef MP-WEIXIN */
	min-height: 100vh;
	/* #endif */
	/* #ifdef H5 */
	// min-height: 93.2vh;
	min-height: 85vh;
	/* #endif */
	overflow-x: hidden;
	box-sizing: border-box;
}
.text-ellipsis {
	width: 100%;
	display: inline-block;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	vertical-align: middle;
}
.text-ellipsis-two {
	width: 100%;
	// display: inline-block;
	display: block;
	display: -webkit-box;
	word-wrap: break-word;
	word-break: break-all;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}

.item-flex-between {
	display: flex;
	justify-content: space-between;
}
.item-flex-around {
	display: flex;
	justify-content: space-around;
}
.item-flex-start {
	display: flex;
	justify-content: flex-start;
}
.item-flex-end {
	display: flex;
	justify-content: flex-end;
}
.align-center {
	align-items: center;
}
.align-middle {
	vertical-align: middle;
}

.tip-text {
	font-size: 26rpx;
	color: #bcbcbe;
	padding: 20rpx 0;
}
.list-bottom-tip-text {
	display: block;
	width: 100%;
	font-size: 28rpx;
	color: #bcbcbe;
	box-sizing: border-box;
	padding: 52rpx 10rpx;
	text-align: center;
}
.data-load-text{
	width: 100%;
	font-size: 28rpx;
	color: #b6b6b6;
	text-align: center;
	padding: 20rpx 0;
}
.center {
	text-align: center;
}
.arrow-white {
	&::before {
		border-color: #fff !important;
	}
	&::after {
		border-color: #fff !important;
	}
}
.icon-arrow-right,
.icon-arrow-down,
.icon-arrow-up {
	&::after {
		content: '';
		display: inline-block;
		width: 12rpx;
		height: 12rpx;
		border-width: 0 3rpx 3rpx 0;
		border-color: #797979;
		border-style: solid;
		vertical-align: middle;
		margin-left: 10rpx;
	}
}
.icon-arrow-left {
	&::before {
		content: '';
		display: inline-block;
		width: 12rpx;
		height: 12rpx;
		border-width: 0 3rpx 3rpx 0;
		border-color: #797979;
		border-style: solid;
		vertical-align: middle;
		transform: rotate(135deg);
		margin-right: 15rpx;
	}
}
.icon-arrow-right {
	&::after {
		transform: rotate(-45deg);
	}
}
.icon-arrow-up {
	&::after {
		transform: rotate(-135deg);
	}
}
.icon-arrow-down {
	&::after {
		transform: translateY(-7rpx) rotate(45deg);
	}
}

.loader-box {
	text-align: center;
	padding: 40rpx 10rpx;
}

.loader-01 {
	display: inline-block;
	width: 25rpx;
	height: 25rpx;
	margin-right: 14rpx;
	color: inherit;
	vertical-align: middle;
	pointer-events: none;
	border: 4rpx solid #969799;
	border-bottom-color: transparent;
	border-radius: 50%;
	animation: 1s loader-01 linear infinite;
	position: relative;
}

@keyframes loader-01 {
	0% {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}
</style>
