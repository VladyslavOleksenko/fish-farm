<template>
  <div class="pools">
    <div class="pools__title">
      {{ textResource.pools }}
    </div>

    <div class="pools__pool-list">
      <Pool class="pools__pool"
            v-for="(poolInfo, i) of poolArray"
            :key="i"
            :pool-info="poolInfo"
            :user-permissions="userPermissions"
            @updated="updatePools"/>
    </div>

    <div class="pools__add-button-wrapper">
      <MyRectangleButton
        v-if="userPermissions.managePools"
        class="pools__add-button"
        icon-name="add"
        :text="textResource.addButton"
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
import {mapState} from "vuex";


export default {
  name: "Pools",
  components: {
    FormInput,
    FormRow, MyForm, MyRectangleButton, MyModal, MyIcon, Pool
  },
  props: {
    farmId: {type: Number, required: true},
    userPermissions: {type: Object, required: true}
  },
  data: () => ({
    poolArray: [],
    addModalData: {
      poolName: ""
    },
    addModalVisibilityStatus: false,
    lastUpdatedTime: performance.now(),
    delayBetweenUpdatingInMs: 5000
  }),
  computed: {
    ...mapState({
      user: state => state.user.user,
      currentLanguage: state => state.language.currentLanguage
    }),
    addModalDataValidStatus() {
      return !!this.addModalData.poolName
    },
    textResource() {
      if (this.currentLanguage === "en") {
        return {
          pools: "Pools",
          addButton: "Add pool",
        }
      }
      if (this.currentLanguage === "ua") {
        return {
          pools: "Басейни",
          addButton: "Додати басейн",
        }
      }
      if (this.currentLanguage === "ru") {
        return {
          pools: "Бассейны",
          addButton: "Добавить бассейн",
        }
      }
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
    },
    async loop() {
      const currentTime = performance.now()
      if (currentTime - this.lastUpdatedTime < this.delayBetweenUpdatingInMs) {
        return requestAnimationFrame(await this.loop)
      }

      await this.updatePools()
      this.lastUpdatedTime = currentTime
      requestAnimationFrame(await this.loop)
    }
  },
  async mounted() {
    await this.updatePools()
    requestAnimationFrame(await this.loop)
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
</style>