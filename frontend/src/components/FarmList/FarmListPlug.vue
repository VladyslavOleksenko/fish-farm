<template>
  <div class="farm-list-plug">
    <div class="farm-list-plug__container">
      <div class="farm-list-plug__question"
           :class="{'farm-list-plug__question-right': farmsFilter === 'other'}">
        {{ question }}
      </div>

      <div class="farm-list-plug__content-row"
           v-if="farmsFilter === 'own'">
        <div class="farm-list-plug__create-button-wrapper">
          <CreateFarmButton
            @open-create-farm-modal="$emit('openCreateFarmModal')"/>
        </div>
        <img class="farm-list-plug__image" src="../../../public/owner.svg"
             alt="">
      </div>

      <div class="farm-list-plug__content-row"
           v-else>
        <img class="farm-list-plug__image" src="../../../public/employee.svg"
             alt="">
        <div class="farm-list-plug__employee-advice">
          {{ textResource.otherInstruction }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateFarmButton from "@/components/CreateFarm/CreateFarmButton";
import {mapState} from "vuex";

export default {
  name: "OwnFarmsPlug",
  components: {CreateFarmButton},
  props: {
    farmsFilter: {type: String, required: true}
  },
  computed: {
    ...mapState({
      currentLanguage: state => state.language.currentLanguage
    }),
    question() {
      if (this.farmsFilter === "own") {
        return this.textResource.ownSlogan
      }
      return this.textResource.otherSlogan
    },
    textResource() {
      if (this.currentLanguage === "en") {
        return {
          ownSlogan: "Fish farm owner?",
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
          ownSlogan: "Власник рибного господарства?",
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
          ownSlogan: "Собственник рыбного хозяйства?",
          otherButton: "другие хозяйства",
          otherSlogan: "Сотрудник хозяйства?",
          otherInstruction: "Вам нужно получить приглашение от собственника или администратора хозяйства",
          modalTitle: "Давайте создадим ваше хозяйство!",
          farmName: "Название",
          farmDescription: "Краткое описание",
        }
      }
    }
  }
}
</script>

<style scoped>
.farm-list-plug__container {
  position: relative;
  padding: 20px;
  width: 100%;

  border-radius: 7px;
  border: 2px dashed var(--dark-purple-color)
}


.farm-list-plug__question {
  font-size: 40px;

  color: var(--dark-purple-color);
}

.farm-list-plug__question-right {
  text-align: right;
}

.farm-list-plug__role {
  font-size: 1.15em;
  font-weight: 500;
}


.farm-list-plug__content-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.farm-list-plug__image {
  width: 40%;

  opacity: .8;
}

.farm-list-plug__create-button-wrapper {
  margin: 0 0 0 30%;
  transform: translateX(-50%);
}


.farm-list-plug__employee-advice {
  width: 50%;

  text-align: center;
  font-size: 25px;

  color: #333;
}
</style>