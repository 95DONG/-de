<template>
  <div>
    <div>
      <!-- 登录 -->
      <div class="unlogin login" v-if="flag">
        <img src="@/assets/3.png" alt="" />
        <div class="message">
          <div class="imges"><img src="@/assets/3.png" alt="" /></div>
          <p>游客</p>
          <h6>用户信息<van-icon name="play" /></h6>
          <van-button @click="logout" class="loginbtn" type="primary" to="/my"
            >退出</van-button
          >
        </div>
      </div>
      <!-- 未登录 -->
      <div class="unlogin" v-else>
        <img src="@/assets/3.png" alt="" />
        <div class="message">
          <div class="imges"><img src="@/assets/3.png" alt="" /></div>
          <p>游客</p>
          <van-button class="unloginbtn" type="primary" to="/login"
            >去登录</van-button
          >
        </div>
      </div>
      <van-grid :border="false" clickable :column-num="3">
        <van-grid-item icon="star-o" text="我的收藏" to="/collect" />
        <van-grid-item icon="wap-home-o" text="我的出租" to="/" />
        <van-grid-item icon="clock-o" text="看房记录" />
        <van-grid-item icon="debit-pay" text="成为房主" />
        <van-grid-item icon="contact" text="个人资料"  />
        <van-grid-item icon="service-o" text="联系我们" />
      </van-grid>
      <img class="last" src="@/assets/3.png" alt="" />
    </div>
  </div>
</template>

<script>
import { userInfoApi } from '@/api/user'
export default {
  created () {
    this.userInfoApi()
  },
  data () {
    return {
      flag: this.$store.state.user.token
    }
  },
  methods: {
    async userInfoApi () {
      const res = await userInfoApi()
      console.log('resq', res)
    },
    logout () {
      this.$store.commit('setUser', {})
      localStorage.removeItem('token')
      this.flag = null
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.unlogin {
  position: relative;
  width: 750px;
  height: 600px;
  margin-bottom: 15px;
  text-align: center;
  background-color: red;
  img {
    height: 380px;
    width: 100%;
  }
  .message {
    position: absolute;
    left: 55px;
    bottom: 0;
    background-color: #fff;
    width: 640px;
    height: 330px;
    box-shadow: 1px 1px 15px rgb(226, 223, 223);
    .unloginbtn {
      width: 150px;
      height: 60px;
      border-radius: 12px;
    }
    p {
      font-size: 26px;
      margin-top: 140px;
    }
    .imges {
      display: inline-block;
      position: absolute;
      top: -50px;
      left: 50%;
      transform: translateX(-50%);
      width: 140px;
      height: 140px;
      z-index: 1;
      border: 10px solid rgb(245, 245, 245);
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    h6 {
      line-height: 0;
      margin: unset;
      font-weight: 400;
      font-size: 24px;
      color: rgb(190, 187, 187);
    }
  }
}
.login {
  background-color: pink;
  .loginbtn {
    width: 120px;
    height: 30px;
    border-radius: 15px;
    font-size: 24px;
  }
}
.last {
  margin-left: 30px;
  width: 690px;
  height: 170px;
  border-radius: 14px;
}
</style>
