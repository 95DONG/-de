import request from '@/utils/request'
export const getCityInfo = (params) => {
  return request({
    method: 'GET',
    url: '/houses',
    params
  })
}
// 获取房屋具体信息
export const getHomeSpecific = (id) => {
  return request({
    url: `/houses/${id}`,
    method: 'GET'
  })
}
