<template>
  <div class="pools">
    <div class="pools__title">Pools</div>

    <div class="pools__pool-list">
      <Pool class="pools__pool"
            v-for="(poolInfo, i) of poolArray"
            :key="i"
            :pool-info="poolInfo"
            @updated="updatePools"/>
    </div>

    <div class="pools__add-button-wrapper">
      <MyRectangleButton class="pools__add-button"
                         icon-name="add"
                         text="Add pool"
                         @clicked="addModalVisibilityStatus = true"/>
    </div>

    <MyModal v-if="addModalVisibilityStatus"
             @hide="addModalVisibilityStatus = false">
      <div class="add-modal">
        <MyForm
          title-text="Add new pool to your farm"
          submit-text="submit"
          :submit-disabled="!addModalDataValidStatus"
          @submitted="sendCreatePoolRequest">
          <FormRow>
            <FormInput
              type="text"
              placeholder="Name"
              :required="true"
              v-model="addModalData.poolName"/>
          </FormRow>
        </MyForm>
      </div>
    </MyModal>
  </div>
</template>

<script>
import MyIcon from "@/components/UI/MyIcon";
import MyModal from "@/components/Modal/MyModal";
import Pool from "@/components/PoolsBlock/Pool";
import {createPool, getPoolArray} from "@/assets/js/serverRequest";
import MyRectangleButton from "@/components/UI/MyRectangleButton";
import MyForm from "@/components/Form/MyForm";
import FormRow from "@/components/Form/FormRow";
import FormInput from "@/components/Form/FormInput";

export default {
  name: "Pools",
  components: {
    FormInput,
    FormRow, MyForm, MyRectangleButton, MyModal, MyIcon, Pool},
  props: {
    farmId: {type: Number, required: true}
  },
  data: () => ({
    poolArray: [],
    addModalData: {
      poolName: ""
    },
    addModalVisibilityStatus: false
  }),
  computed: {
    addModalDataValidStatus() {
      return !!this.addModalData.poolName
    }
  },
  methods: {
    async updatePools() {
      this.poolArray = await getPoolArray(this.farmId)
    },
    async sendCreatePoolRequest() {
      await createPool(this.farmId, this.addModalData.poolName)
      await this.updatePools()
      this.addModalVisibilityStatus = false
      this.addModalData.poolName = ""
    }
  },
  async mounted() {
    await this.updatePools()
  }
}
</script>

<style scoped>
.pools {
  max-height: 100%;
  padding: 20px;

  display: flex;
  flex-direction: column;

  background-color: var(--dark-purple-color);
  box-shadow: 0 5px 10px 4px rgba(44, 46, 67, 0.7);
  border-radius: 6px;
}

.pools__title {
  margin: 0 0 30px 0;
  font-size: 25px;
  text-align: center;

  color: #eeeeee;
}


.pools__pool-list {
  overflow: auto;
}

.pools__pool {
}


.pools__add-button-wrapper {
  margin: 50px 0 0 0;

  display: flex;
  justify-content: center;
}

.pools__add-button {
  height: 50px;
}


.add-modal {
  padding: 0 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
}


.add-modal__title {
  margin: 0 0 30px 0;

  font-size: 22px;
  text-align: center;

  color: #eeeeee;
}


.add-modal__input {
  width: 100%;
  height: 53px;
  margin: 0 0 15px 0;
  padding: 0 15px;

  font-size: 22px;

  color: #fff;
  background-color: var(--light-purple-color);
  border: none;
  border-radius: 4px;
  outline: none;
}

.add-modal__input::placeholder {
  color: var(--light-gray-color);
}


.add-modal__submit {
  margin: 40px 0 0 0;
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

.add-modal__submit:hover {
  background-color: #6fa360;
}

.add-modal__submit:active {
  background-color: #5e8b52;
}

.add-modal__submit[disabled] {
  color: #7f7f7f;
  background: var(--light-purple-color);
}
</style>