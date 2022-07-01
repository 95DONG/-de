<template>
  <div style="position: relative" @click="$router.push('/citylist')">
    <van-search
      round
      v-model="value"
      show-action
      :label="city"
      :thisCity="thisCity"
      placeholder="请输入搜索关键词"
      @click="onSearch"
    >
      <template #action>
        <!-- <van-icon name="flag-o" /> -->
        <div>
          <i class="iconfont icon-ditu"></i>
        </div>
        <!-- <div @click="onSearch">搜索</div> -->
      </template>
    </van-search>
  </div>
</template>

<script>

export default {
  created () { },
  data () {
    return {
      value: '',
      city: '北京'
    }
  },
  methods: {
    onSearch () {
      console.log('onsearch')
    },
    thisCity (city) {
      this.thisCity = city
    }
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
