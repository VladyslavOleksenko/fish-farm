<template>
  <div class="wrapper">
    <Switcher class="wrapper__switcher"
              font-size="27px"
              left-name="register"
              right-name="login"
              left-value="Register"
              right-value="Login"
              v-model="mode"/>

    <form class="wrapper__register-form form"
          action="http://localhost:5000/api/user"
          method="post"
          v-if="mode === 'register'">
      <div class="form__error"
           v-if="registerServerError">
        {{ registerServerError }}
      </div>
      <div class="form__advice"
           v-if="registerDataValidationError">
        Fill all the fields
      </div>
      <div class="form__input-fields-row">
        <MyInput class="form__input"
                 type="text"
                 placeholder="First name"
                 required
                 v-model="registerData.firstName"/>
        <MyInput class="form__input"
                 type="text"
                 placeholder="Last name"
                 v-model="registerData.lastName"/>
      </div>
      <div class="form__input-fields-row">
        <MyInput class="form__input"
                 type="email"
                 placeholder="Email"
                 required
                 v-model="registerData.email"/>
      </div>
      <div class="form__input-fields-row">
        <MyInput class="form__input"
                 type="password"
                 placeholder="Password"
                 required
                 v-model="registerData.password"/>
      </div>

      <div class="form__submit-wrapper">
        <MyRectangleButton class="form__submit"
                           icon-name="ok"
                           text="Register"
                           :disabled="!!registerDataValidationError"
                           @clicked="sendRegisterRequest"/>
      </div>
    </form>

    <form class="wrapper__login-form form"
          action=""
          v-else-if="mode === 'login'">
      <div class="form__error"
           v-if="loginServerError">
        {{ loginServerError }}
      </div>
      <div class="form__advice"
           v-if="loginDataValidationError">
        Fill all the fields
      </div>
      <div class="form__input-fields-row">
        <MyInput class="form__input"
                 type="email"
                 placeholder="Email"
                 required
                 v-model="loginData.email"/>
      </div>
      <div class="form__input-fields-row">
        <MyInput class="form__input"
                 type="password"
                 placeholder="Password"
                 required
                 v-model="loginData.password"/>
      </div>

      <div class="form__submit-wrapper">
        <MyRectangleButton class="form__submit"
                           icon-name="ok"
                           text="Login"
                           :disabled="!!loginDataValidationError"
                           @clicked="sendLoginRequest"/>
      </div>
    </form>
  </div>
</template>

<script>
import {register, login} from "@/assets/js/serverRequest"
import {mapMutations, mapState} from "vuex"
import MyInput from "@/components/UI/MyInput";
import Switcher from "@/components/UI/Switcher";
import MyRectangleButton from "@/components/UI/MyRectangleButton";


export default {
  name: "AuthorizationBlock",
  components: {MyRectangleButton, Switcher, MyInput},
  data: () => ({
    testModel: "",
    mode: "register",
    registerData: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    loginData: {
      email: "",
      password: ""
    },
    registerServerError: "",
    loginServerError: ""
  }),
  computed: {
    registerDataValidationError() {
      if (!this.registerData.firstName) {
        return "Enter your first name"
      }
      if (!this.registerData.lastName) {
        return "Enter your last name"
      }
      if (!this.registerData.email) {
        return "Enter your email"
      }
      if (!this.registerData.password) {
        return "Create your password"
      }
      return null
    },
    loginDataValidationError() {
      if (!this.loginData.email) {
        return "Enter your email"
      }
      if (!this.loginData.password) {
        return "Enter your password"
      }
      return null
    },
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    ...mapMutations({
      setToken: "authorization/setToken",
      setUser: "user/setUser"
    }),
    async sendRegisterRequest() {
      try {
        const serverResponse = await register(this.registerData)
        this.setToken(serverResponse.token)
        this.setUser(serverResponse.user)
        this.registerServerError = ""
        await this.$router.push("/profile")
      } catch (exception) {
        console.error(exception)
        this.registerServerError = exception.message
      }
    },
    async sendLoginRequest() {
      try {
        const serverResponse = await login(this.loginData)
        this.setToken(serverResponse.token)
        this.setUser(serverResponse.user)
        this.loginServerError = ""
        await this.$router.push("/profile")
      } catch (exception) {
        console.error(exception)
        this.loginServerError = exception.message
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  width: 30vw;

  background-color: var(--dark-purple-color);
  border-radius: 6px;
}


.wrapper__switcher {
  margin: 0 0 50px 0;
  height: 60px;
}


.form__error, .form__advice {
  margin: 0 0 20px;
  padding: 0 20px;

  text-align: center;
  font-size: 22px;
  font-weight: 500;
}

.form__error {
  color: #ff2c2c;
}

.form__advice {
  color: #8ddd72;
}


.form__input-fields-row {
  margin: 0 0 22px 0;
  padding: 0 20px;
  width: calc(100% + 15px);

  display: flex;
}

.form__input {
  width: 100%;
  margin: 0 15px 0 0;
}


.form__submit-wrapper {
  margin: 50px 0 20px;

  display: flex;
  justify-content: center;
}

.form__submit {
  height: 50px;
}
</style>