<template>
  <div class="home">
    <Switcher class="home__switcher"
              :left-option="'my own farms'"
              :right-option="'other farms'"
              @option-selected="switcherOptionSelected"/>
    <FarmListPlug class="home__farm-list-plug"
                  v-if="farmListIsEmptyStatus"
                  :farms-filter="farmsFilter"/>
    <FarmList class="home__farm-list"
              v-else
              :farm-info-array="currentFarmList"/>
  </div>
</template>

<script>
import Switcher from "@/components/Switcher/Switcher";
import FarmList from "@/components/FarmList/FarmList";
import FarmListPlug from "@/components/FarmList/FarmListPlug";
import {mapState} from "vuex";

export default {
  name: "Home",
  components: {FarmListPlug, FarmList, Switcher},
  data: () => ({
    farmsFilter: "own"
  }),
  computed: {
    ...mapState({
      ownFarms: state => state.farms.ownFarms
    }),
    farmListIsEmptyStatus() {
      return (
        this.farmsFilter === 'own' && !this.ownFarms.length ||
        this.farmsFilter === 'other')
    },
    currentFarmList() {
      return this.ownFarms
    }
  },
  methods: {
    switcherOptionSelected(selectedOptionPosition) {
      this.farmsFilter = selectedOptionPosition === "left" ? "own" : "other"
    }
  }
}
</script>

<style scoped>
.home {
  padding: 30px 0 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;
}


.home__switcher {
  margin: 0 0 70px 0;
  width: 35vw;
  height: 60px;
}


.home__farm-list-plug {
  width: 90%;
}


.home__farm-list {
  width: 75%;
}
</style>