<template>
  <div>
    <van-nav-bar style="font-weight: 400" title="账号登录" left-arrow />
    <van-form>
      <van-field
        v-model="username"
        name="用户名"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        placeholder="请输入密码"
      />
      <div style="margin: 16px">
        <van-button block native-type="submit" class="subBtn" @click="subBtn"
          >登录</van-button
        >
      </div>
      <p>还没有账号，去注册~</p>
    </van-form>
  </div>
</template>

<script>
import { userLoginInfoApi } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      password: '',
      username: ''
    }
  },
  methods: {
    async subBtn () {
      if (this.username === '' && this.password === '') {
        return this.$toast('用户名和密码不能为空')
      }
      const { data } = await userLoginInfoApi({ username: this.username, password: this.password })
      console.log(data)
      localStorage.setItem('token', data.body.token)
      this.$store.commit('setUser', data.body.token)
      this.$router.push('/my')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/ .van-nav-bar__title {
  font-size: 35px;
  font-weight: 400;
  // color: #333;
}
/deep/ .subBtn {
  font-size: 35px;
  color: #fff;
  background-color: #21b97a;
}
.van-field {
  height: 120px;
}
p {
  text-align: center;
  font-size: 28px;
  margin-top: 60px;
  color: rgb(129, 126, 126);
}
</style>
