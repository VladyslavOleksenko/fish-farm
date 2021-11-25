<template>
  <div class="pools">
    <div class="pools__title">Pools</div>

    <div class="pools__add-button-wrapper">
      <div class="add-button"
           @click="addModalVisibilityStatus = true">
        <MyIcon class="add-button__icon" icon-name="add" path-color="#eee"/>
        <p class="add-button__text">Add pool</p>
      </div>
    </div>

    <MyModal v-if="addModalVisibilityStatus"
             @hide="addModalVisibilityStatus = false">
      <div class="add-modal">
        <div class="add-modal__title">Add new pool to your farm</div>
        <input class="add-modal__input"
               type="text"
               placeholder="Name *"
               v-model="addModalData.poolName">
        <input class="add-modal__submit"
               type="submit"
               :disabled="!addModalDataValidStatus"
               @click="sendCreatePoolRequest">
      </div>
    </MyModal>
  </div>
</template>

<script>
import MyIcon from "@/components/UI/MyIcon";
import MyModal from "@/components/UI/MyModal";
import {createPool} from "@/assets/js/serverRequest";

export default {
  name: "Pools",
  components: {MyModal, MyIcon},
  props: {
    farmId: {type: String, required: true}
  },
  data: () => ({
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
    async sendCreatePoolRequest() {
      const serverResponse =
        await createPool(this.farmId, this.addModalData.poolName)
      const newPoolId = serverResponse.newPoolId
      console.log(newPoolId)
    }
  }
}
</script>

<style scoped>
.pools {
  padding: 20px;

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


.pools__add-button-wrapper {
  margin: 50px 0 0 0;

  display: flex;
  justify-content: center;
}

.add-button {
  width: 200px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #eeeeee;
  border: 2px solid #eeeeee;
  border-radius: 4px;

  cursor: pointer;
  transition: background-color .2s ease,
  color .2s ease;
}

.add-button__icon {
  margin: 0 15px 0 0;
  width: 20px;
  height: 20px;
}

.add-button__text {
  font-size: 22px;
}

.add-button:hover {
  color: #ffffff;
  background-color: var(--light-purple-color);
}

.add-button:active {
  color: var(--light-gray-color);
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