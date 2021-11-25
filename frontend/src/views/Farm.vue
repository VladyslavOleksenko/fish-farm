<template>
  <div class="farm">
    <img class="farm__image" src="../../public/fishBowl.svg" alt="">
    <button class="farm__delete-farm-button delete-farm-button"
            @click="deleteModalVisibilityStatus = true">
      Delete farm
    </button>

    <div class="farm__header">
      <div class="farm__name">{{ farmInfo.name }}</div>
      <div class="farm__description">{{ farmInfo.description }}</div>
    </div>

    <Staff class="farm__staff"
           category="owner"
           :user-array="[owner]"/>

    <Staff class="farm__staff"
           category="administrators"
           :user-array="administratorArray"/>

    <Staff class="farm__staff"
           category="workers"
           :user-array="workerArray"/>

    <MyModal v-if="deleteModalVisibilityStatus"
             @hide="deleteModalVisibilityStatus = false">
      <div class="farm__delete-modal delete-modal">
        <div class="delete-modal__title">
          You are going to delete the farm and all connected data
        </div>
        <div class="delete-modal__warning">
          This action couldn't be undone
        </div>
        <div class="delete-modal__warning">
          Are you sure?
        </div>
        <button class="delete-modal__button delete-farm-button"
                @click="deleteFarm">
          Delete farm
        </button>
      </div>
    </MyModal>
  </div>
</template>

<script>
import Staff from "@/components/StaffBlock/Staff";
import {
  getFarm,
  getFarmOwner,
  getFarmAdministrators,
  getFarmWorkers,
  deleteFarm
} from "@/assets/js/serverRequest";
import MyModal from "@/components/UI/MyModal";

export default {
  name: "Farm.vue",
  components: {MyModal, Staff},
  data: () => ({
    farmInfo: {},
    owner: {},
    workerArray: [],
    administratorArray: [],
    deleteModalVisibilityStatus: false
  }),
  computed: {
    farmId() {
      return this.$route.params.farmId
    }
  },
  methods: {
    async deleteFarm() {
      await deleteFarm(this.farmId)
      await this.$router.push("/")
    }
  },
  async mounted() {
    this.farmInfo = await getFarm(this.farmId)
    this.owner = await getFarmOwner(this.farmId)
    this.workerArray = await getFarmWorkers(this.farmId)
    this.administratorArray = await getFarmAdministrators(this.farmId)
  },
}
</script>

<style scoped>
.farm {
  position: relative;
  min-height: 100vh;
  padding: 30px 50px 50px;
}


.farm__image {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40%;
  transform: scale(-1, 1);
}


.farm__delete-farm-button {
  position: absolute;
  top: 30px;
  right: 50px;
}

.delete-farm-button {
  height: 50px;
  padding: 0 50px;

  font-size: 20px;

  color: #ffb1b1;
  background-color: #717490;
  border-radius: 4px;
  border: none;
  outline: none;

  cursor: pointer;
  transition: background-color .2s ease,
  color .2s ease;
}

.delete-farm-button:hover {
  background-color: var(--light-purple-color);
}


.farm__header {
  margin: 0 0 60px 0;
}

.farm__name {
  margin: 0 0 10px 0;
  font-size: 40px;
  font-weight: 500;

  color: var(--dark-purple-color);
}

.farm__description {
  font-size: 25px;

  color: #444444;
}


.farm__staff {
  margin: 0 0 45px 0;
  width: 40%;
}


.delete-modal {
  padding: 20px 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.delete-modal__title {
  margin: 0 0 30px 0;

  font-size: 25px;
  text-align: center;

  color: #eeeeee;
}

.delete-modal__warning {
  margin: 0 0 15px 0;

  font-size: 20px;

  color: #ff6161;
}

.delete-modal__button {
  margin: 60px 0 0 0;
}
</style>