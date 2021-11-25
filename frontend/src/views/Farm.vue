<template>
  <div class="farm">
    <img class="farm__image" src="../../public/fishBowl.svg" alt="">

    <div class="farm__header">
      <div class="farm__name">{{ farmInfo.name }}</div>
      <div class="farm__description">{{ farmInfo.description }}</div>
    </div>

    <Staff class="farm__staff"
           category="owner"
           :user-array="[owner]"/>

    <Staff class="farm__staff"
           category="administrators"
           :user-array="administratorArray"/>

    <Staff class="farm__staff"
           category="workers"
           :user-array="workerArray"/>
  </div>
</template>

<script>
import Staff from "@/components/StaffBlock/Staff";
import {getFarm, getFarmOwner, getFarmAdministrators, getFarmWorkers} from "@/assets/js/serverRequest";

export default {
  name: "Farm.vue",
  components: {Staff},
  data: () => ({
    farmInfo: {},
    owner: {},
    workerArray: [],
    administratorArray: []
  }),
  computed: {
    farmId() {
      return this.$route.params.farmId
    }
  },
  async mounted() {
    this.farmInfo = await getFarm(this.farmId)
    this.owner = await getFarmOwner(this.farmId)
    this.workerArray = await getFarmWorkers(this.farmId)
    this.administratorArray = await getFarmAdministrators(this.farmId)
  },
}
</script>

<style scoped>
.farm {
  position: relative;
  min-height: 100vh;
  padding: 30px 50px 50px;
}


.farm__image {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40%;
  transform: scale(-1, 1);
}


.farm__header {
  margin: 0 0 60px 0;
}

.farm__name {
  margin: 0 0 10px 0;
  font-size: 40px;
  font-weight: 500;

  color: var(--dark-purple-color);
}

.farm__description {
  font-size: 25px;

  color: #444444;
}


.farm__staff {
  margin: 0 0 45px 0;
  width: 40%;
}
</style>