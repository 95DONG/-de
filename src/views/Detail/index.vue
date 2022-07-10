<template>
  <div>
    <van-nav-bar
      class="navbar"
      :title="allHomeInfo.community"
      left-arrow
      @click-left="OnGoBack"
    />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="(item, index) in allHomeInfo.houseImg"
        :key="index"
      >
        <!-- 图片 -->
        <img :src="`http://liufusong.top:8080${item}`" alt="" class="swiper" />
      </van-swipe-item>
    </van-swipe>
    <div class="cenBox">
      <!-- 标题 -->
      <van-cell-group class="titleBox">
        <van-cell>
          <template #title>
            <span class="title">{{ allHomeInfo.community }}</span>
          </template>
          <template #label>
            <van-tag
              class="tag"
              type="success"
              v-for="(item, index) in allHomeInfo.tags"
              :key="index"
              >{{ item }}</van-tag
            >
          </template>
        </van-cell>
      </van-cell-group>
      <!-- 详细信息 -->
      <van-grid :border="false" :column-num="3" class="titleInfo">
        <van-grid-item>
          <template #icon>
            <p class="titleP">
              <span class="titleSpan">{{ allHomeInfo.price }}</span> /月
            </p>
          </template>
          <template #text> <span class="titleText">租金</span> </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon>
            <p class="titleP">
              <span class="titleSpan">{{ allHomeInfo.roomType }}</span>
            </p>
          </template>
          <template #text> <span class="titleText">房型</span> </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon>
            <p class="titleP">
              <span class="titleSpan">{{ allHomeInfo.size }}平米</span>
            </p>
          </template>
          <template #text> <span class="titleText">面积</span> </template>
        </van-grid-item>
      </van-grid>
      <van-row type="flex" justify="space-between" class="detailed">
        <van-col span="12">装修: <span>精装</span> </van-col>
        <van-col span="12"
          >朝向:
          <span v-for="(item, index) in allHomeInfo.oriented" :key="index">{{
            item
          }}</span>
        </van-col>
        <van-col span="12"
          >楼层: <span>{{ allHomeInfo.floor }}</span>
        </van-col>
        <van-col span="12">类型: <span>普通住宅</span> </van-col>
      </van-row>
    </div>
    <!-- 导航地址 -->
    <div class="gapBox"></div>
    <van-cell title="单元格" class="estateName">
      <template #title> 小区：<span>天山星城</span> </template>
    </van-cell>
    <div id="container" class="smallMap"></div>
    <!-- 房屋配套 -->
    <van-cell title="房屋配套" />
    <van-checkbox-group class="AllIcon">
      <van-checkbox
        class="homeConfig"
        v-for="(item, index) in allHomeInfo.supporting"
        :key="index"
      >
        <template #icon>
          <div class="IconBox">
            <van-icon name="medal-o" />
            <span>{{ item }}</span>
          </div>
        </template>
      </van-checkbox>
    </van-checkbox-group>
    <div class="gapBox"></div>
    <!-- 房源概况 -->
    <van-cell title="房源概况" />
    <van-row class="housing_situation">
      <van-col span="4">
        <van-image
          round
          class="housing_situation_img"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
      </van-col>
      <van-col span="13">
        <van-cell class="cell">
          <template #title> 王女士 </template>
          <template #label>
            <span class="colinfo"><van-icon name="success" />已认证房主</span>
          </template>
        </van-cell>
      </van-col>
      <van-col span="6">
        <van-button plain type="primary" size="small">发消息</van-button>
      </van-col>
    </van-row>
    <div class="bottonBox">
      <p class="housing_situation_info">
        1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
        2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
        3.人车分流，环境优美。
        4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
      </p>
    </div>
    <div class="gapBox"></div>
    <van-cell title="猜你喜欢" />
    <!-- 房屋信息列表 -->
    <van-card
      class="cardList"
      v-for="item in ThisLocalityInfo"
      :key="item.houseCode"
    >
      <!-- 标题 -->
      <template #title>
        <h3>{{ item.title }}</h3>
      </template>
      <!-- 描述 -->
      <template #desc>
        <p>{{ item.desc }}</p>
      </template>
      <!-- 价格 -->
      <template #price>
        <span class="priSpan">{{ item.price }}</span
        >元/月
      </template>
      <!-- 图片 -->
      <template #thumb>
        <van-image
          class="thuImg"
          fit="cover"
          :src="`http://liufusong.top:8080${item.houseImg}`"
        />
      </template>
      <!-- 标签 -->
      <template #tags>
        <van-tag
          plain
          type="primary"
          v-for="(tag, index) in item.tags"
          :key="index"
          >{{ tag }}</van-tag
        >
      </template>
    </van-card>
    <div class="Btns">
      <button @click="OnCollect">
        <van-icon
          name="star"
          :class="{ active: isFavorite }"
          class="starIcon"
        />收藏
      </button>
      <button>在线咨询</button>
      <button class="greenBtn">电话预约</button>
    </div>
    <div class="marA"></div>
  </div>
</template>

<script>
import { getHomeSpecific } from '@/api/findHome'
import { addCollect, isCollect, deleteCollect } from '@/api/collect'
const lo = 116.404
const la = 39.915
export default {
  created () {
    this.getHomeInfo()
    this.isCollectHome()
  },
  mounted () {
    const { BMapGL } = window
    const map = new BMapGL.Map('container')
    map.centerAndZoom(new BMapGL.Point(lo, la), 18)
    map.enableScrollWheelZoom(true)

    // const opts = {
    //   position: new BMapGL.Point(lo, la), // 指定文本标注所在的地理位置
    //   offset: new BMapGL.Size(30, -30) // 设置文本偏移量
    // }
    // // 创建文本标注对象
    // const label = new BMapGL.Label(this.allHomeInfo.community, opts)
    // // 自定义文本标注样式
    // label.setStyle({
    //   color: 'blue',
    //   borderRadius: '5px',
    //   borderColor: '#ccc',
    //   padding: '10px',
    //   fontSize: '16px',
    //   height: '30px',
    //   lineHeight: '30px',
    //   fontFamily: '微软雅黑'
    // })
    // map.addOverlay(label)
  },
  data () {
    return {
      ThisLocalityInfo: [
        { houseImg: '/uploads/upload_60c0c29dcbef8bcc975bb15bd7eb0618.png', title: '工商大院诶', tags: ['近地铁'], price: 121111, desc: '三室/1111/东北/工商大院', houseCode: '4b441b80-6080-6715' }, { houseImg: '/uploads/upload_cefc92af4149d8264800c3df643230af.png', title: '便宜没好货', tags: ['近地铁'], price: 123, desc: '三室/123/东/工商大院', houseCode: '1ea3c25c-92d8-bab5' }, { houseImg: '/newImg/7bjcndpjd.jpg', title: '整租 · 兴汇城精装三房方便看房价格可谈', tags: ['精装'], price: 1300, desc: '三室/62/南/兴汇城', houseCode: '5cc4a2eb1439630e5b505eaf' }],
      allHomeInfo: {},
      isFavorite: ''
    }
  },
  methods: {
    // 点击返回时触发
    OnGoBack () {
      this.$router.back()
    },
    async getHomeInfo () {
      const res = await getHomeSpecific(this.$store.state.cityId)
      console.log(res, '具体信息')
      this.allHomeInfo = res.data.body
      this.creationDot(res.data.body)
    },
    creationDot (item) {
      const { BMapGL } = window
      const map = new BMapGL.Map('container')
      map.enableScrollWheelZoom(true)
      map.centerAndZoom(new BMapGL.Point(item.coord.longitude, item.coord.latitude), 18)
      const opts = {
        position: new BMapGL.Point(item.coord.longitude, item.coord.latitude), // 指定文本标注所在的地理位置
        offset: new BMapGL.Size(-30, -30) // 设置文本偏移量
      }
      // 创建文本标注对象
      const label = new BMapGL.Label(item.community, opts)
      // 自定义文本标注样式
      label.setStyle({
        position: 'absolute',
        display: 'inline',
        cursor: 'inherit',
        backgroundColor: 'rgb(238, 93, 91)',
        border: '1px solid rgb(255, 0, 0)',
        padding: '5px 10px',
        whiteSpace: 'nowrap',
        font: '12px / 14px arial, sans-serif',
        color: 'rgb(255, 255, 255)',
        boxShadow: 'rgb(204 204 204) 2px 2px 2px',
        userSelect: 'none',
        left: '188px',
        top: '37px',
        Zindex: '-7342766'
      })
      map.addOverlay(label)
    },
    // 添加或取消收藏
    OnCollect () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      // 先发起一个请求判断是否为添加
      if (this.isFavorite) {
        // 为添加则取消
        this.deleteCollectHome()
      } else {
        // 未添加则添加
        this.addCollectHome()
      }
    },
    // 添加房屋收藏
    async addCollectHome () {
      const res = await addCollect(this.$store.state.cityId)
      console.log(res, '添加收藏')
      if (res.data.status === 200) {
        this.$toast.success('添加成功')
      }
      this.isFavorite = true
    },
    // 删除房屋收藏
    async deleteCollectHome () {
      const res = await deleteCollect(this.$store.state.cityId)
      console.log(res, '删除收藏')
      if (res.data.status === 200) {
        this.$toast.success('删除成功')
      }
      this.isFavorite = false
    },
    // 查看房屋是否收藏
    async isCollectHome () {
      const { data } = await isCollect(this.$store.state.cityId)
      console.log(data, '是否收藏')
      this.isFavorite = data.body.isFavorite
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.navbar{
background-color: pink;}
.gapBox {
  height: 10px;
  width: 100%;
  background-color: #f6f5f6;
}

.cenBox {
  padding: 15px;
  .titleBox {
    border-bottom: 1px solid #d7d7d7;
    .title {
      display: inline-block;
      margin: 16px 0;
    }
    .tag {
      background-color: #e1f5f8;
      color: #6ad2e9;
      margin-bottom: 15px;
    }
  }
  /deep/.van-cell {
    padding: 0px;
  }
  .titleInfo {
    color: #fa5a44;
    font-size: 14px;
    border-bottom: 1px solid #d7d7d7;
    .titleP {
      margin: auto;
      .titleSpan {
        font-size: 18px;
        font-weight: 700;
      }
    }
    .titleText {
      margin: unset;
      color: #bfc3cc;
      font-size: 14px;
    }
  }
  .detailed {
    margin-top: 10px;
    /deep/.van-col {
      color: #999;
      font-size: 13px;
      padding-right: 5px;
      margin: 5px 0;
    }
  }
}

.AllIcon {
  display: flex;
  height: 142px;
  width: 100%;
  flex-wrap: wrap;
  .van-checkbox {
    align-items: unset;
  }
  /deep/.van-checkbox__icon {
    height: 50px;
    min-width: 57px;
    margin: 5px 5px 2px 5px;
  }
}
.homeConfig {
  .IconBox {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-flow: column;
  }
  /deep/ .active {
    color: pink;
    /deep/.van-icon-medal-o:before {
      color: pink !important;
    }
  }
  span {
    font-size: 14px;
  }
}
.van-icon {
  color: black;
  width: 30px;
  height: 30px;
  border: 0px;
  background-color: transparent;
  font-size: 20px;
}
.van-cell__right-icon {
  font-size: 16px;
}
.smallMap {
  width: 100%;
  height: 145px;
  background-color: #a865f8;
}

.housing_situation {
  .housing_situation_img {
    width: 52px;
    height: 52px;
  }
  .van-col--4 {
    margin-top: 9px;
    margin-left: 13px;
  }
  .cell {
    padding-left: 0;
  }
  .colinfo {
    display: flex;
    color: #fa5741;
    .van-icon {
      color: #fa5741;
      font-size: 16px;
      width: 18px;
    }
  }
  .van-col--6 {
    margin-top: 20px;
  }
}
.housing_situation_info {
  width: 100%;
  height: 210px;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  margin-top: 0;
}
.bottonBox {
  padding: 0 10px;
}

.cardList {
  background-color: #fff;

  .van-card__header {
    border-top: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    .thuImg {
      width: 106px;
      height: 80px;
    }
    .van-card__content {
      flex: 2;
      justify-content: space-evenly;
      .van-tag {
        margin-right: 4px;
      }
    }
    .van-card__thumb {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    h3 {
      margin: 0;
      font-size: 15px;
      color: #394043;
    }
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
      margin: 3px 0px;
    }
    .priSpan {
      font-size: 16px;
      width: 400;
    }
  }
}
.swiper {
  width: 100%;
  height: 212px;
}
.marA {
  width: 10px;
  height: 50px;
}
.Btns {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999999999999999;
  button {
    flex: 1;
    border: 1px solid #eaeaea;
    height: 100px;
    font-size: 17px;
    background-color: #fff;
    color: #999999;
  }
  .greenBtn {
    background-color: #21b97a;
    color: #fff;
  }
}
.starIcon {
  width: 16px;
  height: 16px;
  color: #99a6c4;
  font-size: 16px;
}
.active {
  color: #ff4f00;
}
</style>
