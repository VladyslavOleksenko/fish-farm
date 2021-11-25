<template>
  <div class="profile">
    <img class="profile__image" src="../../public/profile.svg" alt="">
    <div class="profile__exit-button exit-button"
         @click="logout">
      <MyIcon class="exit-button__icon" icon-name="logout" path-color="#ccc"/>
      <p class="exit-button__text">Exit</p>
    </div>

    <div class="profile__greeting">Hello, Vladyslav</div>
    <div class="profile__slogan">It is your profile page</div>

    <div class="profile__personal-data-block">
      <div class="profile__personal-data-slogan">Your personal data</div>
      <img class="profile__avatar"
           v-if="avatar"
           :src="avatar"
           alt="">
      <NoAvatar class="profile__no-avatar" v-else/>
      <div class="profile__personal-data-row">
        <div class="profile__data-parameter">First name:</div>
        <div class="profile__data-value">{{ user.firstName }}</div>
      </div>
      <div class="profile__personal-data-row">
        <div class="profile__data-parameter">Last name:</div>
        <div class="profile__data-value">{{ user.lastName }}</div>
      </div>
      <div class="profile__personal-data-row">
        <div class="profile__data-parameter">Email:</div>
        <div class="profile__data-value">{{ user.email }}</div>
      </div>
      <div class="profile__change-data-button-wrapper">
        <button class="profile__change-data-button">
          <MyIcon class="profile__change-data-icon" icon-name="edit" path-color="#eee"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import MyIcon from "@/components/UI/MyIcon";
import {mapState, mapActions} from "vuex";
import NoAvatar from "@/components/NoAvatar/NoAvatar";

export default {
  name: "Profile",
  components: {NoAvatar, MyIcon},
  computed: {
    ...mapState({
      user: state => state.user.user
    }),
    avatar() {
      return null
    }
  },
  methods: {
    ...mapActions({
      logout: "authorization/logout"
    })
  }
}
</script>

<style scoped>
.profile {
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


.profile__avatar {
  width: 80px;
  height: 80px;
  margin: 0 0 20px 0;

  background-size: 80% 80%;
  background-color: white;
  border-radius: 40px;
  border: none;
}

.profile__no-avatar {
  width: 80px;
  height: 80px;
  margin: 0 0 20px 0;
}


.profile__personal-data-block {
  padding: 30px 40px;
  width: 40%;

  background-color: var(--dark-purple-color);
  box-shadow: 0 5px 10px 4px rgba(44, 46, 67, 0.7);
  border-radius: 7px;
}

.profile__personal-data-slogan {
  margin: 0 0 40px;

  text-align: center;
  font-size: 25px;

  color: #eeeeee;
}

.profile__personal-data-row {
  margin: 0 0 20px 0;

  display: flex;

  font-size: 22px;
}

.profile__data-parameter {
  margin: 0 10px 0 0;

  color: #cccccc;
}

.profile__data-value {
  font-weight: 500;

  color: #cccccc;
}


.profile__change-data-button-wrapper {
  margin: 50px 0 0 0;

  display: flex;
  justify-content: center;
}

.profile__change-data-button {
  width: 70px;
  height: 70px;

  background: none;
  border-radius: 50px;
  border: 2px solid #cccccc;

  cursor: pointer;
  transition: background-color .2s ease;
}

.profile__change-data-button:hover {
  background-color: #494d6d;
}

.profile__change-data-icon {
  width: 50%;
  height: 50%;
}
</style>