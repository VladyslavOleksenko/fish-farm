<template>
  <div class="invite">
    <div class="invite__content">
      <div class="invite__avatar"
           @click.stop="infoBlockData.visibilityStatus = true">
        <MyIcon class="invite__no-avatar" icon-name="notRegistered"
                path-color="#aaa"/>
      </div>
      <div class="invite__email">
        {{ cutString(invite.email, 24) }}
      </div>
      <div class="invite__buttons">
        <MyRoundButton class="invite__button"
                       icon-name="delete"
                       @click="deleteModalData.visibilityStatus = true"/>
        <MyRoundButton class="invite__button"
                       icon-name="edit"/>
      </div>
    </div>

    <DeleteModal v-if="deleteModalData.visibilityStatus"
                 :content="deleteModalData.content"
                 @hide="deleteModalData.visibilityStatus = false"
                 @delete="sendDeleteEvent"/>

    <Info v-if="infoBlockData.visibilityStatus"
          :data="infoBlockData"
          @hide="infoBlockData.visibilityStatus = false"/>
  </div>
</template>

<script>
import MyIcon from "@/components/UI/MyIcon";
import NoAvatar from "@/components/NoAvatar/NoAvatar";
import MyRoundButton from "@/components/UI/MyRoundButton";
import MyModal from "@/components/Modal/MyModal";
import MyRectangleButton from "@/components/UI/MyRectangleButton";
import Info from "@/components/InfoBlock/Info";
import DeleteModal from "@/components/Modal/DeleteModal";

export default {
  name: "Invite",
  components: {
    DeleteModal,
    Info,
    MyRectangleButton,
    MyModal,
    MyRoundButton,
    NoAvatar,
    MyIcon
  },
  props: {
    category: {type: String, required: true},
    invite: {type: Object, required: true}
  },
  data: () => ({
    infoBlockData: {},
    deleteModalData: {}
  }),
  computed: {
    deleteModalDataMessage() {
      let role = ""
      if (this.category === "administrators") {
        role = "administrator"
      } else if (this.category === "workers") {
        role = "worker"
      }

      return `You are about to delete the ${role} invitation ` +
        `for "${this.invite.email}"`
    }
  },
  methods: {
    cutString(string, length = 25) {
      if (string.length <= length) {
        return string
      }

      return string.substr(0, length - 3) + "..."
    },
    sendDeleteEvent() {
      this.$emit('delete', this.invite)
      this.deleteModalVisibilityStatus = false
    },
    getWordByBoolean(boolean) {
      return boolean ? "YES" : "NO"
    },
  },
  mounted() {
    if (this.category === "administrators") {
      this.infoBlockData = {
        title: "Administrator invitation",
        parameterArray: [
          'Email',
          'Manage pools access',
          'Add administrator access',
          'Delete administrator access',
          'Change accesses access'
        ],
        valueArray: [
          this.invite.email,
          this.getWordByBoolean(this.invite.managePoolsAccess),
          this.getWordByBoolean(this.invite.addAdministratorAccess),
          this.getWordByBoolean(this.invite.deleteAdministratorAccess),
          this.getWordByBoolean(this.invite.changeAccessesAccess)
        ]
      }
    }
    if (this.category === "workers") {
      const roleName =
        this.invite.roleName ? this.invite.roleName : "no role given"

      this.infoBlockData = {
        title: "Worker invitation",
        parameterArray: [
          'Email',
          'Role name'
        ],
        valueArray: [
          this.invite.email,
          roleName
        ]
      }
    }

    this.deleteModalData = {
      visibilityStatus: false,
      content: {
        message: this.deleteModalDataMessage
      }
    }
  }
}
</script>

<style scoped>
.invite__content {
  padding: 10px 20px;

  display: flex;
  align-items: center;

  color: #B2B1B9;
  border-radius: 4px;

  cursor: pointer;
  transition: background-color .2s ease,
  color .2s ease;
}

.invite__content:hover {
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