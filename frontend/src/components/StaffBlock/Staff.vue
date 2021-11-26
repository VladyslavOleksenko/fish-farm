<template>
  <div class="staff">
    <div class="staff__content">
      <div class="staff__category">{{ category }}</div>

      <div class="staff__users">
        <Employee class="staff__user"
                  v-for="(user, i) of userArray"
                  :key="i"
                  :user="user"
                  :category="category"/>
      </div>

      <div class="staff__add-button-wrapper">
        <MyRectangleButton class="staff__add-button"
                           v-if="category !== 'owner'"
                           icon-name="add"
                           :text="'Add ' + categoryInSingular"
                           @click="inviteModalVisibilityStatus = true"/>
      </div>

      <MyModal v-if="inviteModalVisibilityStatus"
               @hide="inviteModalVisibilityStatus = false">
        <div class="staff__invite-modal invite-modal">
          <div class="invite-modal__advice">
            <span>To invite an </span>
            <span class="invite-modal__bold-span">{{ categoryInSingular }}</span>
            <br>
            <span>please enter his or her </span>
            <span class="invite-modal__bold-span">email</span>
          </div>
          <div class="invite-modal__error">{{ inviteModalData.error }}</div>
          <input class="invite-modal__input"
                 type="email"
                 placeholder="Email *"
                 v-model="inviteModalData.email">
          <input class="invite-modal__submit"
                 type="submit"
                 value="invite"
                 :disabled="!inviteModalDataValidStatus"
                 @click="sendInviteRequest">
        </div>
      </MyModal>
    </div>
  </div>
</template>

<script>
import Employee from "@/components/StaffBlock/Employee";
import MyRectangleButton from "@/components/UI/MyRectangleButton";
import MyModal from "@/components/UI/MyModal";
import {inviteAdministrator, inviteWorker} from "@/assets/js/serverRequest";

export default {
  name: "Staff",
  components: {MyModal, MyRectangleButton, Employee},
  props: {
    category: {type: String, required: true},
    userArray: {type: Array, default: []},
    farmId: {type: String}
  },
  data: () => ({
    inviteModalVisibilityStatus: false,
    inviteModalData: {
      email: "",
      error: ""
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
    }
  },
  methods: {
    async sendInviteRequest() {
      if (this.category === "administrators") {
        const invitorData = {
          email: this.inviteModalData.email,
          farmId: this.farmId,
          addAdministratorAccess: true,
          deleteAdministratorAccess: false,
          managePoolsAccess: true,
          changeAccessesAccess: false
        }
        try {
          await inviteAdministrator(invitorData)
        } catch (exception) {
          return this.inviteModalData.error = exception.details
        }
      }
      if (this.category === "workers") {
        const invitorData = {
          email: this.inviteModalData.email,
          farmId: this.farmId,
          roleName: "some role"
        }
        try {
          await inviteWorker(invitorData)
        } catch (exception) {
          return this.inviteModalData.error = exception.details
        }
      }


      this.inviteModalData.email = ""
      this.inviteModalVisibilityStatus = false
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

.staff__user {
  margin: 0 0 20px 0;
}

.staff__user:last-child {
  margin: 0;
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


.invite-modal {
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.invite-modal__advice {
  margin: 0 0 15px 0;

  font-size: 20px;
  text-align: center;

  color: #eeeeee;
}

.invite-modal__bold-span {
  font-size: 1.2em;
  font-weight: 500;

  color: #ffffff;
}


.invite-modal__error {
  margin: 0 0 40px 0;

  text-align: center;
  font-size: 20px;
  font-weight: 500;

  color: #ff6060;
}


.invite-modal__input {
  width: 100%;
  height: 53px;
  padding: 0 15px;

  font-size: 22px;

  color: #fff;
  background-color: var(--light-purple-color);
  border: none;
  border-radius: 4px;
  outline: none;
}

.invite-modal__input::placeholder {
  color: var(--light-gray-color);
}


.invite-modal__submit {
  margin: 50px 0 0 0;
  height: 50px;
  padding: 0 50px;

  font-size: 22px;
  font-weight: 500;

  color: #eee;
  background-color: var(--blue-color);

  border: none;
  border-radius: 4px;
  outline: none;

  transition: background-color .2s ease;
  cursor: pointer;
}

.invite-modal__submit:hover {
  background-color: #6fa360;
}

.invite-modal__submit:active {
  background-color: #5e8b52;
}

.invite-modal__submit[disabled] {
  color: #7f7f7f;
  background: var(--light-purple-color);
}
</style>