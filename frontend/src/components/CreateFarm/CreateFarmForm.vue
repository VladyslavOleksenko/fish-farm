<template>
  <form action="" class="create-farm-from">
    <div class="create-farm-form__slogan">
      {{ textResource.modalTitle }}
    </div>

    <input
      class="create-farm-form__input"
      type="text"
      :placeholder="textResource.farmName"
      v-model="farmName">
    <textarea
      class="create-farm-form__textarea"
      :placeholder="textResource.farmDescription"
      v-model="farmDescription"></textarea>
    <input
      class="create-farm-form__submit"
      type="submit"
      :value="textResource.createButton"
      :disabled="!farmName"
      @click.prevent="sendRequest">
  </form>
</template>

<script>
import {mapState} from "vuex";
import {createFarm} from "@/assets/js/serverRequest";

export default {
  name: "CreateFarmForm",
  data: () => ({
    farmName: "",
    farmDescription: ""
  }),
  computed: {
    ...mapState({
      userId: state => state.user.user.userId,
      currentLanguage: state => state.language.currentLanguage
    }),
    textResource() {
      if (this.currentLanguage === "en") {
        return {
          modalTitle: "Let`s create your farm!",
          farmName: "Farm name *",
          farmDescription: "Farm description",
          createButton: "create farm",
        }
      }
      if (this.currentLanguage === "ua") {
        return {
          modalTitle: "Давайте створимо ваше господарство!",
          farmName: "Назва *",
          farmDescription: "Короткий опис",
          createButton: "створити господарство",
        }
      }
      if (this.currentLanguage === "ru") {
        return {
          modalTitle: "Давайте создадим ваше хозяйство!",
          farmName: "Название *",
          farmDescription: "Краткое описание",
          createButton: "создать хозяйство",
        }
      }
    }
  },
  methods: {
    async sendRequest() {
      const serverResponse =
        await createFarm(this.userId, this.farmName, this.farmDescription)

      const newFarmId = serverResponse.newFarmId
      await this.$router.push({name: 'Farm', params: {farmId: newFarmId}})
    }
  }
}
</script>

<style scoped>
.create-farm-from {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.create-farm-form__slogan {
  margin: 0 0 40px 0;

  font-size: 25px;

  color: #eeeeee;
}


.create-farm-form__input, .create-farm-form__textarea {
  width: 100%;
  margin: 0 0 15px 0;

  font-size: 22px;

  color: #fff;
  background-color: var(--light-purple-color);
  border-radius: 5px;
  border: none;
  outline: none;
}

.create-farm-form__input::placeholder, .create-farm-form__textarea::placeholder {
  color: var(--light-gray-color);
}

.create-farm-form__input {
  padding: 0 15px;
  height: 53px;
}

.create-farm-form__textarea {
  padding: 8px 15px;
  height: 150px;
}


.create-farm-form__submit {
  margin: 25px 0 0 0;
  height: 50px;
  padding: 0 50px;

  font-size: 22px;
  font-weight: 500;

  color: #eee;
  background-color: var(--blue-color);

  border: none;
  border-radius: 4px;
  outline: none;

  transition: background-color .2s ease;
  cursor: pointer;
}

.create-farm-form__submit:hover {
  background-color: #6fa360;
}

.create-farm-form__submit:active {
  background-color: #5e8b52;
}

.create-farm-form__submit[disabled] {
  color: #7f7f7f;
  background: var(--light-purple-color);
}
</style>