<template>
	<view class="content">
		<view><h-icon :path="form.icon" width="30" /></view>
		<view>
			<view>
				<view>类型</view>
				<view>{{ form.category == 'expenfiture' ? '支出' : form.category == 'income' ? '收入' : form.category == 'balance' ? '余额' : '计划' }}</view>
			</view>
			<view>
				<view>金额</view>
				<view>{{ form.price }}</view>
			</view>
			<view>
				<view>日期</view>
				<view>{{ form.time }}</view>
			</view>
			<view>
				<view>备注</view>
				<view>{{ form.remark }}</view>
			</view>
		</view>

		<view class="record-detail-footer">
			<view class="item">修改</view>
			<view class="item" @click="onDel">删除</view>
			<!-- <h-button>删除</h-button> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: { icon: null, category: '', price: '', time: '', remark: '' },
			id: null
		};
	},
	onLoad(option) {
		this.id = option.id;
		this.getRecordDetail();
	},
	methods: {
		/* 请求 明细详情 */
		async getRecordDetail() {
			try {
				let { data } = await this.$api.getRecordDetail({ id: this.id });
				this.form = data;
				console.log('获取 明细详情', data);
			} catch (e) {
				console.error('获取 明细详情 失败', e);
			}
		},

		/* 删除 明细详情 */
		async delRecord() {
			try {
				await this.$api.delRecord({ id: this.id });
				uni.showToast({ title: '成功' });
				setTimeout(()=>{uni.navigateBack();},500)
			} catch (e) {
				uni.showToast({ title: '失败' });
				console.error('删除 明细详情 失败', e);
			}
		},

		onDel() {
			this.delRecord();
		}
	}
};
</script>

<style lang="scss" scoped>
.record-detail-footer {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	text-align: center;
	display: flex;
	border-top: 1rpx solid #ececec;
	.item {
		width: 50%;
		&:first-child {
			border-right: 1rpx solid #ececec;
		}
	}
}
</style>
