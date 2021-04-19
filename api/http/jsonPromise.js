import {
	_insert,
	_delete,
	_update,
	_select,
	_selectAll
} from './jsonHttp'

/* json 名字  数组 */
const jsonList = ['/expenfitureCategory', '/incomeCategory', '/balanceCategory', '/planCategory']

/* 成功 json */
const success = require('@/static/json/success.json')

/* 失败 json */
const error = require('@/static/json/error.json')



/* 存 取  回调函数 */
const jsonPromise = (type, url, options) => {
	return new Promise((resolve, reject) => {
		let data
		if (type == 'get') {
			if (jsonList.indexOf(url) > -1) {
				data = require('@/static/json' + url + '.json')
				console.log('json', url)
			} else {
				data = _selectAll(url, options)
			}
			return data ? resolve(data) : reject(error)
		} else if (type == 'post') {
			_insert(url, options)
			return resolve(success)
		} else if (type == 'del') {
			_delete(url, options)
			return resolve(success)
		} else if (type == 'update') {
			_update(url, options)
			return resolve(success)
		} else if (type == 'detail') {
			data = _select(url, options)
			return resolve(data)
		}
	})
}

export default {
	get: (url, options) => {
		return jsonPromise('get', url, options)
	},

	post: (url, options) => {
		return jsonPromise('post', url, options)
	},

	update: (url, options) => {
		return jsonPromise('update', url, options)
	},

	del: (url, options) => {
		return jsonPromise('del', url, options)
	},

	detail: (url, options) => {
		return jsonPromise('detail', url, options)
	}
}
