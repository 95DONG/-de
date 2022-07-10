<template>
  <div>
    <!-- 导航栏 -->
    <van-sticky>
      <van-nav-bar title="发布房源" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <div class="main">
      <!-- 房源信息 -->
      <van-cell class="message" title="房源信息" />
      <!-- 小区名称 -->
      <van-cell
        title="小区名称"
        value="请输入小区名称"
        is-link
        @click="isNounShow = true"
      />
      <!-- 租金 -->
      <van-field placeholder="请输入租金/月">
        <template #label>
          <span>租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金</span>
        </template>
        <template #button>
          <span>¥/月</span>
        </template>
        <!-- 建筑面积 -->
      </van-field>
      <van-field placeholder="请输入建筑面积" label="建筑面积">
        <template #button>
          <span>m²</span>
        </template>
      </van-field>
      <!-- 户型 -->
      <van-cell title="户型" value="请选择" is-link @click="isTypeShow = true">
        <template #title>
          <span>户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</span>
        </template>
      </van-cell>
      <!-- 所在楼层 -->
      <van-cell
        title="所在楼层"
        value="请选择"
        is-link
        @click="isFloorShow = true"
      />
      <!-- 朝向 -->
      <van-cell
        title="朝向"
        :border="false"
        value="请选择"
        is-link
        @click="isWayShow = true"
      >
        <template #title>
          <span>朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向</span>
        </template>
      </van-cell>
      <!-- 房屋标题 -->
      <van-cell title="房屋标题" />
      <van-field
        v-model="value"
        :border="false"
        placeholder="请输入标题(例如：整租 小区名 2室 5000元)"
      />
      <!-- 房屋图像 -->
      <van-cell title="房屋图像" />
      <van-uploader v-model="fileList" multiple>
        <template #default>
          <van-icon size="40" color="rgb(194, 192, 192)" name="plus" />
        </template>
      </van-uploader>
      <!-- 房屋配置 -->
      <van-cell title="房屋配置" />
      <van-cell>
        <div class="icons">
          <van-grid :column-num="5" :border="false">
            <van-grid-item icon="hotel-o" text="衣柜" />
            <van-grid-item icon="shop-o" text="洗衣机" />
            <van-grid-item icon="credit-pay" text="空调" />
            <van-grid-item icon="fire-o" text="天然气" />
            <van-grid-item icon="desktop-o" text="冰箱" />
            <van-grid-item icon="bulb-o" text="暖气" />
            <van-grid-item icon="cashier-o" text="电视" />
            <van-grid-item icon="closed-eye" text="热水器" />
            <van-grid-item icon="bar-chart-o" text="宽带" />
            <van-grid-item icon="coupon-o" text="沙发" />
          </van-grid>
        </div>
      </van-cell>
      <!-- 房屋描述 -->
      <van-cell class="houseVerb" title="房屋描述" />
      <van-field
        v-model="message"
        rows="5"
        autosize
        type="textarea"
        placeholder="请输入房屋描述信息"
      />
    </div>
    <!-- 小区名称弹出 -->
    <van-popup
      is-link
      position="bottom"
      v-model="isNounShow"
      style="height: 100%"
    >
      <form action="/">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </van-popup>
    <!-- 户型弹出 -->
    <van-popup
      is-link
      position="bottom"
      v-model="isTypeShow"
      style="height: 40%"
    >
      <van-picker show-toolbar :columns="typeColumns" />
    </van-popup>
    <!-- 所在楼层 -->
    <van-popup
      is-link
      position="bottom"
      v-model="isFloorShow"
      style="height: 40%"
    >
      <van-picker title="标题" show-toolbar :columns="floorColumns" />
    </van-popup>
    <!-- 朝向弹出层 -->
    <van-popup
      is-link
      position="bottom"
      v-model="isWayShow"
      style="height: 40%"
    >
      <van-picker title="标题" show-toolbar :columns="wayColumns" />
    </van-popup>
    <!-- 底部按钮 -->
    <div class="btn">
      <van-button square class="left" type="default">取消</van-button>
      <van-button square class="right" type="primary">确认</van-button>
    </div>
  </div>
</template>

<script>
import { publishHouse } from '@/api/house'
export default {
  created () { },
  data () {
    return {
      isNounShow: false, // 小区名称弹出层显示
      isTypeShow: false, // 户型弹出层
      isFloorShow: false, // 所在楼层弹出层
      isWayShow: false, // 朝向弹出层
      value: '',
      // text: '租金', // 租金数据
      // text1: '面积', // 面积数据
      typeColumns: ['一室', '二室', '三室', '四室+'],
      floorColumns: ['高楼层', '中楼层', '低楼层'],
      wayColumns: ['东', '南', '西', '北'],
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'], // 户型选择数据
      fileList: [
        // { url: 'https://img01.yzcdn.cn/vant/leaf.jpg' },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: 'https://cloud-image', isImage: true }
      ],
      message: ''
    }
  },
  methods: {
    async publishHouse () {
      try {
        const res = await publishHouse()
        this.floorColumns = res.data.body.floor
        this.typeColumns = res.data.body.roomType
        this.wayColumns = res.data.body.oriented
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    // 导航点击返回按钮
    onClickLeft () {
      this.$router.back()
    },
    onSearch (val) {
      this.toast(val)
    },
    onCancel () {
      this.isNounShow = false
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.main {
  background-color: rgb(245, 245, 249);
  // height: 100vh;
  overflow: auto;
  padding-bottom: 150px;
}
//导航栏样式
/deep/ .van-nav-bar__content {
  background-color: rgb(88, 182, 127);
}
// 底部按钮样式
.btn {
  position: fixed;
  bottom: 0;
  .left {
    width: 375px;
    color: rgb(88, 182, 127);
  }
  .right {
    width: 375px;
  }
}
// 房源信息样式
.message {
  color: rgb(88, 182, 127);
}
// 上传照片样式
.van-uploader {
  padding: 20px;
  background-color: #fff;
  width: 100%;
  /deep/ .van-uploader__input-wrapper {
    line-height: 180px;
    // background-color: pink;
    border: 1px solid rgb(225, 222, 222);
    width: 160px;
    height: 160px;
    text-align: center;
  }
}
// 房屋描述
.houseVerb {
  margin-top: 30px;
}
// 弹出层按钮
/deep/ .van-picker__cancel {
  color: rgb(74, 145, 227);
  font-size: 34px;
}
/deep/ .van-picker__confirm {
  color: rgb(74, 145, 227);
  font-size: 34px;
}
</style>
