<template>
  <div class="staff">
    <div class="staff__content">
      <div class="staff__category">{{ category }}</div>

      <div class="staff__users">
        <Employee class="staff__user"
                  v-for="(user, i) of userArray"
                  :key="i"
                  :user="user"
                  :category="category"
                  @delete="sendEmployeeDeleteRequest"/>
      </div>
      <div class="staff__invites">
        <Invite class="staff__invite"
                v-for="(invite, i) of inviteArray"
                :key="i"
                :invite="invite"
                :category="category"
                @delete="sendInviteDeleteRequest"/>
      </div>

      <div class="staff__add-button-wrapper">
        <MyRectangleButton class="staff__add-button"
                           v-if="category !== 'owner'"
                           icon-name="add"
                           :text="'Add ' + categoryInSingular"
                           @click="showInviteModal"/>
      </div>

      <MyModal v-if="inviteAdministratorModalData.visibilityStatus"
               @hide="inviteAdministratorModalData.visibilityStatus = false">
        <MyForm class="staff__invite-form"
                title-text="Fill all the fields to invite a new administrator"
                submit-text="Invite"
                :submit-disabled="!validateInviteAdministratorModalData"
                :message="inviteAdministratorModalData.message"
                v-model:message-visibility-status="inviteAdministratorModalData.messageVisibilityStatus"
                @submitted="sendInviteAdministratorRequest">
          <FormRow>
            <FormInput
              type="text"
              placeholder="Email"
              required
              v-model="inviteAdministratorModalData.email"
              @updated="inviteAdministratorModalDataChanged"/>
          </FormRow>
          <FormRow>
            <FormInput
              type="checkbox"
              placeholder="Manage pools access"
              v-model="inviteAdministratorModalData.managePoolsAccess"/>
          </FormRow>
          <FormRow>
            <FormInput
              type="checkbox"
              placeholder="Add administrator access"
              v-model="inviteAdministratorModalData.addAdministratorAccess"/>
          </FormRow>
          <FormRow>
            <FormInput
              type="checkbox"
              placeholder="Delete administrator access"
              v-model="inviteAdministratorModalData.deleteAdministratorAccess"/>
          </FormRow>
          <FormRow>
            <FormInput
              type="checkbox"
              placeholder="Change accesses access"
              v-model="inviteAdministratorModalData.changeAccessesAccess"/>
          </FormRow>
        </MyForm>
      </MyModal>

      <MyModal v-if="inviteWorkerModalData.visibilityStatus"
               @hide="inviteWorkerModalData.visibilityStatus = false">
        <MyForm class="staff__invite-form"
                title-text="Fill all the fields to invite a new worker"
                submit-text="Invite"
                :submit-disabled="!validateInviteWorkerModalData"
                :message="inviteWorkerModalData.message"
                v-model:message-visibility-status="inviteWorkerModalData.messageVisibilityStatus"
                @submitted="sendInviteWorkerRequest">
          <FormRow>
            <FormInput
              type="text"
              placeholder="Email"
              required
              v-model="inviteWorkerModalData.email"
              @updated="inviteWorkerModalDataChanged"/>
          </FormRow>
          <FormRow>
            <FormInput
              type="text"
              placeholder="Role name"
              v-model="inviteWorkerModalData.roleName"
              @updated="inviteWorkerModalDataChanged"/>
          </FormRow>
        </MyForm>
      </MyModal>
    </div>
  </div>
</template>

<script>
import Employee from "@/components/StaffBlock/Employee";
import MyRectangleButton from "@/components/UI/MyRectangleButton";
import MyModal from "@/components/Modal/MyModal";
import {
  inviteAdministrator,
  inviteWorker,
  deleteAdministrator,
  deleteAdministratorInvite,
  deleteWorker,
  deleteWorkerInvite
} from "@/assets/js/serverRequest";
import Invite from "@/components/StaffBlock/Invite";
import MyForm from "@/components/Form/MyForm";
import FormRow from "@/components/Form/FormRow";
import FormInput from "@/components/Form/FormInput";

export default {
  name: "Staff",
  components: {
    FormInput,
    FormRow, MyForm, Invite, MyModal, MyRectangleButton, Employee
  },
  props: {
    category: {type: String, required: true},
    userArray: {type: Array, default: []},
    inviteArray: {type: Array, default: []},
    farmId: {type: String}
  },
  data: () => ({
    inviteModalVisibilityStatus: false,
    inviteAdministratorModalData: {
      email: "",
      addAdministratorAccess: false,
      deleteAdministratorAccess: false,
      managePoolsAccess: false,
      changeAccessesAccess: false,
      message: "",
      messageVisibilityStatus: false,
      visibilityStatus: false
    },
    inviteWorkerModalData: {
      email: "",
      roleName: "",
      message: "",
      messageVisibilityStatus: false,
      visibilityStatus: false
    }
  }),
  computed: {
    categoryInSingular() {
      if (this.category === "administrators") {
        return "administrator"
      }
      if (this.category === "workers") {
        return "worker"
      }
    },
    inviteModalDataValidStatus() {
      return !!this.inviteModalData.email
    },
    validateInviteAdministratorModalData() {
      if (!this.inviteAdministratorModalData.email) {
        this.inviteAdministratorModalData.message =
          "Please enter email first"
        return false
      }

      return true
    },
    validateInviteWorkerModalData() {
      if (!this.inviteWorkerModalData.email) {
        this.inviteWorkerModalData.message =
          "Please enter email first"
        return false
      }

      return true
    }
  },
  methods: {
    showInviteModal() {
      if (this.category === "administrators") {
        return this.inviteAdministratorModalData.visibilityStatus = true
      }
      if (this.category === "workers") {
        return this.inviteWorkerModalData.visibilityStatus = true
      }
    },
    inviteAdministratorModalDataChanged() {
      this.inviteAdministratorModalData.messageVisibilityStatus = false
    },
    inviteWorkerModalDataChanged() {
      this.inviteWorkerModalData.messageVisibilityStatus = false
    },
    async sendInviteAdministratorRequest() {
      const invitorData = {
        email: this.inviteAdministratorModalData.email,
        farmId: this.farmId,
        managePoolsAccess:
        this.inviteAdministratorModalData.managePoolsAccess,
        addAdministratorAccess:
        this.inviteAdministratorModalData.addAdministratorAccess,
        deleteAdministratorAccess:
        this.inviteAdministratorModalData.deleteAdministratorAccess,
        changeAccessesAccess:
        this.inviteAdministratorModalData.changeAccessesAccess
      }
      try {
        await inviteAdministrator(invitorData)
      } catch (exception) {
        this.inviteAdministratorModalData.message = exception.details
        return this.inviteAdministratorModalData.messageVisibilityStatus = true
      }

      this.inviteAdministratorModalData.email = ""
      this.inviteAdministratorModalData.visibilityStatus = false
      this.inviteAdministratorModalData.messageVisibilityStatus = false

      this.$emit('updateUserArray')
      this.$emit('updateInviteArray')
    },
    async sendInviteWorkerRequest() {
      const invitorData = {
        email: this.inviteWorkerModalData.email,
        farmId: this.farmId,
        roleName: this.inviteWorkerModalData.roleName
      }
      try {
        await inviteWorker(invitorData)
      } catch (exception) {
        this.inviteWorkerModalData.message = exception.details
        return this.inviteWorkerModalData.messageVisibilityStatus = true
      }

      this.inviteWorkerModalData.email = ""
      this.inviteWorkerModalData.roleName = ""
      this.inviteWorkerModalData.visibilityStatus = false

      this.$emit('updateUserArray')
      this.$emit('updateInviteArray')
    },
    async sendEmployeeDeleteRequest(user) {
      if (this.category === "administrators") {
        await deleteAdministrator(user.farmAdministratorId)
      }
      if (this.category === "workers") {
        await deleteWorker(user.farmWorkerId)
      }
      this.$emit('updateUserArray')
    },
    async sendInviteDeleteRequest(invite) {
      if (this.category === "administrators") {
        await deleteAdministratorInvite(invite.administratorInviteId)
      }
      if (this.category === "workers") {
        await deleteWorkerInvite(invite.workerInviteId)
      }
      this.$emit('updateInviteArray')
    }
  }
}
</script>

<style scoped>
.staff__content {
  width: 100%;
  padding: 20px;

  background-color: var(--dark-purple-color);
  box-shadow: 0 5px 10px 4px rgba(44, 46, 67, 0.7);
  border-radius: 6px;
}


.staff__category {
  margin: 0 0 30px 0;
  font-size: 25px;
  text-align: center;
  text-transform: capitalize;

  color: #eeeeee;
}

.staff__user:last-child {
  margin: 0;
}


.staff__users {
  margin: 0 0 40px 0;
}


.staff__add-button-wrapper {
  margin: 50px 0 0 0;

  display: flex;
  justify-content: center;
}

.staff__add-button {
  height: 50px;
  padding: 0 50px;
}


.staff__invite-form {
  max-width: 25vw;
}
</style>