<template>
  <div class="farm-list-element">
    <div class="farm-list-element__general-info">
      <div class="farm-list-element__name">{{farmInfo.name}}</div>
      <div class="farm-list-element__description">{{farmInfo.description}}</div>
    </div>
    <div class="farm-list-element__additional-info">
      <div class="farm-list-element__info-row">
        <div class="farm-list-element__info-parameter">owner:</div>
        <div class="farm-list-element__info-value">{{owner}}</div>
      </div>
      <div class="farm-list-element__info-row">
        <div class="farm-list-element__info-parameter">administrators:</div>
        <div class="farm-list-element__info-value">0</div>
      </div>
      <div class="farm-list-element__info-row">
        <div class="farm-list-element__info-parameter">workers:</div>
        <div class="farm-list-element__info-value">5</div>
      </div>
    </div>
    <div class="farm-list-element__button-wrapper">
      <button class="farm-list-element__button">
        See more
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
      user: state => state.user.user
    }),
    owner() {
      if (this.farmInfo.ownerId === this.user.userId) {
        return "You"
      } else {
        return "smb else"
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
  width: 40%;
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


.farm-list-element__additional-info {
  flex: 1 1 auto;
}

.farm-list-element__info-row {
  margin: 0 0 7px 0;

  display: flex;

  font-size: 20px;

  color: var(--light-gray-color);
}

.farm-list-element__info-parameter {
  min-width: 160px;
}

.farm-list-element__info-value {
  font-weight: 500;
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