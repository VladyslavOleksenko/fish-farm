<template>
  <div class="invite">
    <div class="invite__avatar">
      <MyIcon class="invite__no-avatar" icon-name="notRegistered" path-color="#aaa"/>
    </div>
    <div class="invite__email">{{ invite.email }}</div>
    <div class="invite__buttons">
      <MyRoundButton class="invite__button"
                     icon-name="delete"
                     @click="deleteModalVisibilityStatus = true"/>
      <MyRoundButton class="invite__button"
                     icon-name="edit"/>
    </div>

    <MyModal v-if="deleteModalVisibilityStatus"
             @hide="deleteModalVisibilityStatus = false">
      <div class="farm__delete-modal delete-modal">
        <div class="delete-modal__title">
          You are going to delete the invitation for
          "{{invite.email}}"
        </div>
        <div class="delete-modal__warning">
          This action couldn't be undone
        </div>
        <div class="delete-modal__warning">
          Are you sure?
        </div>
        <MyRectangleButton class="delete-modal__button"
                           text="Delete invitation"
                           icon-name="delete"
                           @click="sendDeleteEvent"/>
      </div>
    </MyModal>
  </div>
</template>

<script>
import MyIcon from "@/components/UI/MyIcon";
import NoAvatar from "@/components/NoAvatar/NoAvatar";
import MyRoundButton from "@/components/UI/MyRoundButton";
import MyModal from "@/components/UI/MyModal";
import MyRectangleButton from "@/components/UI/MyRectangleButton";

export default {
  name: "Invite",
  components: {MyRectangleButton, MyModal, MyRoundButton, NoAvatar, MyIcon},
  props: {
    category: {type: String, required: true},
    invite: {type: Object, required: true}
  },
  data: () => ({
    deleteModalVisibilityStatus: false
  }),
  methods: {
    sendDeleteEvent() {
      this.$emit('delete', this.invite)
      this.deleteModalVisibilityStatus = false
    }
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


.delete-modal {
  padding: 20px 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.delete-modal__title {
  margin: 0 0 30px 0;

  font-size: 25px;
  text-align: center;

  color: #eeeeee;
}

.delete-modal__warning {
  margin: 0 0 15px 0;

  font-size: 20px;

  color: #ff6161;
}

.delete-modal__button {
  margin: 60px 0 0 0;
  height: 60px;
}
</style>