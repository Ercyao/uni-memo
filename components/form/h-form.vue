<template>
	<form><slot></slot></form>
</template>

<script>
export default {
	name: 'h-form',
	props: {
		model: { type: Object }, //form表单数据
		rules: { type: Object }, //form表单规则
		labelPosition: { type: String, default: '' },
		labelWidth: { type: String, default: '' },
		labelSuffix: { type: String, default: '' },
		size: { type: String, default: '' }
	},
	provide() {
		return { form: this };
	},
	data() {
		return { fields: [] };
	},
	created() {},
	methods: {
		// 判断是否不是空
		isEmpty(value) {
			if (value === null || value === '' || value === 'undefined' || value === undefined || value === 'null') {
				return false;
			} else {
				value = value !== 0 ? JSON.parse(JSON.stringify(value).replace(/\s+/g, '')) : value;
				if (value === '') {
					return false;
				}
				return true;
			}
		},

		// 登录验证
		async validate(callback) {
			if (typeof this.model !== 'object' || typeof this.rules !== 'object') {
				uni.showToast({
					title: '验证失败',
					icon: 'none'
				});
				return callback(false);
			}

			// 空对象
			if (JSON.stringify(this.rules) == '{}') {
				return callback(true);
			}

			let j = 0;
			for (let i in this.rules) {
				j++;
				if (!this.isEmpty(this.model[i])) {
					uni.showToast({ title: this.rules[i].message, icon: 'none' }); // 是否是空
					return callback(false);
				} else if (this.rules[i].min && this.rules[i].min > 0 && this.model[i].length < this.rules[i].min) {
					uni.showToast({ title: this.rules[i].lenMessage || this.rules[i].message, icon: 'none' }); // 最小长度
					return callback(false);
				} else if (this.rules[i].max && this.rules[i].max > 0 && this.model[i].length < this.rules[i].max) {
					uni.showToast({ title: this.rules[i].lenMessage || this.rules[i].message, icon: 'none' }); // 最大长度
					return callback(false);
				}  else if (this.rules[i].type && this.rules[i].type === 'phoneNumber' && this.model[i].length !== this.$store.state.phoneLength) {
					uni.showToast({ title: this.rules[i].lenMessage || this.rules[i].message, icon: 'none' }); // 正确手机号
					return callback(false);
				}  else if (this.rules[i].type && this.rules[i].type === 'password' && this.$store.state.isPasswordError) {
					uni.showToast({ title: this.rules[i].errMessage || this.rules[i].message, icon: 'none' }); // 正确手机号
					return callback(false);
				} else if (j >= Object.keys(this.rules).length) {
					return callback(true);
				}
				// console.log('长度', i, this.model[i].length, this.rules[i].min, this.rules[i].max);
			}
		}
	}
};
</script>

<style lang="scss" scoped></style>
