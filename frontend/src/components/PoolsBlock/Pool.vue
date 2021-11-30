<template>
  <div class="pool">
    <div class="pool__name">{{ poolInfo.name }}</div>
    <div class="pool__buttons">
      <MyRoundButton class="pool__button"
                     icon-name="delete"
                     @click="sendDeletePoolRequest"/>
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
  </div>
</template>

<script>
import MyRoundButton from "@/components/UI/MyRoundButton";
import {deletePool, changePool} from "@/assets/js/serverRequest";
import MyModal from "@/components/UI/MyModal";
import MyForm from "@/components/Form/MyForm";
import FormRow from "@/components/Form/FormRow";
import FormInput from "@/components/Form/FormInput";

export default {
  name: "Pool",
  components: {FormInput, FormRow, MyForm, MyModal, MyRoundButton},
  props: {
    poolInfo: {type: Object, required: true}
  },
  data: () => ({
    changeModalData: {
      name: "",
      message: "",
      messageVisibilityStatus: false,
      visibilityStatus: false
    }
  }),
  methods: {
    async sendDeletePoolRequest() {
      await deletePool(this.poolInfo.poolId)
      this.$emit("updated")
    },
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
</style>