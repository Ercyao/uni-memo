// import http from './http/request.js'  //没有用，全是本地数据

import http from './http/jsonPromise.js'

// export const getWxTmplIds = params => http.get(`appoint_wxmsgtpl`, params)


/* 获取支出的分类列表 */
export const getExpenfitureCategoryList = params => http.get(`/expenfitureCategory`, params)

/* 获取收入的分类列表 */
export const getIncomeCategoryList = params => http.get(`/incomeCategory`, params)

/* 获取余额的分类列表 */
export const getBalanceCategoryList = params => http.get(`/balanceCategory`, params)

/* 获取计划的分类列表 */
export const getPlanCategoryList = params => http.get(`/planCategory`, params)




/* 保存 添加的记账 */
export const postRecordAdd = params => http.post(`/record`, params)

/* 获取 记账列表 */
export const getRecordList = params => http.get(`/record`, params)

/* 获取 记账详情 */
export const getRecordDetail = params => http.detail(`/record`, params)

/* 获取 记账列表 */
export const delRecord = params => http.del(`/record`, params)