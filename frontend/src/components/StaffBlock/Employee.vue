<template>
  <div class="employee">
    <div class="employee__content">
      <div class="employee__avatar"
           @click.stop="infoBlockData.visibilityStatus = true">
        <NoAvatar class="employee__no-avatar"/>
      </div>
      <div class="employee__fullName">
        {{ user.firstName }} {{ user.lastName }}
      </div>
      <div class="employee__buttons"
           v-if="category !== 'owner'">
        <MyRoundButton class="employee__button"
                       icon-name="delete"
                       @click="deleteModalData.visibilityStatus = true"/>
        <MyRoundButton class="employee__button"
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
  name: "Employee",
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
    user: {type: Object, required: true}
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

      return `You are about to delete the ${role} ` +
        `${this.user.firstName} ${this.user.lastName}"`
    }
  },
  methods: {
    sendDeleteEvent() {
      this.$emit('delete', this.user)
      this.deleteModalVisibilityStatus = false
    },
    getWordByBoolean(boolean) {
      return boolean ? "YES" : "NO"
    }
  },
  mounted() {
    if (this.category === "administrators") {
      this.infoBlockData = {
        title: "Farm administrator",
        parameterArray: [
          'First name',
          'Last name',
          'Email',
          'Manage pools access',
          'Add administrator access',
          'Delete administrator access',
          'Change accesses access'
        ],
        valueArray: [
          this.user.firstName,
          this.user.lastName,
          this.user.email,
          this.getWordByBoolean(this.user.managePoolsAccess),
          this.getWordByBoolean(this.user.addAdministratorAccess),
          this.getWordByBoolean(this.user.deleteAdministratorAccess),
          this.getWordByBoolean(this.user.changeAccessesAccess)
        ]
      }
    }
    if (this.category === "workers") {
      const roleName =
        this.invite.roleName ? this.invite.roleName : "no role given"

      this.infoBlockData = {
        title: "Farm worker",
        parameterArray: [
          'First name',
          'Last name',
          'Email',
          'Role name'
        ],
        valueArray: [
          this.user.firstName,
          this.user.lastName,
          this.user.email,
          roleName
        ]
      }
    }
    if (this.category === "owner") {
      this.infoBlockData = {
        title: "Farm owner",
        parameterArray: [
          'First name',
          'Last name',
          'Email'
        ],
        valueArray: [
          this.user.firstName,
          this.user.lastName,
          this.user.email
        ]
      }
    }

    if (this.category !== "administrators" && this.category !== "workers") {
      return
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
.employee__content {
  padding: 10px 20px;

  display: flex;
  align-items: center;

  color: #cccccc;
  border-radius: 4px;

  cursor: pointer;
  transition: background-color .2s ease,
  color .2s ease;
}

.employee__content:hover {
  color: #ffffff;
  background-color: var(--light-purple-color);
}


.employee__avatar {
  width: 50px;
  height: 50px;
  margin: 0 50px 0 0;
}

.employee__no-avatar {
  width: 100%;
  height: 100%;
}


.employee__fullName {
  flex: 1 1 auto;

  font-size: 20px;
}


.employee__buttons {
  display: flex;
}

.employee__button {
  width: 40px;
  height: 40px;
}

.employee__button:first-child {
  margin: 0 20px 0 0;
}
</style>