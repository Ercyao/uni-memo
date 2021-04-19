import base from './config'
import md5 from '@/libs/md5.js'
import store from '@/store'




// 是不是对象
const isObject = (o) => {
	return Object.prototype.toString.call(o) == '[object Object]';
}

const dataObj = (url, params, noToken) => {

	let shareParams = uni.getStorageSync('shareParams') ? JSON.parse(uni.getStorageSync('shareParams')) : {}

	let options = {
		...shareParams,
		...params,
		USER_SESS_ID: token,
		session_id_sign: md5(token + '43sw3liblll3288799eegw')
	}
	if (options.fuser) {
		options.spread_user = shareParams.fuser
		delete options.fuser
	}

	// console.log('请求参数options', options)

	return options
}

// 请求错误处理
const checkError = (e, reject) => {
	let message = '接口錯誤'

	if (e.data) {
		if (e.data.status) {
			switch (e.data.status) {
				case 401:
					uni.clearStorageSync();
					uni.navigateTo({
						url: '/pages/login/Login'
					}); //未授权，请重新登录(401)
					break;
				case 400:
					message = '參數錯誤'
					break;
				default:
					uni.showToast({
						title: e.data.message,
						icon: 'none'
					});
					break;
			}
		}

		console.error('错误:' + message)
		reject(e.data)
	} else {
		console.error("----接口错误----", e)
		// reject(e)
		let data = "{'message': '接口錯誤'}"
		reject(data)
	}
}


// 封装请求
export const request = (method, url, options) => {
	setUserToken();
	
	let methods = '';
	let headers = {};
	switch (method) {
		case 'get':
			methods = 'GET'
			headers = {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			}
			break;
		case 'post':
			methods = 'POST'
			headers = {
				'Content-Type': 'application/json; charset=UTF-8'
			}
			break;
		case 'postForm':
			methods = 'POST'
			headers = {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
			break;
	}

	let hideLoading = false,
		loadText = "loading...",
		noToken = false;
	if (options) { //如果有options
		if (options.hideLoading) {
			hideLoading = options.hideLoading
			delete options.hideLoading
		}
		if (options.loadText) {
			loadText = options.loadText
			delete options.loadText
		}
		if (options.noToken) {
			noToken = options.noToken
			delete options.noToken
		}
	}

	// 增加参数sslVerify，设置为false，不验证 ssl 证书
	// http换成https
	// 使用普遍受信的证书
	// localhost换成本地ip
	var promise = new Promise((resolve, reject) => {
		// 解决请求还没结束就重复请求的问题
		if (url == uni.getStorageSync('requestUrl')) {
			return
		} else {
			uni.setStorageSync('requestUrl', url)
		}

		!hideLoading && uni.showLoading({
			title: loadText
		})
		let requestTask = uni.request({
			url: `${base.BASE_URL}${url}`,
			method: methods,
			data: dataObj(url, options, noToken),
			sslVerify: false, //设置为false，不验证 ssl 证书
			header: headers,
			success: res => {
				onHasShopChange(res)

				if (res.data && res.data.status == 0) {
					resolve(res.data)
				} else {
					checkError(res, reject)
				}
			},
			fail: e => {
				checkError(e, reject)
			},
			complete: () => {
				uni.hideLoading()
				uni.removeStorageSync('requestUrl'); //如果请求完清除
			}
		})

		getApp() && (getApp().requestTasks = requestTask)
	})

	return promise
}


// 上传文件 封装请求
const uploadFile = (url, options) => {
	uni.showLoading({
		title: "上传中..."
	})

	// let token = uni.getStorageSync('token') || ''
	// if (!token) {
	// 	return uni.navigateTo({
	// 		url: '/pages/login/Login'
	// 	})
	// }

	let tempData = {}

	tempData = {
		...options,
		USER_SESS_ID: token,
		session_id_sign: md5(token + '43sw3liblll3288799eegw')
	}

	let fileName = '',
		file = '';
	if (tempData.fileName) {
		fileName = options.fileName
		delete options.fileName
	}
	if (tempData.file) {
		file = options.file
		delete options.file
	}
	tempData[fileName] = file
	// console.log('tempData', tempData)

	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: `${base.BASE_URL}${url}`,
			filePath: file,
			name: fileName,
			formData: tempData,
			success: res => {
				if (res.statusCode == 200) {
					let temp = res.data && JSON.parse(res.data)
					// console.log('temp', temp)
					if (temp.status == 0 || temp.status == 200 || temp.status == "00") {
						resolve(temp)
					} else {
						reject(temp)
						uni.showToast({
							title: res.message || '接口错误(' + temp.status + ')',
							icon: 'none'
						})
					}
				} else {
					uni.showToast({
						title: `未知错误(${res.statusCode})`,
						icon: 'none'
					})
				}
			},
			fail(e) {
				uni.showToast({
					title: '接口请求超时',
					icon: 'none'
				})
				reject(e.data)
			},
			complete: () => {
				uni.hideLoading()
			}
		});
	})
}

export default {
	get: (url, options) => {
		return request('get', url, options)
	},

	// JOSN格式
	post: (url, options) => {
		return request('post', url, options)
	},

	// form-data格式
	postForm: (url, options) => {
		return request('postForm', url, options)
	},

	// 上传
	upload: (url, options) => {
		return uploadFile(url, options)
	}
}
