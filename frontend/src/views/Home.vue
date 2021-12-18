<template>
  <div class="home">
    <MyModal v-if="createFarmModalVisibilityStatus"
             @hide="createFarmModalVisibilityStatus = false">
      <CreateFarmForm/>
    </MyModal>
    <Switcher class="home__switcher"
              left-name="own"
              right-name="other"
              :left-value="textResource.ownButton"
              :right-value="textResource.otherButton"
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
import MyModal from "@/components/Modal/MyModal";
import CreateFarmForm from "@/components/CreateFarm/CreateFarmForm";
import {getOtherFarms, getOwnFarms} from "@/assets/js/serverRequest";
import {mapState} from "vuex";

export default {
  name: "Home",
  components: {CreateFarmForm, MyModal, FarmListPlug, FarmList, Switcher},
  data: () => ({
    farmsFilter: "own",
    createFarmModalVisibilityStatus: false,
    ownFarmArray: [],
    otherFarmArray: []
  }),
  computed: {
    ...mapState({
      user: state => state.user.user,
      currentLanguage: state => state.language.currentLanguage
    }),
    farmListIsEmptyStatus() {
      return (
        this.farmsFilter === 'own' && !this.ownFarmArray.length ||
        this.farmsFilter === 'other' && !this.otherFarmArray.length)
    },
    currentFarmList() {
      if (this.farmsFilter === "own") {
        return [].concat(this.ownFarmArray)
      }
      return [].concat(this.otherFarmArray)
    },
    textResource() {
      if (this.currentLanguage === "en") {
        return {
          ownButton: "my own farms",
          otherButton: "other farms",
        }
      }
      if (this.currentLanguage === "ua") {
        return {
          ownButton: "власні господарства",
          otherButton: "інші господарства",
        }
      }
      if (this.currentLanguage === "ru") {
        return {
          ownButton: "собственные хозяйства",
          otherButton: "другие хозяйства",
        }
      }
    }
  },
  methods: {
    async updateOwnFarmArray() {
      try {
        this.ownFarmArray = await getOwnFarms(this.user.userId)
      } catch (exception) {
        return console.log(exception)
      }
    },
    async updateOtherFarmArray() {
      try {
        this.otherFarmArray = await getOtherFarms(this.user.userId)
      } catch (exception) {
        return console.log(exception)
      }
    }
  },
  async mounted() {
    await this.updateOwnFarmArray()
    await this.updateOtherFarmArray()
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