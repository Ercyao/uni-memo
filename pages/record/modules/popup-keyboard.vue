<template>
	<!-- 键盘弹窗 -->
	<view class="keyboard-box animation-slide-up" v-if="isShow">
		<view class="keyboard-header">
			<view class="keyboard-left">
				<view class="keyboard-label">备注：</view>
				<view class="keyboard-input"><input class="uni-input" v-model="form.remark" maxlength="10" placeholder="点击写备注" /></view>
			</view>
			<view class="keyboard-price">{{ form.price }}</view>
		</view>
		<view class="keyboard-content">
			<view class="keyboard-list">
				<view class="keyboard-item" v-for="(item, index) in keyboard" :key="index">
					<view v-if="item.value === -2" @click="onDeletePrice(item, index)"><h-icon path="icon/delete" width="60" /></view>
					<view v-if="item.value > -2" @click="onChangePrice(item, index)">{{ item.label }}</view>
				</view>
			</view>
			<view class="keyboard-content-right">
				<view class="keyboard-item">
					<!-- {{ form.time }} -->
					<picker mode="date" :value="form.time" :start="startDate" :end="endDate" @change="onChangeTime">
						<view class="uni-input">{{ form.time }}</view>
					</picker>
				</view>
				<view class="keyboard-item" @click="onAdd">+</view>
				<view class="keyboard-item" @click="onMinus">-</view>
				<view class="keyboard-item" @click="onConfirm" v-if="!isSum">完成</view>
				<view class="keyboard-item" @click="onSum" v-if="isSum">=</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		obj: {
			default: () => {},
			default: Object
		}
	},
	data() {
		const currentDate = this.getDate({ format: true });
		return {
			isShow: false,

			form: {
				remark: '', // 备注
				price: '0', // 记账价格
				time: currentDate, // 时间
				createDate: '', // 创建日期
				createTime: '', // 创建时间
				createDay: '' // 创建星期几
			},

			isSum: false, // 是否计算总和
			keyboard: [
				{ label: 1, value: 1 },
				{ label: 2, value: 2 },
				{ label: 3, value: 3 },
				{ label: 4, value: 4 },
				{ label: 5, value: 5 },
				{ label: 6, value: 6 },
				{ label: 7, value: 7 },
				{ label: 8, value: 8 },
				{ label: 9, value: 9 },
				{ label: '.', value: -1 },
				{ label: 0, value: 0 },
				{ label: '', value: -2 }
			]
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	methods: {
		/* 显示 */
		show() {
			this.isShow = true;
		},

		/* 隐藏 */
		hide() {
			this.isShow = false;
			this.form = { remark: '', price: '0', time: '2020/10/29' };
		},

		/* 改变时间 */
		onChangeTime(e) {
			this.form.time = e.target.value;
		},

		/* 处理日期 */
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 10;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},

		/* 处理 日期 时间 星期几 */
		getDateAndTimeAndDay(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			let hour = date.getHours();
			let minute = date.getMinutes();
			let second = date.getSeconds();
			let week = date.getDay();

			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			hour = hour > 9 ? hour : '0' + hour;
			minute = minute > 9 ? minute : '0' + minute;
			second = second > 9 ? second : '0' + second;
			if (type == 'date') {
				return `${year}年${month}月${day}日`;
			} else if (type == 'time') {
				return `${hour}:${minute}:${second}`;
			}  else if (type == 'day') {
				return ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][week];
			}else {
				return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
			}
		},

		/* 改变 价格 */
		onChangePrice(item, index) {
			if (this.form.price && String(this.form.price).split('.').length > 1 && String(this.form.price).split('.')[1].length > 1) return;

			// 判断有没有 加号 或  减号，有就显示等号
			if (String(this.form.price).indexOf('+') > -1 || String(this.form.price).indexOf('-') > -1) {
				this.isSum = true;
			}

			// 输入的是小数点，则跟label拼接，显示0.
			if (item.value === -1) {
				this.form.price = this.form.price + item.label;
			} else {
				this.form.price = this.form.price === '0' ? String(item.value) : this.form.price + String(item.value);
			}
		},

		/* 删除 价格 */
		onDeletePrice(item, index) {
			if (this.form.price === '0' || this.form.price.length === 1) return (this.form.price = '0');
			this.form.price = this.form.price.substring(0, this.form.price.length - 1);
		},

		// 点击 加号
		onAdd() {
			this.onSum();
			this.form.price = this.form.price + '+';
		},

		// 点击 减号
		onMinus() {
			this.onSum();
			this.form.price = this.form.price + '-';
		},

		// 计算价格总和
		onSum() {
			let priceArr;
			if (String(this.form.price).indexOf('+') > -1) {
				priceArr = this.form.price.split('+');
				this.form.price = this.$utils.accAdd(priceArr[0], priceArr[1]);
			} else if (String(this.form.price).indexOf('-') > -1) {
				priceArr = this.form.price.split('-');
				this.form.price = this.$utils.accMinus(priceArr[0], priceArr[1]);
			}
		},

		// 点击完成
		onConfirm() {
			let lastText = this.form.price[this.form.price.length - 1];
			if (lastText.indexOf('.') > -1 || lastText.indexOf('+') > -1 || lastText.indexOf('-') > -1) {
				this.form.price = this.form.price.substring(0, this.form.price.length - 1);
			}

			this.form.createDate = this.getDateAndTimeAndDay('date');
			this.form.createTime = this.getDateAndTimeAndDay('time');
			this.form.createDay = this.getDateAndTimeAndDay('day');
			console.log({ ...this.obj, ...this.form });
			this.postRecordAdd();

			this.$emit('confirm', this.form);
		},

		/* 保存 记账 */
		async postRecordAdd() {
			let options = { ...this.obj, ...this.form };
			try {
				let res = await this.$api.postRecordAdd(options);
				uni.showToast({ title: '成功' });
			
				setTimeout(()=>{uni.switchTab({ url: '/pages/list/index' });},500)
					this.hide()
			} catch (e) {
				uni.showToast({ title: '失败' });
				console.error('保存 记账', e);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.keyboard-box {
	position: absolute;
	bottom: 0;
	z-index: 99;
	width: 100%;
	// background: #f0f4f7;
	background: #ffffff;

	border-top: 1rpx solid #ececec;
	.keyboard-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 12rpx;
		.keyboard-left {
			font-size: 30rpx;
			display: flex;
			align-items: center;
			margin-right: 5rpx;
			.keyboard-label {
				display: inline-block;
				margin-right: 5rpx;
				width: 95rpx;
			}
			.keyboard-input {
				display: inline-block;
				input {
					font-size: 30rpx;
				}
			}
		}
		.keyboard-price {
			display: inline-block;
			font-size: 46rpx;
			width: 50%;
			text-align: right;
		}
	}
	.keyboard-content {
		font-size: 34rpx;
		display: flex;
		text-align: center;
		.keyboard-content-right {
			width: 25%;
			height: 120rpx;
			line-height: 120rpx;

			.keyboard-item {
				cursor: pointer;
				border-top: 1px solid #ececec;
				border-left: 1px solid #ececec;
				&:first-child {
					font-size: 30rpx;
				}
				&:last-child {
					color: #ffffff;
					background: $theme;
				}
			}
		}

		.keyboard-list {
			width: 75%;
			display: flex;
			display: -webkit-box;
			display: -webkit-flex;
			flex-flow: wrap row;
			text-align: center;
			border-top: 1rpx solid #ececec;
			.keyboard-item {
				width: 33.1%;
				height: 120rpx;
				line-height: 120rpx;
				cursor: pointer;
				&:nth-child(1),
				&:nth-child(2),
				&:nth-child(4),
				&:nth-child(5),
				&:nth-child(7),
				&:nth-child(8) {
					border-right: 1rpx solid #ececec;
					border-bottom: 1rpx solid #ececec;
				}
				&:nth-child(3),
				&:nth-child(6),
				&:nth-child(9) {
					border-bottom: 1rpx solid #ececec;
				}
				&:nth-child(11) {
					border-left: 1rpx solid #ececec;
					border-right: 1rpx solid #ececec;
				}
				&:nth-child(12) {
					line-height: 95rpx;
				}
				&:active {
					background: #ececec;
				}
			}
		}
	}
}

.animation-slide-up {
	animation: animation-slide-up 0.3s linear;
	-webkit-animation: animation-slide-up 0.3s linear;
}
@keyframes animation-slide-up {
	0% {
		opacity: 0;
		transform: translateY(100%);
	}
	20% {
		opacity: 0.2;
		transform: translateY(80%);
	}
	40% {
		opacity: 0.4;
		transform: translateY(60%);
	}
	60% {
		opacity: 0.6;
		transform: translateY(40%);
	}
	80% {
		opacity: 0.8;
		transform: translateY(20%);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

.animation-slide-down {
	animation: animation-slide-down 0.3s linear;
	-webkit-animation: animation-slide-down 0.3s linear;
}
@keyframes animation-slide-down {
	0% {
		opacity: 0;
		transform: translateY(0%);
	}
	20% {
		opacity: 0.2;
		transform: translateY(-20%);
	}
	40% {
		opacity: 0.4;
		transform: translateY(-40%);
	}
	60% {
		opacity: 0.6;
		transform: translateY(-60%);
	}
	80% {
		opacity: 0.8;
		transform: translateY(-80%);
	}
	100% {
		opacity: 1;
		transform: translateY(-100%);
	}
}
</style>
