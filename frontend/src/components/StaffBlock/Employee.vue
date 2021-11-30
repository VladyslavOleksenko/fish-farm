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
                       @click="deleteModalVisibilityStatus = true"/>
        <MyRoundButton class="employee__button"
                       icon-name="edit"/>
      </div>
    </div>

    <MyModal v-if="deleteModalVisibilityStatus"
             @hide="deleteModalVisibilityStatus = false">
      <div class="farm__delete-modal delete-modal">
        <div class="delete-modal__title">
          You are going to delete
          {{ user.firstName }} {{ user.lastName }}
          from your farm.
          <br>
          This will also delete all the connection data.
        </div>
        <div class="delete-modal__warning">
          This action couldn't be undone
        </div>
        <div class="delete-modal__warning">
          Are you sure?
        </div>
        <MyRectangleButton class="delete-modal__button"
                           text="Delete employee"
                           icon-name="delete"
                           @click="sendDeleteEvent"/>
      </div>
    </MyModal>

    <Info v-if="infoBlockData.visibilityStatus"
          :data="infoBlockData"
          @hide="infoBlockData.visibilityStatus = false"/>
  </div>
</template>

<script>
import MyIcon from "@/components/UI/MyIcon";
import NoAvatar from "@/components/NoAvatar/NoAvatar";
import MyRoundButton from "@/components/UI/MyRoundButton";
import MyModal from "@/components/UI/MyModal";
import MyRectangleButton from "@/components/UI/MyRectangleButton";
import Info from "@/components/InfoBlock/Info";

export default {
  name: "Employee",
  components: {
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
    deleteModalVisibilityStatus: false,
    infoBlockData: {}
  }),
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
      return this.infoBlockData = {
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

      return this.infoBlockData = {
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