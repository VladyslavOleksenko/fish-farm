<template>
  <div class="wrapper">
    <Switcher class="wrapper__switcher"
              font-size="27px"
              left-name="register"
              right-name="login"
              left-value="Register"
              right-value="Login"
              v-model="mode"/>

    <MyForm
      v-if="mode === 'register'"
      submit-text="Register"
      :submit-disabled="!validateRegisterData"
      :message="registerData.message"
      v-model:message-visibility-status="registerData.messageVisibilityStatus"
      @submitted="sendRegisterRequest">
      <FormRow>
        <FormInput
          type="text"
          placeholder="First name"
          required
          v-model="registerData.firstName"
          @updated="registerDataUpdated"/>
        <FormInput
          type="text"
          placeholder="Last name"
          required
          v-model="registerData.lastName"
          @updated="registerDataUpdated"/>
      </FormRow>
      <FormRow>
        <FormInput
          type="email"
          placeholder="Email"
          required
          v-model="registerData.email"
          @updated="registerDataUpdated"/>
      </FormRow>
      <FormRow>
        <FormInput
          type="password"
          placeholder="Password"
          required
          v-model="registerData.password"
          @updated="registerDataUpdated"/>
      </FormRow>
    </MyForm>

    <MyForm
      v-else
      submit-text="Login"
      :submit-disabled="!validateLoginData"
      :message="loginData.message"
      v-model:message-visibility-status="loginData.messageVisibilityStatus"
      @submitted="sendLoginRequest">
      <FormRow>
        <FormInput
          type="email"
          placeholder="Email"
          required
          v-model="loginData.email"
          @updated="loginDataUpdated"/>
      </FormRow>
      <FormRow>
        <FormInput
          type="password"
          placeholder="Password"
          required
          v-model="loginData.password"
          @updated="loginDataUpdated"/>
      </FormRow>
    </MyForm>
  </div>
</template>

<script>
import {register, login} from "@/assets/js/serverRequest"
import {mapMutations, mapState} from "vuex"
import MyInput from "@/components/UI/MyInput";
import Switcher from "@/components/UI/Switcher";
import MyRectangleButton from "@/components/UI/MyRectangleButton";
import MyForm from "@/components/Form/MyForm";
import FormRow from "@/components/Form/FormRow";
import FormInput from "@/components/Form/FormInput";


export default {
  name: "AuthorizationBlock",
  components: {
    FormInput,
    FormRow,
    MyForm,
    MyRectangleButton,
    Switcher,
    MyInput
  },
  data: () => ({
    testModel: "",
    mode: "register",
    registerData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      message: "",
      messageVisibilityStatus: false
    },
    loginData: {
      email: "",
      password: "",
      message: "",
      messageVisibilityStatus: false
    }
  }),
  computed: {
    validateRegisterData() {
      if (!this.registerData.firstName) {
        this.registerData.message = "Please enter your first name first"
        return false
      }
      if (!this.registerData.lastName) {
        this.registerData.message = "Please enter your last name first"
        return false
      }
      if (!this.registerData.email) {
        this.registerData.message = "Please enter your email first"
        return false
      }
      if (!this.registerData.password) {
        this.registerData.message = "Please create your password first"
        return false
      }
      return true
    },
    validateLoginData() {
      if (!this.loginData.email) {
        this.loginData.message = "Please enter your email first"
        return false
      }
      if (!this.loginData.password) {
        this.loginData.message = "Please enter your password first"
        return false
      }
      return true
    },
  },
  methods: {
    ...mapMutations({
      setToken: "authorization/setToken",
      setUser: "user/setUser"
    }),
    registerDataUpdated() {
      this.registerData.messageVisibilityStatus = false
    },
    loginDataUpdated() {
      this.loginData.messageVisibilityStatus = false
    },
    async sendRegisterRequest() {
      try {
        await this.$router.push("/profile")
        const serverResponse = await register(this.registerData)
        this.setToken(serverResponse.token)
        this.setUser(serverResponse.user)
      } catch (exception) {
        this.registerData.message = exception.message
        this.registerData.messageVisibilityStatus = true
      }
    },
    async sendLoginRequest() {
      try {
        await this.$router.push("/profile")
        const serverResponse = await login(this.loginData)
        this.setToken(serverResponse.token)
        this.setUser(serverResponse.user)
      } catch (exception) {
        this.loginData.message = exception.message
        this.loginData.messageVisibilityStatus = true
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
  margin: 0 0 20px 0;
  height: 60px;
}
</style>