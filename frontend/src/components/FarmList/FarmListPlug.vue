<template>
  <div class="farm-list-plug">
    <div class="farm-list-plug__container">
      <div class="farm-list-plug__question"
           :class="{'farm-list-plug__question-right': farmsFilter === 'other'}">
        <span>Fish farm </span>
        <span class="farm-list-plug__role">{{ role }}</span>
        <span>?</span>
      </div>

      <div class="farm-list-plug__content-row"
           v-if="farmsFilter === 'own'">
        <button class="farm-list-plug__create-button">
          Create farm
        </button>
        <img class="farm-list-plug__image" src="../../../public/owner.svg" alt="">
      </div>

      <div class="farm-list-plug__content-row"
           v-else>
        <img class="farm-list-plug__image" src="../../../public/employee.svg" alt="">
        <div class="farm-list-plug__employee-advice">
          <span>You need to get an invitation from </span>
          <span class="farm-list-plug__role">farm owner </span>
          <span>or </span>
          <span class="farm-list-plug__role">manager </span>
          <span>first</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OwnFarmsPlug",
  props: {
    farmsFilter: {type: String, required: true}
  },
  computed: {
    role() {
      return this.farmsFilter === "own" ? "owner" : "employee"
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

.farm-list-plug__create-button {
  margin: 0 0 0 30%;
  transform: translateX(-50%);
  padding: 0 40px;
  height: 70px;

  font-size: 30px;
  font-weight: 500;

  color: #ccc;
  background-color: var(--dark-purple-color);

  border: none;
  border-radius: 5px;
  outline: none;

  transition: background-color .2s ease,
  color .2s ease;
  cursor: pointer;
}

.farm-list-plug__create-button:hover {
  background-color: var(--light-purple-color);
  color: #ffffff;
}

.farm-list-plug__create-button:active {
  color: #cccccc;
}


.farm-list-plug__employee-advice {
  width: 50%;

  text-align: center;
  font-size: 25px;
}
</style>