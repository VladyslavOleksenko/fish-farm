<template>
  <div class="profile">
    <div class="profile__content">
      <img class="profile__image" src="../../public/profile.svg" alt="">
      <div class="profile__exit-button exit-button"
           @click="logout">
        <MyIcon class="exit-button__icon" icon-name="logout" path-color="#ccc"/>
        <p class="exit-button__text">Exit</p>
      </div>

      <div class="profile__greeting">Hello, Vladyslav</div>
      <div class="profile__slogan">It is your profile page</div>

      <div class="profile__data-block">
        <div class="profile__data-header">
          <img class="profile__avatar"
               v-if="user.avatar"
               :src="user.avatar"
               alt="">
          <NoAvatar class="profile__no-avatar" v-else/>
          <p>Your personal data</p>
        </div>

        <div class="profile__data-row">
          <div class="profile__data-parameter">First name:</div>
          <div class="profile__data-value">{{ user.firstName }}</div>
        </div>
        <div class="profile__data-row">
          <div class="profile__data-parameter">Last name:</div>
          <div class="profile__data-value">{{ user.lastName }}</div>
        </div>
        <div class="profile__data-row">
          <div class="profile__data-parameter">Email:</div>
          <div class="profile__data-value">{{ user.email }}</div>
        </div>
        <div class="profile__change-data-button-wrapper">
          <MyRoundButton class="profile__change-data-button"
                         icon-name="edit"
                         @click="changeModalVisibilityStatus = true"/>
        </div>
      </div>
    </div>


    <MyModal v-if="changeModalVisibilityStatus"
             @hide="changeModalVisibilityStatus = false">
      <MyForm class="profile__change-data-form"
              title-text="You can change your personal data here"
              submit-text="Apply"
              :submit-disabled="!validateFormData"
              :message="formData.message"
              v-model:message-visibility-status="formData.messageVisibilityStatus"
              @submitted="sendChangeUserDataRequest">
        <FormRow>
          <FormInput
            type="text"
            placeholder="First name"
            required
            v-model="formData.firstName"
            @updated="formDataUpdated"/>
        </FormRow>
        <FormRow>
          <FormInput
            type="text"
            placeholder="Last name"
            required
            v-model="formData.lastName"
            @updated="formDataUpdated"/>
        </FormRow>
      </MyForm>
    </MyModal>
  </div>
</template>

<script>
import MyIcon from "@/components/UI/MyIcon";
import {mapState, mapActions, mapMutations} from "vuex";
import NoAvatar from "@/components/NoAvatar/NoAvatar";
import MyRoundButton from "@/components/UI/MyRoundButton";
import MyModal from "@/components/Modal/MyModal";
import MyForm from "@/components/Form/MyForm";
import FormRow from "@/components/Form/FormRow";
import FormInput from "@/components/Form/FormInput";
import {changeUserData, changeUserAvatar} from "@/assets/js/serverRequest";

export default {
  name: "Profile",
  components: {
    FormInput,
    FormRow,
    MyForm,
    MyModal,
    MyRoundButton,
    NoAvatar,
    MyIcon
  },
  data: () => ({
    formData: {
      avatar: "",
      firstName: "",
      lastName: "",
      message: "",
      messageVisibilityStatus: false
    },
    changeModalVisibilityStatus: false
  }),
  computed: {
    ...mapState({
      user: state => state.user.user
    }),
    validateFormData() {
      if (!this.formData.firstName) {
        this.formData.message = "Field 'first name' can`t be empty"
        return false
      }
      if (!this.formData.lastName) {
        this.formData.message = "Field 'last name' can`t be empty"
        return false
      }
      return true
    }
  },
  methods: {
    ...mapMutations({
      setUser: "user/setUser"
    }),
    ...mapActions({
      logout: "authorization/logout"
    }),
    formDataUpdated() {
      this.formData.messageVisibilityStatus = false
    },
    async sendChangeUserDataRequest() {
      try {
        const userData = {
          userId: this.user.userId,
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
        }
        const serverResponse = await changeUserData(userData)
        this.setUser(serverResponse)
      } catch (exception) {
        this.formData.message = exception.message
        return this.formData.messageVisibilityStatus = true
      }

      this.changeModalVisibilityStatus = false
    }
  },
  mounted() {
    this.formData.avatar = this.user.avatar
    this.formData.firstName = this.user.firstName
    this.formData.lastName = this.user.lastName
  }
}
</script>

<style scoped>
.profile__content {
  padding: 40px 0 50px 60px;
}


.profile__image {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 40%;

  opacity: .8;
}


.profile__exit-button {
  position: absolute;
  top: 40px;
  right: 50px;
}

.exit-button {
  height: 60px;
  padding: 0 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--dark-purple-color);
  box-shadow: 0 3px 6px 2px rgba(44, 46, 67, 0.7);
  border-radius: 5px;
  border: none;
  outline: none;

  cursor: pointer;
  transition: background-color .2s ease,
  color .2s ease;
}

.exit-button__icon {
  width: 28px;
  height: 28px;
  margin: 0 20px 0 0;
}

.exit-button__text {
  font-size: 30px;
  font-weight: 500;

  color: #cccccc;
}

.profile__exit-button:hover {
  color: #ffffff;
  background-color: var(--blue-color);
}

.profile__exit-button:active {
  color: var(--light-gray-color);
}


.profile__greeting {
  margin: 0 0 15px 0;

  font-size: 50px;

  color: var(--dark-purple-color);
}

.profile__slogan {
  margin: 0 0 80px 0;

  font-size: 35px;

  color: #444444;
}


.profile__data-block {
  padding: 30px 40px;
  width: 40%;

  background-color: var(--dark-purple-color);
  box-shadow: 0 5px 10px 4px rgba(44, 46, 67, 0.7);
  border-radius: 7px;
}


.profile__data-header {
  margin: 0 0 40px;

  display: flex;
  align-items: center;

  text-align: center;
  font-size: 27px;
  font-weight: 500;

  color: #eeeeee;
}

.profile__avatar {
  width: 80px;
  height: 80px;
  margin: 0 50px 0 0;

  background-size: 80% 80%;
  background-color: white;
  border-radius: 40px;
  border: none;
}

.profile__no-avatar {
  width: 80px;
  height: 80px;
  margin: 0 50px 0 0;
}


.profile__data-row {
  margin: 0 0 20px 0;

  display: flex;
  flex-wrap: wrap;

  font-size: 22px;
}

.profile__data-parameter {
  margin: 0 10px 0 0;

  color: #cccccc;
}

.profile__data-value {
  font-weight: 500;

  color: #cccccc;

  overflow: auto;
}


.profile__change-data-button-wrapper {
  margin: 50px 0 0 0;

  display: flex;
  justify-content: center;
}

.profile__change-data-button {
  width: 70px;
  height: 70px;
}


.profile__change-data-form {
  width: 25vw;
}
</style>