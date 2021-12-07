<template>
  <div class="page">
    <div class="dashboard">
      <div class="dashboard__left">
        <Staff class="dashboard__staff"
               category="workers"
               :user-array="workerArray"/>
        <Pools class="dashboard__pools"
               :farm-id="farmId"/>
      </div>

      <div class="dashboard__right">
        <TaskInfo class="dashboard__info"
                  :task-info="selectedTask"/>

        <div class="dashboard__chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Staff from "@/components/StaffBlock/Staff";
import Pools from "@/components/PoolsBlock/Pools";
import {getFarmWorkers} from "@/assets/js/serverRequest";
import TaskInfo from "@/components/TaskBlock/TaskInfo";
import {mapState} from "vuex";

export default {
  name: "Dashboard",
  components: {TaskInfo, Pools, Staff},
  data: () => ({
    workerArray: [],
  }),
  computed: {
    ...mapState({
      selectedTask: state => state.farms.selectedTask
    }),
    farmId() {
      return parseInt(this.$route.params.farmId.toString())
    }
  },
  async mounted() {
    this.workerArray = await getFarmWorkers(this.farmId)
  }
}
</script>

<style scoped>
.dashboard {
  padding: 30px;
  height: 100vh;

  display: flex;
}


.dashboard__left {
  margin: 0 3% 0 0;
  flex: 1 1 30%;

  display: flex;
  flex-direction: column;
}

.dashboard__staff {
  margin: 0 0 5% 0;

  height: 53%;
}

.dashboard__pools {
  height: 45%;
}


.dashboard__right {
  flex: 1 1 70%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.dashboard__info {
  flex: 1 1 50%;
}

.dashboard__chart {
  width: 100%;
  flex: 1 1 50%;

  background-color: var(--blue-color);
}

</style>