<style scoped>
.main {
  background: url("../../static/images/login/bg.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
}

.title {
  margin: 0px;
  text-align: center;
  color: #ffffff;
}

.title h2 {
  font-size: 35px;
  margin: 0px;
}

.login-banner {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -300px;
  padding-top: 60px;
  width: 600px;
  height: 400px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.21);
}

.login-content {
  width: 70%;
  margin: 0px auto;
  padding: 30px 0px;
  margin-top: 0px;
}

.login-content .form-group {
  margin-bottom: 30px;
}

.login-content .form-group .input-text {
  width: 100%;
  border: none;
  height: 50px;
  padding: 10px 10px 10px 50px;
  background-color: transparent;
  color: #fff;

  border: 1px solid #e3e3e3;
}

.login-content .form-group .input-text::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #e3e3e3;
}

.login-content .form-group .input-text:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #e3e3e3;
}

.login-content .form-group .input-text::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #e3e3e3;
}

.login-content .form-group .input-text:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #e3e3e3;
}

.login-content .user-content,
.login-content .pwd-content {
  position: relative;
}

.login-content .input-icon {
  color: #fff;
  position: absolute;
  left: 35px;
  top: 17px;
  font-size: 15px;
}

.login-content .user-content .input-text {
  border-radius: 10px 10px 0 0;
}

.login-content .pwd-content .input-text {
  border-radius: 0 0 10px 10px;
  border-top: none;
}

.login-content .form-group .input-text:focus {
  outline-color: transparent;
}

.login-content .form-group .button {
  border-radius: 5px;
  height: 50px;
  border: none;
  font-size: 16px;
}

.login-content label {
  font-weight: 500;
}

.login-content .errorinfo {
  padding-top: 10px;
  padding-left: 15px;
  font-size: 14px;
  float: left;
  color: #fe978d;
}

.login-content .button {
  width: 100%;
}

@media (max-width: 768px) {
  .login-banner {
    width: 100%;
    padding-top: 200px;
  }
}
</style>

<template>
  <div class="main">
    <div class="login-banner">
      <div class="title">
        <h2>cc node 测试</h2>
      </div>
      <div class="login-content" id="login-content">
        <form id="fmSignin" class="form-horizontal">
          <div class="form-group">
            <div class="col-sm-offset-1 col-sm-10 user-content">
              <label for="txtUser" class="hidden">用户名</label>
              <i class="input-icon  glyphicon glyphicon-user"></i>
              <input type="text" class="input-text" id="txtUser" name="loginname"
                     v-model="loginParams.loginName" placeholder="输入登录名"/>
            </div>
            <div class="col-sm-offset-1 col-sm-10 pwd-content">
              <label for="txtPwd" class="hidden">密码</label>
              <i class="input-icon  glyphicon glyphicon-lock"></i>
              <input type="password" class="input-text" id="txtPwd" name="pwd"
                     v-model="loginParams.password" placeholder="输入密码"/>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-1 col-sm-10">
              <input type="submit" value="登录" class="button btn btn-success" id="btnLogin"
                     @click.prevent="login">
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-10 col-sm-offset-1">
              <span class="errorinfo"></span>
            </div>
          </div>
        </form>
      </div>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
//引入service
import loginService from "../services/loginService";
export default {
  name: "Login",
  data() {
    return {
      loginParams: {
        loginName: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      var vm = this;
      console.log(vm.loginParams.loginName + "\t" + vm.loginParams.password);
      loginService
        .login(vm.loginParams.loginName, vm.loginParams.password)
        .then(
          data => {
            vm.$store.dispatch("setUserInfo", data.user);
            vm.$router.push({ name: "Main" });
          },
          error => {
            console.log(JSON.stringify(error));
            alert(error);
          }
        );
    }
  }
};
</script>