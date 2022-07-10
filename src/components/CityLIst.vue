<template>
  <div>
    <van-nav-bar title="城市列表" left-arrow @click-left="$router.back(-1)" />
    <van-index-bar :index-list="arr">
      <van-index-anchor index="#">当前城市</van-index-anchor>
      <van-cell :title="cityobj ? cityobj : '北京'" />
      <van-index-anchor index="热">热门城市</van-index-anchor>
      <van-cell
        :title="item.label"
        @click="changeCity(item)"
        v-for="(item, index) in hotList"
        :key="index"
      ></van-cell>
      <span v-for="(item, key) in finallList" :key="key">
        <van-index-anchor :index="key">{{ key }}</van-index-anchor>
        <van-cell
          :title="inneritem.label"
          v-for="(inneritem, index) in item"
          :key="index"
          @click="changeCity(inneritem)"
        />
      </span>
    </van-index-bar>
  </div>
</template>

<script>
import { getCityList, getHotCityList } from '@/api/city'
export default {
  created () {
    this.getCityList()
    this.getHotCity()
  },
  data () {
    return {
      cityobj: this.$store.state.user.cityobj.label,
      newMiddle: [],
      arr: [], // 筛选完城的城市首字母大写
      upCase: [], // 大写字母初步数据 最终是无用
      firstList: [], // 初步城市数据 最终是无用
      middleList: [], // 存放字母对应的城市名称
      finallList: {}, // 最终拿到的城市数据
      hotList: [] // 热门城市列表
    }
  },
  methods: {
    async getCityList () {
      const res = await getCityList(1)
      // 将获取到的数据存放到数组里
      this.firstList = res.data.body
      // console.log(this.firstList)
      this.firstList.forEach(item => {
        this.upCase.push(item.short[0].toUpperCase())// 将城市首字母存放到数组里
      })
      // console.log(this.upCase)
      this.arr.push(...new Set(this.upCase))// 数组去重后添加进新数组arr里
      this.arr = this.arr.sort()// 数组排序后重新赋值给数组
      // console.log(this.arr)
      this.arr.forEach(item => {
        // 把北京 的城市数据筛选出来，放到热门城市里面
        this.middleList = this.firstList.filter(itemCity => {
          // if (itemCity.label === '北京') {
          //   this.finallList['热'] = [itemCity]
          // }
          // 双重循环，将每个首字母对应的城市放到一起，并存放到一个数组里
          return itemCity.short[0].toUpperCase() === item
        })
        // console.log(this.middleList)
        // 将首字母相同的城市数组以对应大写字母存放到对象中
        this.newMiddle = this.middleList.filter(item => item.label)
        // console.log(this.newMiddle)
        this.finallList[item] = this.middleList
      })
      this.finallList['#'] = [this.$store.state.user.cityobj]
      this.arr.unshift('#', '热')// 添加列表项

      // console.log(this.firstList)
      console.log(this.$store.state.user.cityobj)
    },
    async getHotCity () {
      const res = await getHotCityList()
      this.hotList = res.data.body
      console.log(this.hotList)
    },
    changeCity (value) {
      // this.$store.setCityObj(value)
      // console.log(1)
      // 点击返回上一级
      this.$router.go(-1)
      // 把对应的数据对象传到vuex中
      this.$store.commit('setCityObj', value)
      console.log(value)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/ .van-nav-bar__content {
  background-color: rgb(88, 182, 127);
  color: #fff;
}
// /deep/ .van-index-bar{
// background-color: pink;

// }
</style>
