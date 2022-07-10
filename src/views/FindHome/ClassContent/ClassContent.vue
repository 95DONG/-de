<template>
  <div>
    <div class="top">
      <div class="house-type">
        <h3>户型</h3>
        <div class="house-type-btn-galbel">
          <van-button
            class="house-type-btn"
            @click="onClick(item.value)"
            type="default"
            v-for="(item, index) in roomType"
            :key="index"
            plain
            :color="
              chooseHouse.some((item1) => item1 === item.value)
                ? 'rgb(117, 196, 150)'
                : ''
            "
            >{{ item.label }}</van-button
          >
        </div>
      </div>
      <div class="house-type">
        <h3>朝向</h3>
        <div class="house-type-btn-galbel">
          <van-button
            class="house-type-btn"
            @click="onClick(item.value)"
            type="default"
            plain
            v-for="(item, index) in orientedList"
            :key="index"
            :color="
              chooseHouse.some((item1) => item1 === item.value)
                ? 'rgb(117, 196, 150)'
                : ''
            "
            >{{ item.label }}</van-button
          >
        </div>
      </div>
      <div class="house-type">
        <h3>楼层</h3>
        <div class="house-type-btn-galbel">
          <van-button
            class="house-type-btn"
            @click="onClick(item.value)"
            type="default"
            v-for="(item, index) in floorList"
            :key="index"
            plain
            :color="
              chooseHouse.some((item1) => item1 === item.value)
                ? 'rgb(117, 196, 150)'
                : ''
            "
            >{{ item.label }}</van-button
          >
        </div>
      </div>
      <div class="house-type">
        <h3>房屋特点</h3>
        <div class="house-type-btn-galbel">
          <van-button
            class="house-type-btn"
            @click="onClick(item.value)"
            :color="
              chooseHouse.some((item1) => item1 === item.value)
                ? 'rgb(117, 196, 150)'
                : ''
            "
            plain
            type="default"
            v-for="(item, index) in characteristicList"
            :key="index"
            >{{ item.label }}</van-button
          >
        </div>
      </div>
    </div>
    <div class="outSide">
      <div class="btnDouble">
        <van-button @click="cancelAction" class="one">取消</van-button>
        <van-button @click="confirmAction" type="primary" class="two"
          >确认</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getHouseCondition } from '@/api/home'
export default {
  created () {
    this.getHouseList()
  },
  data () {
    return {
      roomType: [], // 几室几厅
      chooseHouse: [], // 存放筛选选中的样式内容
      orientedList: [], // 存放楼层朝向
      floorList: [], // 存放楼层数据
      characteristicList: [], // 存放房屋特点数据
      classColor: {
        addClass: 'rgb(117, 196, 150)',
        removeClass: ''
      }
    }
  },
  methods: {
    // 获取当前城市对应的数据内容
    async getHouseList () {
      const res = await getHouseCondition('AREA|88cff55c-aaa4-e2e0')
      this.roomType = res.data.body.roomType
      this.orientedList = res.data.body.oriented
      this.floorList = res.data.body.floor
      this.characteristicList = res.data.body.characteristic
      // console.log(11, res)
    },
    // 绑定点击事件，获取当前的value值，存放到数组中
    onClick (value) {
      // 按值查找对应的索引值
      // const index = this.chooseHouse.indexOf(value)
      const index = this.chooseHouse.findIndex(item => item === value)
      // console.log(index)
      // 判断数组项是否存在
      if (index === -1) {
        // 不存在就添加进去
        this.chooseHouse.push(value)
        // console.log(value, 'no')
      } else {
        // 存在就删除此项
        this.chooseHouse.splice(index, 1)
        // console.log(value, 'yes')
      }
      console.log(this.chooseHouse)
    },
    // 取消按钮绑定点击事件
    cancelAction () {
      // 取消的时候置空数组，并更改当前页面的显示状态
      this.chooseHouse = []
      this.$emit('update:show', false)
    },

    // 确认的时候拿到对应筛选数组，回传出去，并更改当前的页面显示状态
    confirmAction () {
      this.$emit('update:show', false)
      this.$emit('chooseHouse', this.chooseHouse)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.house-type {
  margin: 28px 0;
  padding: 0 0px;
  h3 {
    margin: 40px 0;
    font-size: 30px;
    font-weight: 400;
  }
  .house-type-btn-galbel {
    margin-left: 80px;
    padding: 0 0 28px;
    border-bottom: 1px solid #e5e5e5;
    .house-type-btn {
      width: 206px;
      height: 64px;
      margin: 0 36px 30px 0;
    }
  }
}
.top {
  height: calc(100vh - 88px);
  overflow: auto;
  h3 {
    margin-left: 20px;
  }
}
.outSide {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.btnDouble {
  display: flex;
  .one {
    flex: 1;
    color: rgb(88, 182, 127);
  }
  .two {
    flex: 2;
  }
}
</style>
