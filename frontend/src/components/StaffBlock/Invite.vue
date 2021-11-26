<template>
  <div class="invite">
    <div class="invite__avatar">
      <MyIcon class="invite__no-avatar" icon-name="notRegistered" path-color="#aaa"/>
    </div>
    <div class="invite__email">{{ invite.email }}</div>
    <div class="invite__buttons">
      <MyRoundButton class="invite__button"
                     icon-name="delete"
                     @click="$emit('delete', invite)"/>
      <MyRoundButton class="invite__button"
                     icon-name="edit"/>
    </div>
  </div>
</template>

<script>
import MyIcon from "@/components/UI/MyIcon";
import NoAvatar from "@/components/NoAvatar/NoAvatar";
import MyRoundButton from "@/components/UI/MyRoundButton";

export default {
  name: "Invite",
  components: {MyRoundButton, NoAvatar, MyIcon},
  props: {
    category: {type: String, required: true},
    invite: {type: Object, required: true}
  }
}
</script>

<style scoped>
.invite {
  padding: 10px 20px;

  display: flex;
  align-items: center;

  color: #B2B1B9;
  border-radius: 4px;

  cursor: pointer;
  transition: background-color .2s ease,
  color .2s ease;
}

.invite:hover {
  color: #ffffff;
  background-color: var(--light-purple-color);
}


.invite__avatar {
  width: 50px;
  height: 50px;
  margin: 0 50px 0 0;
}

.invite__no-avatar {
  width: 100%;
  height: 100%;
}


.invite__email {
  flex: 1 1 auto;

  font-size: 18px;
}


.invite__buttons {
  display: flex;
}

.invite__button {
  width: 40px;
  height: 40px;
}

.invite__button:first-child {
  margin: 0 20px 0 0;
}
</style>