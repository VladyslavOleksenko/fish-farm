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
            v-model="content.title"
            @updated="contentUpdated"/>
        </FormRow>
        <FormRow>
          <FormInput
            type="text"
            placeholder="Description"
            v-model="content.description"
            @updated="contentUpdated"/>
        </FormRow>
        <FormRow>
          <FormInput
            type="date"
            v-model="content.deadlineDate"
            @updated="contentUpdated"/>
        </FormRow>
        <FormRow>
          <FormInput
            type="time"
            v-model="content.deadlineTime"
            @updated="contentUpdated"/>
        </FormRow>
        <FormRow>
          <FormInput
            type="checkbox"
            placeholder="Recurring"
            v-model="content.isRecurring"
            @updated="contentUpdated"/>
        </FormRow>
        <FormRow>
          <FormInput
            type="text"
            placeholder="Recurring period"
            v-model="content.recurringPeriod"
            @updated="contentUpdated"/>
        </FormRow>
        <FormRow>
          <FormInput
            type="checkbox"
            placeholder="Result required"
            v-model="content.resultRequiredStatus"
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
import {createTask} from "@/assets/js/serverRequest"

export default {
  name: "AddTaskModal",
  components: {FormRow, FormInput, MyForm, MyModal},
  props: {
    visibilityStatus: Boolean,
    content: Object
  },
  data: () => ({
    message: "",
    messageVisibilityStatus: false
  }),
  methods: {
    validateContent() {
      if (!this.content.title) {
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
        farmWorkerId: this.content.farmWorkerId,
        title: this.content.title,
        description: this.content.description,
        deadlineDate: this.content.deadlineDate,
        deadlineTime: this.content.deadlineTime,
        isRecurring: this.content.isRecurring,
        recurringPeriod: this.content.recurringPeriod,
        resultRequiredStatus: this.content.resultRequiredStatus
      }

      const serverResponse = await createTask(newTaskData)
      console.log(serverResponse)
    }
  }
}
</script>

<style scoped>

</style>