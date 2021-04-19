/**
 * 本地数据存储（localStorage，sessionStorage）方法封装
 * 
 * @example：
 * 取： localGet(key)   或 localGet(key,'day')   或 localGet(key,'6000')           存： localSet(key,'1')
 * 取： sessionGet(key) 或 sessionGet(key,'day') 或 sessionGet(key,'6000')         存： sessionSet(key,'1')
 **/


let timeArr = {
  second: 1000 * 60, //过期时间为1分钟
  hour: 1000 * 60 * 60, //过期时间为1小时
  day: 1000 * 60 * 60 * 24, //过期时间为24小时
  week: 1000 * 60 * 60 * 24 * 7,//过期时间为1周
}


/* -----------------| sessionStorage 和 localstroge 封装 | - start ---------------- */
// 取
const get = (key, expireDate, type) => {
  if (!key) return

  // 固定几个默认给值 second hour day week
  if (expireDate && Object.keys(timeArr).includes(expireDate)) { expireDate = timeArr[expireDate] }

  let item = type === 'sessionStorage' ? sessionStorage.getItem(key) : localStorage.getItem(key)

  // 这点要判断是字符串还是对象
  let result = /^[{\[].*[}\]]$/g.test(item)

  result && (item = JSON.parse(item))

  if (item && item.time) {
    if (expireDate && (new Date().getTime() - item.time > expireDate)) {
      remove(key, type)
      console.log('信息已过期');
      return
    } else {
      if (JSON.stringify(item.data) == "{}" || JSON.stringify(item.data) == "[]") {
        return null
      } else {
        return item.data
      }
    }
  } else {
    return item
  }
}

// 存
const set = (key, value, type) => {
  if (!key) return

  let curTime = new Date().getTime();
  // 这点要判断是字符串还是对象
  let item = value

  typeof value !== "string" && (item = JSON.stringify({
    data: value,
    time: curTime
  }))

  if (JSON.stringify(item.data) == "{}" || JSON.stringify(item.data) == "[]") {
    return
  } else {
    type === 'sessionStorage' ? sessionStorage.setItem(key, item) : localStorage.setItem(key, item)
  }
}

// 删除
const remove = (key, type) => {
  if (!key) return
  type === 'sessionStorage' ? sessionStorage.removeItem(key) : localStorage.removeItem(key)
}


export const localGet = (key, expireDate) => {
  return get(key, expireDate, 'localStorage')
}

export const localSet = (key, value) => {
  return set(key, value, 'localStorage')
}

export const localRemove = (key) => {
  return remove(key, 'localStorage')
}

export const sessionGet = (key, expireDate) => {
  return get(key, expireDate, 'sessionStorage')
}

export const sessionSet = (key, value) => {
  return set(key, value, 'sessionStorage')
}

export const sessionRemove = (key) => {
  return remove(key, 'sessionStorage')
}

/* -----------------| sessionStorage 和 localstroge 封装 | - end ---------------- */


