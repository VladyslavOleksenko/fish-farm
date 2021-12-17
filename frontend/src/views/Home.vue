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
              :farm-info-array="this.currentFarmList"
              @open-create-farm-modal="createFarmModalVisibilityStatus = true"/>
  </div>
</template>

<script>
import Switcher from "@/components/UI/Switcher";
import FarmList from "@/components/FarmList/FarmList";
import FarmListPlug from "@/components/FarmList/FarmListPlug";
import {mapState} from "vuex";
import MyModal from "@/components/Modal/MyModal";
import CreateFarmForm from "@/components/CreateFarm/CreateFarmForm";
import {getOtherFarms, getOwnFarms} from "@/assets/js/serverRequest";

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
          ownSlogan: "Fish farm owner?",
          createButton: "create farm",
          otherButton: "other farms",
          otherSlogan: "Fish farm employee?",
          otherInstruction: "You need to get an invitation from farm owner or manager first",
          modalTitle: "Let`s create your farm!",
          farmName: "Farm name",
          farmDescription: "Farm description",
        }
      }
      if (this.currentLanguage === "ua") {
        return {
          ownButton: "власні господарства",
          ownSlogan: "Власник рибного господарства?",
          createButton: "створити господарство",
          otherButton: "інші господарства",
          otherSlogan: "Працівник господарства?",
          otherInstruction: "Вам необхідно отримати запрошення від власника чи адміністратора господарства",
          modalTitle: "Давайте створимо ваше господарство!",
          farmName: "Назва",
          farmDescription: "Короткий опис",
        }
      }
      if (this.currentLanguage === "ru") {
        return {
          ownButton: "собственные хозяйства",
          ownSlogan: "Собственник рыбного хозяйства?",
          createButton: "создать хозяйство",
          otherButton: "другие хозяйства",
          otherSlogan: "Работник хозяйства?",
          otherInstruction: "Вам нужно получить приглашение от собственника или администратора хозяйства",
          modalTitle: "Давайте создадим ваше хозяйство!",
          farmName: "Название",
          farmDescription: "Краткое описание",
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