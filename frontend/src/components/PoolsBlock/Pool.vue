<template>
  <div class="pool">
    <div class="pool__name">{{ poolInfo.name }}</div>
    <div class="pool__buttons">
      <MyRoundButton class="pool__button"
                     icon-name="delete"
                     @click="deleteModalVisibilityStatus = true"/>
      <MyRoundButton class="pool__button"
                     icon-name="edit"
                     @click="changeModalData.visibilityStatus = true"/>
    </div>

    <MyModal v-if="changeModalData.visibilityStatus"
             @hide="changeModalData.visibilityStatus = false">
      <MyForm
        title-text="Change pool data here"
        submit-text="Change"
        :submit-disabled="!validateChangePoolData"
        :message="changeModalData.message"
        v-model:message-visibility-status="changeModalData.messageVisibilityStatus"
        @submitted="sendChangePoolRequest">
        <FormRow>
          <FormInput
            type="text"
            placeholder="Name"
            required
            v-model="changeModalData.name"
            @updated="changeModalDataUpdated"/>
        </FormRow>
      </MyForm>
    </MyModal>

    <MyModal v-if="deleteModalVisibilityStatus"
             @hide="deleteModalVisibilityStatus = false">
      <div class="farm__delete-modal delete-modal">
        <div class="delete-modal__title">
          You are going to delete the pool and all connected data
        </div>
        <div class="delete-modal__warning">
          This action couldn't be undone
        </div>
        <div class="delete-modal__warning">
          Are you sure?
        </div>
        <MyRectangleButton class="delete-modal__button"
                           text="Delete pool"
                           icon-name="delete"
                           @click="sendDeletePoolRequest"/>
      </div>
    </MyModal>
  </div>
</template>

<script>
import MyRoundButton from "@/components/UI/MyRoundButton";
import {deletePool, changePool} from "@/assets/js/serverRequest";
import MyModal from "@/components/Modal/MyModal";
import MyForm from "@/components/Form/MyForm";
import FormRow from "@/components/Form/FormRow";
import FormInput from "@/components/Form/FormInput";
import MyRectangleButton from "@/components/UI/MyRectangleButton";

export default {
  name: "Pool",
  components: {
    MyRectangleButton,
    FormInput,
    FormRow,
    MyForm,
    MyModal,
    MyRoundButton
  },
  props: {
    poolInfo: {type: Object, required: true}
  },
  data: () => ({
    changeModalData: {
      name: "",
      message: "",
      messageVisibilityStatus: false,
      visibilityStatus: false
    },
    deleteModalVisibilityStatus: false
  }),
  methods: {
    validateChangePoolData() {
      if (!this.changeModalData.name) {
        this.changeModalData.message = "Pool name can't be empty"
        return false
      }

      return true
    },
    changeModalDataUpdated() {
      this.changeModalData.messageVisibilityStatus = false
    },
    async sendChangePoolRequest() {
      await changePool({
        poolId: this.poolInfo.poolId,
        name: this.changeModalData.name
      })
      this.$emit("updated")
      this.changeModalData.visibilityStatus = false
      this.changeModalData.name = ""
    },
    async sendDeletePoolRequest() {
      await deletePool(this.poolInfo.poolId)
      this.$emit("updated")
    }
  }
}
</script>

<style scoped>
.pool {
  padding: 10px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #cccccc;
  border-radius: 5px;

  cursor: pointer;
  transition: background-color .2s ease,
  color .2s ease;
}

.pool:hover {
  color: #ffffff;
  background-color: var(--light-purple-color);
}


.pool__name {
  font-size: 20px;

  color: #cccccc;
}


.pool__buttons {
  display: flex;
}

.pool__button {
  margin: 0 20px 0 0;
  width: 40px;
  height: 40px;
}

.pool__button:last-child {
  margin: 0;
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