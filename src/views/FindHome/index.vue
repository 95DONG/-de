<template>
  <div>
    <div class="top">
      <!-- 搜索框 -->
      <van-sticky>
        <div class="topSearch">
          <Search></Search>
        </div>
        <!-- 筛选区域 -->
        <div class="choose">
          <van-dropdown-menu :duration="0">
            <van-dropdown-item ref="item1" title="区域">
              <van-picker
                :columns="cityAreaList"
                show-toolbar
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange"
                toolbar-position="bottom"
              />
            </van-dropdown-item>
          </van-dropdown-menu>
          <van-dropdown-menu>
            <van-dropdown-item ref="item2" title="方式">
              <van-picker
                :columns="rentTypeList"
                show-toolbar
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange"
                toolbar-position="bottom"
              />
            </van-dropdown-item>
          </van-dropdown-menu>
          <van-dropdown-menu>
            <van-dropdown-item ref="item3" title="租金">
              <van-picker
                :columns="priceList"
                show-toolbar
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange"
                toolbar-position="bottom"
              />
            </van-dropdown-item>
          </van-dropdown-menu>
          <div>
            <van-cell is-link @click="showPopup">展示</van-cell>
          </div>
          <van-popup
            class="tan"
            v-model="show"
            position="right"
            :style="{ height: '100%', width: '80%' }"
          >
            <ClassContent
              :show.sync="show"
              @chooseHouse="ChooseHouse"
            ></ClassContent>
          </van-popup>
        </div>
      </van-sticky>
      <!-- 房屋信息列表 -->
      <div class="big">
        <div class="out" v-for="(item, index) in cityInfoList" :key="index" @click="$router.push('/detail')">
          <img :src="'http://liufusong.top:8080' + item.houseImg" alt="" />
          <div>
            <h5>{{ item.title }}</h5>
            <span class="one">{{ item.desc }}</span>
            <span class="two">{{ item.tags[0] }}</span>
            <span class="thr">{{ item.price }}元/月</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/views/Search'
import ClassContent from '@/views/FindHome/ClassContent/ClassContent.vue'
import { getCityInfo } from '@/api/findHome'
import { getSonCity } from '@/api/city'
export default {
  created () {
    this.getCity()
    this.getSonCityList()
  },
  data () {
    return {
      show: false, // 筛选最后一个弹出层隐藏
      cityId: this.$store.state.user.cityobj.value, // vuex里的城市数据id
      chooseHouse: [], // 定义空数组，接收传出来的城市对应的ID value
      cityInfoList: {}, // 存放城市房屋信息
      cityAreaList: [], // 存放城市地区信息
      priceList: [], // 初步价格数据
      rentTypeList: [] // 初步合租方式数据
    }
  },
  methods: {
    // 发送请求，携带城市id参数
    async getCity () {
      try {
        const res = await getCityInfo({ cityId: this.cityId ? this.cityId : 'AREA|88cff55c-aaa4-e2e0' })
        // 将获取过来的数据存放到数组里 cityInfoList
        this.cityInfoList = res.data.body.list
        console.log('info', res)
      } catch (error) {
        console.log(error)
      }
    },
    // 获取子级城市数据
    async getSonCityList () {
      const res = await getSonCity(this.cityId)
      // console.log(1, res)

      // 获取数据
      this.cityAreaList.push(res.data.body.area, res.data.body.subway) // 初步城市数据列表及地铁
      this.priceList = res.data.body.price // 初步租金区间列表
      this.rentTypeList = res.data.body.rentType // 初步合租方式列表
      // console.log(2, this.cityAreaList)

      // 转换数据格式
      const middleCity = JSON.stringify(this.cityAreaList)// 将城市及地铁对象转为字符串
      const middlePrice = JSON.stringify(this.priceList) // 将价格数组转为字符串
      const middleRent = JSON.stringify(this.rentTypeList)// 将合租方式对象转为字符串

      // 定义正则 进行替换 并重新赋值
      const reg = /label/g
      const reg2 = /"不限"/gi
      this.cityAreaList = JSON.parse(middleCity.replace(reg, 'text').replace(reg2, '"不限","children":[{"text":""}]'))
      this.rentTypeList = JSON.parse(middleRent.replace(reg, 'text'))
      this.priceList = JSON.parse(middlePrice.replace(reg, 'text'))
      // console.log(this.rentTypeList)
    },
    onConfirm (value, index) {
      console.log('确认')
      // 三个下拉菜单的按钮点击收起下拉层
      this.$refs.item1.toggle()
      this.$refs.item2.toggle()
      this.$refs.item3.toggle()
      console.log('value', value, index)
      this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    onChange (picker, value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    onCancel () {
      console.log('取消')
      // this.$toast('取消')
      // 通过 ref 可以获取到 DropdownItem 实例并调用实例方法
      // toggle 切换菜单展示状态，传 true 为显示，false 为隐藏，不传参为取反
      // 三个下拉菜单的按钮点击收起下拉层
      this.$refs.item1.toggle()
      this.$refs.item2.toggle()
      this.$refs.item3.toggle()
      console.log(this.$refs.item)
    },
    // 第四个弹出层显示
    showPopup () {
      this.show = true
      console.log(123, this.chooseHouse)
    },
    // 接收第四个弹出层传回来的值
    ChooseHouse (value) {
      this.chooseHouse = []
      this.chooseHouse.push(value)
      console.log(this.chooseHouse)
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: { ClassContent, Search }
}
</script>

<style scoped lang='less'>
// 搜索框背景色
.topSearch {
  background-color: rgb(88, 182, 127);
  height: 120px;
}

// 列表项
.out {
  border-bottom: 1px solid rgba(51, 51, 51, 0.2);
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
      width: 100px;
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
//筛选中的按钮项
.btn {
  display: flex;
  overflow: hidden;
  .van-button {
    border: 0;
  }
}
// 整个筛选区域
.choose {
  display: flex;
  .van-dropdown-menu {
    width: 25%;
    /deep/ .van-dropdown-item {
      // 设置筛选按钮
      display: flex;
      .van-picker__cancel {
        flex: 1;
        color: rgb(88, 182, 127);
      }
      .van-picker__confirm {
        flex: 2;
        background-color: rgb(88, 182, 127);
        color: #fff;
      }
    }
  }
}
//筛选按钮阴影
/deep/ .van-dropdown-menu__bar {
  box-shadow: unset;
}
</style>
