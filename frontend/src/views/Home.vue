<template>
  <div class="home">
    <MyModal v-if="createFarmModalVisibilityStatus"
             @hide="createFarmModalVisibilityStatus = false">
      <CreateFarmForm/>
    </MyModal>
    <Switcher class="home__switcher"
              left-name="own"
              right-name="other"
              left-value="my own farms"
              right-value="other farms"
              v-model="farmsFilter"/>

    <FarmListPlug class="home__farm-list-plug"
                  v-if="farmListIsEmptyStatus"
                  :farms-filter="farmsFilter"
                  @open-create-farm-modal="createFarmModalVisibilityStatus = true"/>
    <FarmList class="home__farm-list"
              v-else
              :farm-info-array="currentFarmList"
              @open-create-farm-modal="createFarmModalVisibilityStatus = true"/>
  </div>
</template>

<script>
import Switcher from "@/components/UI/Switcher";
import FarmList from "@/components/FarmList/FarmList";
import FarmListPlug from "@/components/FarmList/FarmListPlug";
import {mapState, mapActions} from "vuex";
import MyModal from "@/components/Modal/MyModal";
import CreateFarmForm from "@/components/CreateFarm/CreateFarmForm";

export default {
  name: "Home",
  components: {CreateFarmForm, MyModal, FarmListPlug, FarmList, Switcher},
  data: () => ({
    farmsFilter: "own",
    createFarmModalVisibilityStatus: false
  }),
  computed: {
    ...mapState({
      ownFarms: state => state.farms.ownFarms,
      user: state => state.user.user
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
    ...mapActions({
      updateOwnFarms: "farms/updateOwnFarms"
    })
  },
  mounted() {
    this.updateOwnFarms(this.user.userId)
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