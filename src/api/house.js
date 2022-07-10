import request from '@/utils/request'

/**
 *发布房源所需的数据
 * @returns
 */
export const publishHouse = (authorization) => {
  return request({
    url: '/houses/params',
    params: {
      authorization
    }
  })
}
