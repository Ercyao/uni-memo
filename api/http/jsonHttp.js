import {
	localGet,
	localSet,
	localRemove
} from '@/libs/storage.js'

const obj = {
	code: '00',
	message: '成功',
	data: null
}


/* 新增 */
export const _insert = (url, params) => {
	obj.data = []
	if (localGet(url)) {
		obj.data = localGet(url).data
	}
	params.id = obj.data.length > 0 ? obj.data[obj.data.length - 1].id + 1 : 1
	obj.data.push(params)

	localSet(url, obj)
	return obj
}

/* 删除 */
export const _delete = (url, params) => {
	obj.data = []
	let list = localGet(url).data
	obj.data = list.filter(item => item.id != params.id)

	localSet(url, obj)
	return obj
}

/* 更改 */
export const _update = (url, params) => {
	obj.data = []
	let list = localGet(url).data
	let index = list.findIndex(item => item.id == params.id)

	if (list.length > 0 && index > -1) {
		obj.data = list.splice(index, 1, params) // 替换
		localSet(url, obj)
	}

	return obj
}

/* 查询详情 */
export const _select = (url, params) => {
	obj.data = {}
	let list = localGet(url).data
	let arr = list.filter(item => item.id == params.id)
	if (arr.length > 0) {
		obj.data = arr[0]
	}
	
	return obj
}

/* 查询列表 */
export const _selectAll = (url, params) => {
	let data = localGet(url).data
	obj.data = {}
	obj.data.list = []
	obj.data.total = data.length
	if (params && params.page && params.size && data.length > 0) {
		obj.data.list = data.slice(page * size - size - 1, page * size)
	} else {
		obj.data.list = data
	}
	return obj
}
