<template>
  <div>
    <van-index-bar :index-list="caseArr">
      <span v-for="(item, key) in resultsCity" :key="key">
        <van-index-anchor :index="key">{{key}}</van-index-anchor>
        <van-cell :title="item1.label"  v-for="(item1,index) in item" :key="index"/>
      </span>
    </van-index-bar>
  </div>
</template>

<script>
import { getCityList } from '@/api/city'
export default {
  created () {
    this.getCityList()
  },
  data () {
    return {
      resultsCity: {}, // 用来存放最终的城市
      allCity: [], // 临时的数组 用来存放每一个首字母相同的城市
      cityList: [], // 所有城市数据
      caseArr: []// 城市首字母 处理完成
    }
  },
  methods: {
    async getCityList () {
      const res = await getCityList()
      // console.log(res.data.body)
      this.cityList = res.data.body
      const arr = []
      this.cityList.forEach(item => {
        // console.log(item.short[0].toUpperCase())
        arr.push(...item.short[0].toUpperCase())
        this.caseArr = [...new Set(arr)]
        this.caseArr = this.caseArr.sort()
      })
      this.caseArr.forEach(caseitem => {
        this.allCity = this.cityList.filter(item => {
          return caseitem === item.short[0].toUpperCase()
        })
        console.log(this.allCity)
        this.resultsCity[caseitem] = this.allCity
      })
      // console.log(arr)
      console.log(this.caseArr)
      console.log(this.resultsCity)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
