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
