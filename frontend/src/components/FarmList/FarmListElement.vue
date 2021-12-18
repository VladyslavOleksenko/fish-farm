<template>
  <div class="farm-list-element">
    <div class="farm-list-element__general-info">
      <div class="farm-list-element__name">{{ farmInfo.name }}</div>
      <div class="farm-list-element__description">{{ farmInfo.description }}</div>
    </div>
    <div class="farm-list-element__button-wrapper">
      <button class="farm-list-element__button"
              @click="$router.push({name: 'Farm', params: {farmId: this.farmInfo.farmId}})">
        {{ textResource.seeMore }}
      </button>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "FarmListElement",
  props: {
    farmInfo: {type: Object, required: true}
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      currentLanguage: state => state.language.currentLanguage
    }),
    owner() {
      if (this.farmInfo.ownerId === this.user.userId) {
        return "You"
      } else {
        return "smb else"
      }
    },
    textResource() {
      if (this.currentLanguage === "en") {
        return {
          seeMore: "See more",
        }
      }
      if (this.currentLanguage === "ua") {
        return {
          seeMore: "Дізнатись більше",
        }
      }
      if (this.currentLanguage === "ru") {
        return {
          seeMore: "Узнать больше",
        }
      }
    }
  }
}
</script>

<style scoped>
.farm-list-element {
  padding: 15px 20px;
  width: 100%;

  display: flex;
  align-items: center;

  background-color: var(--blue-color);
  box-shadow: 0 5px 10px 3px var(--light-purple-color);
  border-radius: 7px;
}


.farm-list-element__general-info {
  padding: 0 15px 0 0;
  width: 70%;
}

.farm-list-element__name {
  margin: 0 0 5px 0;
  font-size: 30px;
  color: #eeeeee;
}

.farm-list-element__description {
  margin: 0 0 15px 0;

  font-size: 19px;
  color: #cccccc;
}


.farm-list-element__button {
  height: 60px;
  padding: 0 40px;

  font-size: 25px;

  color: #cccccc;
  background-color: var(--dark-purple-color);
  border: 2px solid var(--dark-purple-color);
  border-radius: 5px;
  outline: none;

  cursor: pointer;
  transition: background-color .2s ease,
  color .2s ease;
}

.farm-list-element__button:hover {
  color: #ffffff;
  background-color: var(--light-purple-color);
}

.farm-list-element__button:active {
  color: #cccccc;
}
</style>