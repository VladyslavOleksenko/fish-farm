<template>
  <div class="home">
    <Switcher class="home__switcher"
              :left-option="'my own farms'"
              :right-option="'other farms'"
              @option-selected="switcherOptionSelected"/>
    <FarmListPlug class="home__own-farms-plug"
                  :farms-filter="farmsFilter"/>
    <FarmList/>
  </div>
</template>

<script>
import Switcher from "@/components/Switcher/Switcher";
import FarmList from "@/components/FarmList/FarmList";
import FarmListPlug from "@/components/FarmList/FarmListPlug";

export default {
  name: "Home",
  components: {FarmListPlug, FarmList, Switcher},
  data: () => ({
    farmsFilter: "own"
  }),
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
  margin: 0 0 30px 0;
  width: 35vw;
  height: 60px;
}


.home__own-farms-plug {
  width: 90%;
}
</style>