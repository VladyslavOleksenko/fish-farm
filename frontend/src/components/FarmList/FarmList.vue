<template>
  <div class="farm-list">
    <div class="farm-list__container">
      <FarmListElement class="farm-list__element"
                       v-for="farmInfo of farmInfoArray"
                       :key="farmInfo.farmId"
                       :farm-info="farmInfo"/>
    </div>
  </div>
</template>

<script>
import FarmListElement from "@/components/FarmList/FarmListElement";

export default {
  name: "FarmList",
  components: {FarmListElement},
  props: {
    farmInfoArray: {type: Array, required: true}
  }
}
</script>

<style scoped>
.farm-list__container {
  width: 100%;
}


.farm-list__element {
  margin: 0 0 30px 0;
}
</style>