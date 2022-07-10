import request from '@/utils/request'
// 查看收藏
export const getCollectInfo = () => {
  return request({
    url: '/user/favorites',
    method: 'GET'
  })
}

// 添加收藏
export const addCollect = (id) => {
  return request({
    url: `/user/favorites/${id}`,
    method: 'POST'
  })
}

// 删除收藏
export const deleteCollect = (id) => {
  return request({
    url: `/user/favorites/${id}`,
    method: 'DELETE'
  })
}

// 返回是否收藏
export const isCollect = (id) => {
  return request({
    url: `/user/favorites/${id}`,
    method: 'GET'
  })
}
