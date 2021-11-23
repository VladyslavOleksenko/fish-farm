<template>
  <div class="wrapper">
    <div class="wrapper__switcher switcher">
      <div class="switcher__brick"
           :class="{'switcher__brick-right': mode === 'login'}"></div>
      <button class="switcher__button"
              @click="mode = 'register'">
        Register
      </button>
      <button class="switcher__button switcher__button-right"
              @click="mode = 'login'">
        Login
      </button>
    </div>

    <form class="wrapper__register-form form"
          action="http://localhost:5000/api/user"
          method="post"
          v-if="mode === 'register'">
      <div class="form__input-fields-row">
        <input class="form__input"
               type="text"
               placeholder="First name"
               v-model="registerData.firstName">
        <input class="form__input"
               type="text"
               placeholder="Last name"
               v-model="registerData.lastName">
      </div>
      <div class="form__input-fields-row">
        <input class="form__input"
               type="email"
               placeholder="Email"
               v-model="registerData.email">
      </div>
      <div class="form__input-fields-row">
        <input class="form__input"
               type="password"
               placeholder="Password"
               v-model="registerData.password">
      </div>

      <div class="form__submit-wrapper">
        <button class="form__submit"
                @click.prevent="sendRegisterRequest">
          Register
        </button>
      </div>
    </form>

    <form class="wrapper__login-form form"
          action=""
          v-else-if="mode === 'login'">
      <div class="form__input-fields-row">
        <input class="form__input"
               type="email"
               placeholder="Email"
               v-model="loginData.email">
      </div>
      <div class="form__input-fields-row">
        <input class="form__input"
               type="password"
               placeholder="Password"
               v-model="loginData.password">
      </div>

      <div class="form__submit-wrapper">
        <button class="form__submit"
                disabled
                @click.prevent="sendLoginRequest">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import {register, login} from "@/assets/js/serverRequest"

export default {
  name: "AuthorizationBlock",
  data: () => ({
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
    }
  }),
  methods: {
    async sendRegisterRequest() {
      const serverResponse = await register(this.registerData)
      console.log(serverResponse)
    },
    async sendLoginRequest() {
      const serverResponse = await login(this.loginData)
      console.log(serverResponse)
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
}

.switcher {
  position: relative;
  height: 60px;

  display: flex;
}

.switcher__brick {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;

  background-color: var(--blue-color);
  border-radius: 6px 0 0 0;

  transition: left .2s ease,
  border-radius .2s ease;
}

.switcher__brick-right {
  border-radius: 0 6px 0 0;
  left: 50%;
}

.switcher__button {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;

  font-size: 27px;
  font-weight: 500;

  color: #eee;
  background: none;
  border: none;
  outline: none;

  cursor: pointer;
  z-index: 1;
}

.switcher__button-right {
  left: 50%;
}


.form__input-fields-row {
  margin: 0 0 22px 0;
  padding: 0 20px;
  width: calc(100% + 15px);

  display: flex;
}

.form__input {
  width: 100%;
  height: 53px;
  margin: 0 15px 0 0;
  padding: 0 15px;

  font-size: 22px;

  color: #fff;
  background-color: var(--light-purple-color);
  border: none;
  border-radius: 4px;
  outline: none;
}

.form__input::placeholder {
  color: var(--light-gray-color);
}


.form__submit-wrapper {
  margin: 50px 0 20px;

  display: flex;
  justify-content: center;
}

.form__submit {
  height: 50px;
  padding: 0 50px;

  font-size: 22px;
  font-weight: 500;

  color: #eee;
  background-color: var(--blue-color);

  border: none;
  border-radius: 4px;
  outline: none;

  transition: background-color .2s ease;
  cursor: pointer;
}

.form__submit:hover {
  background-color: #6fa360;
}

.form__submit:active {
  background-color: #5e8b52;
}

.form__submit[disabled] {
  color: #7f7f7f;
  background: var(--light-purple-color);
}
</style>