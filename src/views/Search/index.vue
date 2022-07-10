<template>
  <div style="position: relative">
    <van-search round show-action placeholder="请输入搜索关键词">
      <template #label>
        <div @click="onClick">
          {{ city ? city : "北京" }}
        </div>
      </template>
      <template #action>
        <div @click="onMap"><van-icon name="location" /></div>
      </template>
    </van-search>
  </div>
</template>

<script>
// import { getAreaInfo } from '@/api/city'
export default {
  created () {
    // 调用查询城市信息
    // this.getAreaInfo()
  },
  data () {
    return {
      city: this.$store.state.user.cityobj.label// 获取当前城市数据
    }
  },
  methods: {
    // 左侧城市跳转城市列表
    onClick () {
      // console.log(1)
      this.$router.push('/citylist')
    },
    // 地图点击跳转页面
    onMap () {
      this.$router.push('/map')
    }
    // 根据城市名称查询该城市的信息
    // async getAreaInfo () {
    //   const res = await getAreaInfo()
    //   console.log(res)
    // }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-search {
  width: 100%;
  position: fixed;
  z-index: 1;
}
</style>
