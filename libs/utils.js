/* 
 ** 公共工具方法
 */


/* 相加   fixed代表几位小数点，如2,3等 */
export const accAdd = (arg1, arg2, fixed, type = 'number') => {
  let val1 = (arg1 === 'NaN' || !arg1) ? 0 : arg1
  let val2 = (arg2 === 'NaN' || !arg2) ? 0 : arg2
  let num = (!fixed || fixed < 3) ? 100 : Math.pow(10, fixed)
  // console.log('相加', val1, val2)

  if (type == 'number') {
    return Number(((parseInt(val1 * num) + parseInt(val2 * num)) / num).toFixed(fixed))
  } else {
    return String(((parseInt(val1 * num) + parseInt(val2 * num)) / num).toFixed(fixed))
  }

}

/* 相减   fixed代表几位小数点，如2,3等 */
export const accMinus = (arg1, arg2, fixed, type = 'number') => {
  let val1 = (arg1 === 'NaN' || !arg1) ? 0 : arg1
  let val2 = (arg2 === 'NaN' || !arg2) ? 0 : arg2
  let num = (!fixed || fixed < 3) ? 100 : Math.pow(10, fixed)
  // console.log('相减', val1, val2)

  if (type == 'number') {
    return Number(((parseInt(val1 * num) - parseInt(val2 * num)) / num).toFixed(fixed))
  } else {
    return String(((parseInt(val1 * num) - parseInt(val2 * num)) / num).toFixed(fixed))
  }
}

/* 相乘   fixed代表几位小数点，如2,3等 */
export const accMult = (arg1, arg2, fixed, type = 'number') => {
  let val1 = (arg1 === 'NaN' || !arg1) ? 0 : arg1
  let val2 = (arg2 === 'NaN' || !arg2) ? 0 : arg2
  let num = (!fixed || fixed < 3) ? 100 : Math.pow(10, fixed)
  // console.log('相乘', val1, val2)

  if (type == 'number') {
    return Number((parseInt((val1 * num) * (val2 * num)) / num / num).toFixed(fixed))
  } else {
    return String((parseInt((val1 * num) * (val2 * num)) / num / num).toFixed(fixed))
  }
}

/* 相除   fixed代表几位小数点，如2,3等 */
export const accDivide = (arg1, arg2, fixed, type = 'number') => {
  let val1 = (arg1 === 'NaN' || !arg1) ? 0 : arg1
  let val2 = (arg2 === 'NaN' || !arg2) ? 0 : arg2
  if (val1 === '0.00' || val1 === 0 || val1 === '0') return 0
  if (val2 === '0.00' || val2 === 0 || val2 === '0') return 0
  let num = (!fixed || fixed < 3) ? 100 : Math.pow(10, fixed)
  // console.log('相除', val1, val2)

  if (type == 'number') {
    return Number((parseInt((val1 / val2) * num) / num).toFixed(fixed))
  } else {
    return String((parseInt((val1 / val2) * num) / num).toFixed(fixed))
  }
}




/**
 * 判断一个变量是否是空
 * true：是空  false：不是空的
 * @param    {string}   value    变量 
 **/
export const isEmpty = (value) => {
  if (value === null || value === '' || value === 'undefined' || value === undefined || value === 'null') {
    return true
  } else {
    value = value !== 0 ? JSON.parse(JSON.stringify(value).replace(/\s+/g, '')) : value
    if (value === '') {
      return true
    }
    return false
  }
}


/**
 * 获取地址栏参数值
 * @param    {string}   name    参数名
 **/
export const getQueryString = (name) => {
  let val = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
  return val
}


/**
 * 判断一个变量是不是数组
 * true：是数组  false：不是数组
 * @param    {any}   o    变量
 **/
export const isArray = (o) => {
  return Object.prototype.toString.call(o) == '[object Array]';
}


/**
 * 判断一个变量是不是对象
 * true：是对象  false：不是对象
 * @param    {any}   o    变量
 **/
export const isObj = (o) => {
  return Object.prototype.toString.call(o) == '[object Object]';
}

/**
 * 根据value 找到数组options的 label
 * @param    {array}              arr         数组
 * @param    {number|string}      value       值
 **/
// 找到数组options的值
export const findLabel = (arr, value) => {
  let item = arr.find(item => String(item.value) === String(value))
  return item ? item.label : '-'
}


/**
 * 将时间转成字符串格式，如2020-10-19 或 2020-10-19 11:22:03
 * @param    {number}   val    哪天  -1：昨天， 0：今天，
 **/
export const parseDate = (val, isHasTime, type) => {
  let date = new Date();
  date.setDate(date.getDate() + val);
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth(),
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  let format = !isHasTime ? '{y}-{m}-{d}' :
    '{y}-{m}-{d} {h}:{i}:{s}'

  if (type == 'start') {
    format.h = '00'
    format.i = '00'
    format.s = '00'
  } else if (type == 'end') {
    format.h = '23'
    format.i = '59'
    format.s = '59'
  }
  // let format = [' 00:00:00', ' 23:59:59']

  //  str.padStart(targetLength,string)：
  // 使用指定字符串填充到目标字符串前面，使其达到目标长度；
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}
