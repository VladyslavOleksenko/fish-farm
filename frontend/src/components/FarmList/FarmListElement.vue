<template>
  <div class="farm-list-element">
    <div class="farm-list-element__general-info">
      <div class="farm-list-element__name">Farm list element</div>
      <div class="farm-list-element__description">Farm list element</div>
    </div>
    <div class="farm-list-element__additional-info">
      <div class="farm-list-element__info-row">
        <div class="farm-list-element__info-parameter">owner:</div>
        <div class="farm-list-element__info-value">You</div>
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
export default {
  name: "FarmListElement",
  props: {
    farmInfo: {type: Object, required: true}
  }
}
</script>

<style scoped>
.farm-list-element {
  padding: 15px 20px;
  width: 100%;

  display: flex;

  background-color: var(--blue-color);
  box-shadow: 0 5px 10px 3px var(--light-purple-color);
  border-radius: 7px;
}


.farm-list-element__general-info {
  width: 40%;
}

.farm-list-element__name {
  margin: 0 0 5px 0;
  font-size: 30px;
  color: #eeeeee;
}

.farm-list-element__description {
  margin: 0 0 15px 0;

  font-size: 20px;
  color: #cccccc;
}


.farm-list-element__additional-info {
  width: 25%;
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


.farm-list-element__button-wrapper {
  flex: 1 1 auto;

  display: flex;
  justify-content: center;
  align-items: center;
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