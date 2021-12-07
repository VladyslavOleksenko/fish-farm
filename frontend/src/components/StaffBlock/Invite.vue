<template>
  <div class="invite">
    <div class="invite__content">
      <div class="invite__avatar"
           @click.stop="infoBlockVisibilityStatus = true">
        <MyIcon class="invite__no-avatar" icon-name="notRegistered"
                path-color="#aaa"/>
      </div>
      <div class="invite__email">
        {{ cutString(invite.email, 24) }}
      </div>
      <div class="invite__buttons">
        <MyRoundButton
          v-if="userPermissions.deleteEmployees"
          class="invite__button"
          icon-name="delete"
          @click="deleteModalData.visibilityStatus = true"/>
        <MyRoundButton
          v-if="changeButtonVisibilityStatus"
          class="invite__button"
          icon-name="edit"
          @click="changeModalData.visibilityStatus = true"/>
      </div>
    </div>

    <Info v-if="infoBlockVisibilityStatus"
          :data="infoBlockContent"
          @hide="infoBlockVisibilityStatus = false"/>

    <MyModal v-if="changeModalData.visibilityStatus"
             @hide="changeModalData.visibilityStatus = false">
      <MyForm v-if="category === 'administrators'"
              :title-text="changeModalData.content.title"
              submit-text="Change"
              :submit-disabled="!validateChangeModalData"
              :message="changeModalData.message"
              v-model:message-visibility-status="changeModalData.messageVisibilityStatus"
              @submitted="sendChangeInviteRequest">
        <FormRow>
          <FormInput
            type="checkbox"
            placeholder="Manage pools access"
            v-model="changeModalData.content.managePoolsAccess"
            @updated="changeModalDataUpdated"/>
        </FormRow>
        <FormRow>
          <FormInput
            type="checkbox"
            placeholder="Add administrator access"
            v-model="changeModalData.content.addAdministratorAccess"
            @updated="changeModalDataUpdated"/>
        </FormRow>
        <FormRow>
          <FormInput
            type="checkbox"
            placeholder="Delete administrator access"
            v-model="changeModalData.content.deleteAdministratorAccess"
            @updated="changeModalDataUpdated"/>
        </FormRow>
        <FormRow>
          <FormInput
            type="checkbox"
            placeholder="Change accesses access"
            v-model="changeModalData.content.changeAccessesAccess"
            @updated="changeModalDataUpdated"/>
        </FormRow>
      </MyForm>
      <MyForm v-else-if="category === 'workers'"
              :title-text="changeModalData.content.title"
              submit-text="Change"
              :submit-disabled="!validateChangeModalData"
              :message="changeModalData.message"
              v-model:message-visibility-status="changeModalData.messageVisibilityStatus"
              @submitted="sendChangeInviteRequest">
        <FormRow>
          <FormInput
            type="text"
            placeholder="Role name"
            v-model="changeModalData.content.roleName"
            @updated="changeModalDataUpdated"/>
        </FormRow>
      </MyForm>
    </MyModal>

    <DeleteModal v-if="deleteModalData.visibilityStatus"
                 :content="deleteModalData.content"
                 @hide="deleteModalData.visibilityStatus = false"
                 @delete="sendDeleteEvent"/>
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
import MyForm from "@/components/Form/MyForm";
import FormRow from "@/components/Form/FormRow";
import FormInput from "@/components/Form/FormInput";
import {
  changeAdministratorInvite,
  changeWorkerInvite
} from "@/assets/js/serverRequest";

export default {
  name: "Invite",
  components: {
    FormInput,
    FormRow,
    MyForm,
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
    invite: {type: Object, required: true},
    userPermissions: {type: Object, required: true}
  },
  data: () => ({
    infoBlockVisibilityStatus: false,
    changeModalData: {
      visibilityStatus: false,
      messageVisibilityStatus: false,
      content: {}
    },
    deleteModalData: {},
    changeButtonVisibilityStatus: false
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
    },
    infoBlockContent() {
      if (this.category === "administrators") {
        return {
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

        return {
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
    validateChangeModalData() {
      return true
    },
    changeModalDataUpdated() {
      this.changeModalData.messageVisibilityStatus = false
    },
    async sendChangeInviteRequest() {
      try {
        if (this.category === "administrators") {
          const invitorData = {
            administratorInviteId:
            this.invite.administratorInviteId,
            managePoolsAccess:
            this.changeModalData.content.managePoolsAccess,
            addAdministratorAccess:
            this.changeModalData.content.addAdministratorAccess,
            deleteAdministratorAccess:
            this.changeModalData.content.deleteAdministratorAccess,
            changeAccessesAccess:
            this.changeModalData.content.changeAccessesAccess
          }

          await changeAdministratorInvite(invitorData)
        }
        if (this.category === "workers") {
          const invitorData = {
            workerInviteId: this.invite.workerInviteId,
            roleName: this.changeModalData.content.roleName
          }

          await changeWorkerInvite(invitorData)
        }
      } catch (exception) {
        return console.log(exception)
      }

      this.changeModalData.visibilityStatus = false
      await this.$emit("update")
    },

    updateChangeModalData() {
      if (this.category === "administrators") {
        this.changeModalData.content = {
          title: `Administrator invitation for "${this.invite.email}"`,
          message: "",
          managePoolsAccess: this.invite.managePoolsAccess,
          addAdministratorAccess: this.invite.addAdministratorAccess,
          deleteAdministratorAccess: this.invite.deleteAdministratorAccess,
          changeAccessesAccess: this.invite.changeAccessesAccess
        }
      }
      if (this.category === "workers") {
        this.changeModalData.content = {
          title: `Worker invitation for "${this.invite.email}"`,
          message: "",
          roleName: this.invite.roleName
        }
      }
    },
    updateDeleteModalData() {
      this.deleteModalData = {
        visibilityStatus: false,
        content: {
          message: this.deleteModalDataMessage
        }
      }
    }
  },
  mounted() {
    this.updateChangeModalData()
    this.updateDeleteModalData()

    this.changeButtonVisibilityStatus = (
      this.category === "administrators" &&
      this.userPermissions.changeAdministrator ||
      this.category === "workers" &&
      this.userPermissions.changeWorker
    )
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