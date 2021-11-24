<template>
  <div class="farm-list">
    <div class="farm-list__container">
      <div class="farm-list__create-button-wrapper">
        <CreateFarmButton @open-create-farm-modal="$emit('openCreateFarmModal')"/>
      </div>
      <div>
        <FarmListElement class="farm-list__element"
                         v-for="farmInfo of farmInfoArray"
                         :key="farmInfo.farmId"
                         :farm-info="farmInfo"/>
      </div>
    </div>
  </div>
</template>

<script>
import FarmListElement from "@/components/FarmList/FarmListElement";
import CreateFarmButton from "@/components/CreateFarm/CreateFarmButton";

export default {
  name: "FarmList",
  components: {CreateFarmButton, FarmListElement},
  props: {
    farmInfoArray: {type: Array, required: true}
  }
}
</script>

<style scoped>
.farm-list__container {
  width: 100%;
}


.farm-list__create-button-wrapper {
  margin: 0 0 30px 0;

  display: flex;
  justify-content: center;
}


.farm-list__element {
  margin: 0 0 30px 0;
}
</style>