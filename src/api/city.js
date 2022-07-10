import request from '@/utils/request'

/**
 *获取所有城市列表
 level：1 代表所有城市
 level：2 代表城市下属区域
 * @param {*} level
 * @returns
 */
export const getCityList = (level) => {
  return request({
    url: 'area/city',
    params: { level }
  })
}

/**
 *获取热门城市列表
 * @returns
 */
export const getHotCityList = () => {
  return request({
    url: 'area/hot'
  })
}

/**
 *获取当前城市名称
 * @param {传入城市名称} name
 * @returns
 */
export const getAreaInfo = (name) => {
  return request({
    url: '/area/info',
    data: {
      name
    }
  })
}

/**
 *获取子级城市数据列表
 * @param {*} id
 * @returns
 */
export const getSonCity = (id) => {
  return request({
    url: '/houses/condition',
    params: {
      id
    }
  })
}

export const getVerbHouse = (params) => {
  return request({
    url: '/houses',
    params
  })
}
