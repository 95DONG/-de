import request from '@/utils/request'
export const swipeApi = () => {
  return request({
    url: '/home/swiper'
  })
}

export const groupsApi = () => {
  return request({
    url: '/home/groups'
  })
}

export const getHouseCondition = (id) => {
  return request({
    url: '/houses/condition',
    params: {
      id
    }
  })
}
