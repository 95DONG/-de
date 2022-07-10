import request from '@/utils/request'

/**
 *
 * @param {String} id 传回城市ID
 * @returns
 */
export const mapInfo = (id = 'AREA|88cff55c-aaa4-e2e0') => {
  return request({
    url: '/area/map',
    method: 'GET',
    params: {
      id
    }
  })
}
