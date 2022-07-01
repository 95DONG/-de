import request from '@/utils/request'
export const getCityList = () => {
  return request({
    url: 'area/city/?level=1'
  })
}
