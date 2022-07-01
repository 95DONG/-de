import request from '@/utils/request'

/**
 *用户信息接口
 * @returns
 */
export const userInfoApi = () => {
  return request({
    url: 'user'
  })
}

export const userLoginInfoApi = (data) => {
  return request({
    method: 'POST',
    url: 'user/login',
    data
  })
}
