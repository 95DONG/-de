<template>
  <div class="main">
    <Search></Search>
    <van-swipe :autoplay="1000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="swiperimg" v-lazy="'http://liufusong.top:8080' + image" />
      </van-swipe-item>
    </van-swipe>
    <van-grid :border="flag" clickable :column-num="4">
      <van-grid-item icon="home-o" text="整租" to="/findhome"
        ><img src="@/assets/imges/下载 (1).png" alt="" />
        <p>整租</p></van-grid-item
      >
      <van-grid-item icon="home-o" text="整租" to="/findhome"
        ><img src="@/assets/imges/下载 (1).png" alt="" />
        <p>合租</p></van-grid-item
      >
      <van-grid-item icon="home-o" text="整租" to="/map"
        ><img src="@/assets/imges/下载 (1).png" alt="" />
        <p>地图找房</p></van-grid-item
      >
      <van-grid-item icon="home-o" text="整租" to="/renthouse"
        ><img src="@/assets/imges/下载 (1).png" alt="" />
        <p>去出租</p></van-grid-item
      >
    </van-grid>
    <div class="more">
      <div class="top">
        <p>
          租房小组
          <span>更多</span>
        </p>
      </div>
      <van-grid gutter="10px" direction="horizontal" :column-num="2">
        <van-grid-item icon="photo-o" v-for="item in groups" :key="item.id"
          ><div class="pic">
            <img :src="'http://liufusong.top:8080' + item.imgSrc" alt="" />
            <div>
              <p>{{ item.title }}</p>
              <p>{{ item.desc }}</p>
            </div>
          </div></van-grid-item
        >
      </van-grid>
    </div>
  </div>
</template>

<script>
import Search from '@/views/Search'
import { swipeApi, groupsApi } from '@/api/home'

export default {
  async created () {
    const res = await swipeApi()
    // console.log(res)
    res.data.body.forEach(item => {
      this.images.push(item.imgSrc)
    })

    const res1 = await groupsApi()
    // console.log('res1', res1)
    this.groups = res1.data.body
  },
  data () {
    return {
      images: [],
      groups: [],
      flag: false
    }
  },
  methods: {

  },
  computed: {},
  watch: {},
  filters: {},
  components: { Search }
}
</script>

<style scoped lang='less'>
.van-swipe .van-swipe-item img {
  width: 100%;
  // height: auto;
}
.main {
  position: relative;
}
.van-tabbar {
  // margin-top: 100px;
  position: absolute;
  top: 420px;
}
.more {
  font-size: 30px;
  padding-bottom: 15px;
  background-color: #f6f5f6;
  .top {
    padding-left: 30px;
    p {
      margin: unset;
      padding: 15px 0;
      span {
        position: fixed;
        right: 0;
        margin-right: 15px;
        font-size: 16px;
        color: rgb(160, 154, 154);
      }
    }
  }
  /deep/ .van-grid-item__content {
    border-radius: 10px;
    justify-content: unset;
    .pic {
      display: flex;

      img {
        width: 100px;
        margin-right: 20px;
      }
      div {
        flex: 1;
        p {
          margin: unset;
          font-size: 26px;
        }
      }
    }
  }
}
.van-grid-item {
  img {
    width: 120px;
    height: 120px;
  }
  p {
    font-size: 14px;
  }
}
.swiperimg {
  height: 424px;
  width: 100%;
}
</style>
