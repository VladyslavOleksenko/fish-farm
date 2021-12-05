<template>
  <div class="employee">
    <div class="employee__content">
      <div class="employee__info">
        <div class="employee__avatar"
             @click.stop="infoBlockVisibilityStatus = true">
          <NoAvatar class="employee__no-avatar"/>
        </div>
        <div class="employee__fullName">
          {{ user.firstName }} {{ user.lastName }}
        </div>
        <div class="employee__buttons"
             v-if="category !== 'owner' && $route.name !== 'Dashboard'">
          <MyRoundButton class="employee__button"
                         icon-name="delete"
                         @click="deleteModalData.visibilityStatus = true"/>
          <MyRoundButton class="employee__button"
                         icon-name="edit"
                         @click="changeModalData.visibilityStatus = true"/>
        </div>
      </div>
      <Tasks class="employee__tasks"
             v-if="category === 'workers' && $route.name === 'Dashboard'"
             :farmWorkerId="user.farmWorkerId"/>
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
              @submitted="sendChangeEmployeeRequest">
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
              @submitted="sendChangeEmployeeRequest">
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
  changeAdministrator,
  changeWorker
} from "@/assets/js/serverRequest";
import Tasks from "@/components/TaskBlock/Tasks";

export default {
  name: "Employee",
  components: {
    Tasks,
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
    user: {type: Object, required: true}
  },
  data: () => ({
    infoBlockVisibilityStatus: false,
    changeModalData: {
      visibilityStatus: false,
      messageVisibilityStatus: false,
      content: {}
    },
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
    },
    infoBlockContent() {
      if (this.category === "owner") {
        return {
          title: "Farm owner",
          parameterArray: [
            'Email',
            'First name',
            'Last name'
          ],
          valueArray: [
            this.user.email,
            this.user.firstName,
            this.user.lastName
          ]
        }
      }
      if (this.category === "administrators") {
        return {
          title: "Farm administrator",
          parameterArray: [
            'Email',
            'First name',
            'Last name',
            'Manage pools access',
            'Add administrator access',
            'Delete administrator access',
            'Change accesses access'
          ],
          valueArray: [
            this.user.email,
            this.user.firstName,
            this.user.lastName,
            this.getWordByBoolean(this.user.managePoolsAccess),
            this.getWordByBoolean(this.user.addAdministratorAccess),
            this.getWordByBoolean(this.user.deleteAdministratorAccess),
            this.getWordByBoolean(this.user.changeAccessesAccess)
          ]
        }
      }
      if (this.category === "workers") {
        const roleName =
          this.user.roleName ? this.user.roleName : "no role given"

        return {
          title: "Worker invitation",
          parameterArray: [
            'Email',
            'First name',
            'Last name',
            'Role name'
          ],
          valueArray: [
            this.user.email,
            this.user.firstName,
            this.user.lastName,
            roleName
          ]
        }
      }
    }
  },
  methods: {
    sendDeleteEvent() {
      this.$emit('delete', this.user)
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
    async sendChangeEmployeeRequest() {
      try {
        if (this.category === "administrators") {
          const administratorData = {
            farmAdministratorId:
            this.user.farmAdministratorId,
            managePoolsAccess:
            this.changeModalData.content.managePoolsAccess,
            addAdministratorAccess:
            this.changeModalData.content.addAdministratorAccess,
            deleteAdministratorAccess:
            this.changeModalData.content.deleteAdministratorAccess,
            changeAccessesAccess:
            this.changeModalData.content.changeAccessesAccess
          }

          await changeAdministrator(administratorData)
        }
        if (this.category === "workers") {
          const workerData = {
            farmWorkerId: this.user.farmWorkerId,
            roleName: this.changeModalData.content.roleName
          }

          await changeWorker(workerData)
        }
      } catch (exception) {
        console.log(exception)
        return
      }

      this.changeModalData.visibilityStatus = false
      await this.$emit("update")
    },

    updateChangeModalData() {
      if (this.category === "administrators") {
        this.changeModalData.content = {
          title: `Farm administrator ${this.user.firstName} ${this.user.lastName}`,
          message: "",
          managePoolsAccess: this.user.managePoolsAccess,
          addAdministratorAccess: this.user.addAdministratorAccess,
          deleteAdministratorAccess: this.user.deleteAdministratorAccess,
          changeAccessesAccess: this.user.changeAccessesAccess
        }
      }
      if (this.category === "workers") {
        this.changeModalData.content = {
          title: `Farm worker ${this.user.firstName} ${this.user.lastName}`,
          message: "",
          roleName: this.user.roleName
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
  }
}
</script>

<style scoped>
.employee__content {
  padding: 10px 20px;

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


.employee__info {
  display: flex;
  align-items: center;
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


.employee__tasks {
  margin: 20px 0 0 50px;
}
</style>