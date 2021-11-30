<template>
  <div class="farm">
    <div class="farm__content">
      <div class="farm__header">
        <div class="farm__name">{{ farmInfo.name }}</div>
        <div class="farm__description">{{ farmInfo.description }}</div>
      </div>

      <div class="farm__info-block">
        <div class="farm__staff-block">
          <Staff class="farm__staff"
                 category="owner"
                 :user-array="[owner]"/>

          <Staff class="farm__staff"
                 category="administrators"
                 :user-array="administratorArray"
                 :invite-array="administratorInviteArray"
                 :farm-id="farmId"
                 @updateUserArray="updateAdministratorArray"
                 @updateInviteArray="updateAdministratorInviteArray"/>

          <Staff class="farm__staff"
                 category="workers"
                 :user-array="workerArray"
                 :invite-array="workerInviteArray"
                 :farm-id="farmId"
                 @updateUserArray="updateWorkerArray"
                 @updateInviteArray="updateWorkerInviteArray"/>
        </div>

        <Pools class="farm__pools" :farm-id="farmId"/>
      </div>

      <MyRectangleButton
        class="farm__delete-button"
        text="Delete farm"
        icon-name="delete"
        @click="deleteModalData.visibilityStatus = true"/>

      <img class="farm__image" src="../../public/fishBowl.svg" alt="">
    </div>

    <DeleteModal v-if="deleteModalData.visibilityStatus"
                 :content="deleteModalData.content"
                 @hide="deleteModalData.visibilityStatus = false"
                 @delete="deleteFarm"/>
  </div>
</template>

<script>
import Staff from "@/components/StaffBlock/Staff";
import {
  getFarm,
  getFarmOwner,
  getFarmAdministrators,
  getFarmAdministratorInvites,
  getFarmWorkers,
  getFarmWorkerInvites,
  deleteFarm
} from "@/assets/js/serverRequest";
import MyModal from "@/components/Modal/MyModal";
import Pools from "@/components/PoolsBlock/Pools";
import MyRectangleButton from "@/components/UI/MyRectangleButton";
import DeleteModal from "@/components/Modal/DeleteModal";

export default {
  name: "Farm.vue",
  components: {DeleteModal, MyRectangleButton, Pools, MyModal, Staff},
  data: () => ({
    farmInfo: {},
    owner: {},
    administratorArray: [],
    administratorInviteArray: [],
    workerArray: [],
    workerInviteArray: [],
    deleteModalData: {
      visibilityStatus: false,
      content: {
        message: "You are about to delete the farm and all associated data"
      }
    }
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
    },
    async updateAdministratorArray() {
      this.administratorArray = await getFarmAdministrators(this.farmId)
    },
    async updateAdministratorInviteArray() {
      this.administratorInviteArray =
        await getFarmAdministratorInvites(this.farmId)
    },
    async updateWorkerArray() {
      this.workerArray = await getFarmWorkers(this.farmId)
    },
    async updateWorkerInviteArray() {
      this.workerInviteArray = await getFarmWorkerInvites(this.farmId)
    }
  },
  async mounted() {
    this.farmInfo = await getFarm(this.farmId)
    this.owner = await getFarmOwner(this.farmId)
    await this.updateAdministratorArray()
    await this.updateAdministratorInviteArray()
    await this.updateWorkerArray()
    await this.updateWorkerInviteArray()
  },
}
</script>

<style scoped>
.farm__content {
  position: relative;
  min-height: 100vh;
  padding: 30px 50px 50px;
}


.farm__image {
  margin: 100px auto 0 auto;

  display: block;
  width: 50%;
  transform: scale(-1, 1);

  opacity: .8;
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


.farm__info-block {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}


.farm__staff-block {
  width: 40%;
}

.farm__staff {
  margin: 0 0 45px 0;
}


.farm__pools {
  width: 40%;
}


.farm__delete-button {
  width: 250px;
  height: 50px;

  background-color: var(--dark-purple-color);
  border-radius: 10px;
}
</style>