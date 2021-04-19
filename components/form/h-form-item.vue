<template>
	<view class="h-form-item" :class="[form.size, border ? 'border' : '']">
		<view :class="position">
			<text v-if="label" :style="{ width: form.labelWidth + 'rpx' }" class="h-form-item-label" :class="[required ? 'icon-star' : '']">
				{{ label }}{{ form.labelSuffix || '' }}
			</text>
			<view class="h-form-item-content"><slot></slot></view>
		</view>
	</view>
</template>
<script>
export default {
	name: 'h-form-item',
	props: {
		label: { type: String, default: '' },
		prop: { type: String },
		required: { type: Boolean, default: false },
		border: { type: Boolean, default: false },
		labelPosition: { type: String, default: 'flex-start-left' }
	},
	inject: ['form'],
	data() {
		return {
			isRequired: false,
			position: 'flex-start-left',
			errorMessage: ''
		};
	},
	computed: {
		fieldValue() {
			return this.form.model[this.prop];
		}
	},
	mounted() {
		this.setStyle();
	},
	methods: {
		setStyle() {
			switch (this.form.labelPosition) {
				case 'left':
					this.position = 'flex-start-left';
					break;
				case 'right':
					this.position = 'flex-start-right';
					break;
				case 'top':
					this.position = 'flex-top';
					break;
				default:
					this.position = 'flex-start-left';
			}

			switch (this.labelPosition) {
				case 'left':
					this.position = 'flex-start-left';
					break;
				case 'right':
					this.position = 'flex-start-right';
					break;
				case 'top':
					this.position = 'flex-top';
					break;
				default:
					this.position = 'flex-start-left';
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.h-form-item {
	position: relative;
	font-size: 32rpx;
	padding: 34rpx 0 36rpx;
	margin: 0 40rpx;
	&:last-child {
		border-bottom: 0;
	}

	.h-form-item-label {
		font-size: 30rpx;
		display: inline-block;
		margin-right: 32rpx;
	}

	.h-form-item-content {
		flex: 1;
	}

	.icon-star {
		&::after {
			content: '*';
			font-size: 28rpx;
			color: #0f88eb;
			margin-left: 4rpx;
			margin-right: 9rpx;
		}
	}

	.flex-start-left,
	.flex-start-right {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.flex-start-left {
		.h-form-item-label {
			text-align: left;
		}
	}
	.flex-start-right {
		.h-form-item-label {
			text-align: right;
		}
	}

	.flex-top {
		.h-form-item-content {
			padding: 30rpx 0 10rpx;
		}
	}
}
.h-form-item.normal {
	padding: 40rpx 0;
	.h-form-item-label {
		font-size: 32rpx;
	}
}
.h-form-item.border {
	border-bottom: 2rpx solid #e9ebee;
}
</style>
