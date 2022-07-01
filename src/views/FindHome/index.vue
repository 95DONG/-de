<template>
  <div>
    <div class="top">
      <van-search
        show-action
        label="北京"
        background="rgb(88, 182, 127)"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
        <van-dropdown-item v-model="value2" :options="option2" />
        <van-dropdown-item v-model="value2" :options="option2" />
      </van-dropdown-menu>
      <div class="out">
        <img src="@/assets/imges/下载 (1).png" alt="" />
        <div>
          <h5>标题</h5>
          <span class="one">标签1</span>
          <span class="two">标签2</span>
          <span class="thr">标签3</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Search from '@/views/Search'
export default {
  created () { },
  data () {
    return {
      flag: false,
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ]
    }
  },
  methods: {
    onSearch () { }
  },
  computed: {},
  watch: {},
  filters: {}
  // components: { Search }
}
</script>

<style scoped lang='less'>
.out {
  display: flex;
  padding: 18px 0 0;
  img {
    width: 212px;
    height: 160px;
    margin: 0 16px 0 15px;
  }
  div {
    h5 {
      margin: unset;
      display: block;
      font-size: 32px;
      margin-bottom: 8px;
    }
    span {
      display: block;
      font-size: 12px;
    }
    .one {
      color: rgb(154, 151, 151);
    }
    .two {
      color: rgb(119, 195, 209);
      background-color: rgb(229, 244, 247);
      padding: 4px 10px;
      border-radius: 5px;
    }
    .thr {
      color: red;
      font-size: 30px;
    }
  }
}
</style>
