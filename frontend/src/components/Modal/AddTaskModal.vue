<template>
  <div class="add-task-modal">
    <MyModal
      v-if="visibilityStatus"
      @hide="$emit('update:visibilityStatus', false)"
    >
      <MyForm
        title-text="New task"
        submit-text="Add task"
        :message="message"
        v-model:message-visibility-status="messageVisibilityStatus"
        :submit-disabled="!validateContent()"
        @submitted="sendAddTaskRequest">
        <FormRow>
          <FormInput
            type="text"
            placeholder="Task"
            v-model="selfContent.title"
            @updated="contentUpdated"/>
        </FormRow>
        <FormRow>
          <FormInput
            type="text"
            placeholder="Description"
            v-model="selfContent.description"
            @updated="contentUpdated"/>
        </FormRow>
        <FormRow>
          <FormInput
            type="date"
            v-model="selfContent.deadlineDate"
            @updated="contentUpdated"/>
        </FormRow>
        <FormRow>
          <FormInput
            type="time"
            v-model="selfContent.deadlineTime"
            @updated="contentUpdated"/>
        </FormRow>
        <FormRow>
          <FormInput
            type="checkbox"
            placeholder="Recurring"
            v-model="selfContent.isRecurring"
            @updated="contentUpdated"/>
        </FormRow>
        <FormRow>
          <FormInput
            type="text"
            placeholder="Recurring period"
            v-model="selfContent.recurringPeriod"
            @updated="contentUpdated"/>
        </FormRow>
        <FormRow>
          <FormInput
            type="checkbox"
            placeholder="Result required"
            v-model="selfContent.resultRequiredStatus"
            @updated="contentUpdated"/>
        </FormRow>
      </MyForm>
    </MyModal>
  </div>
</template>

<script>
import MyModal from "@/components/Modal/MyModal";
import MyForm from "@/components/Form/MyForm";
import FormInput from "@/components/Form/FormInput";
import FormRow from "@/components/Form/FormRow";
import {createTask, getTaskArrayByFarmWorker} from "@/assets/js/serverRequest"

export default {
  name: "AddTaskModal",
  components: {FormRow, FormInput, MyForm, MyModal},
  props: {
    visibilityStatus: Boolean,
    farmWorkerId: {type: Number, required: true}
  },
  data: () => ({
    message: "",
    messageVisibilityStatus: false,
    selfContent: {
      farmWorkerId: null,
      title: "",
      description: "",
      deadlineDate: "",
      deadlineTime: "",
      isRecurring: false,
      recurringPeriod: "",
      resultRequiredStatus: false
    }
  }),
  methods: {
    validateContent() {
      if (!this.selfContent.title) {
        this.message = "Task title can't be empty"
        return false
      }

      return true
    },
    contentUpdated() {
      this.messageVisibilityStatus = false
    },
    async sendAddTaskRequest() {
      const newTaskData = {
        farmWorkerId: this.selfContent.farmWorkerId,
        title: this.selfContent.title,
        description: this.selfContent.description,
        deadlineDate: this.selfContent.deadlineDate,
        deadlineTime: this.selfContent.deadlineTime,
        isRecurring: this.selfContent.isRecurring,
        recurringPeriod: this.selfContent.recurringPeriod,
        resultRequiredStatus: this.selfContent.resultRequiredStatus
      }

      try {
        await createTask(newTaskData)
      } catch (exception) {
        console.log(exception)
      }

      this.$emit("update:visibilityStatus", false)
      this.$emit("added")

      this.selfContent.title = ""
      this.selfContent.description = ""
      this.selfContent.deadlineDate = ""
      this.selfContent.deadlineTime = ""
      this.selfContent.isRecurring = false
      this.selfContent.recurringPeriod = ""
      this.selfContent.resultRequiredStatus = false
    },
  },
  async mounted() {
    this.selfContent.farmWorkerId = this.farmWorkerId
  }
}
</script>