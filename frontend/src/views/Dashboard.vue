<template>
  <div class="page">
    <div class="dashboard">
      <div class="dashboard__left">
        <Staff class="dashboard__staff"
               category="workers"
               :user-array="workerArray"
               :user-permissions="userPermissions"/>
        <Pools class="dashboard__pools"
               :farm-id="farmId"
               :user-permissions="userPermissions"/>
      </div>

      <div class="dashboard__right">
        <TaskInfo class="dashboard__info"
                  :task-info="selectedTask"/>

        <div class="dashboard__chart-block">
          <div class="dashboard__chart-wrapper">
            <canvas class="dashboard__canvas" id="task-chart"></canvas>
          </div>
          <div class="dashboard__chart-wrapper">
            <canvas class="dashboard__canvas" id="worker-chart"></canvas>
          </div>
          <div class="dashboard__chart-wrapper">
            <canvas class="dashboard__canvas" id="pool-chart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Staff from "@/components/StaffBlock/Staff";
import Pools from "@/components/PoolsBlock/Pools";
import {
  getFarmWorkers,
  getStatisticByTask,
  getUserPermissions
} from "@/assets/js/serverRequest";
import TaskInfo from "@/components/TaskBlock/TaskInfo";
import {mapState} from "vuex";
import {changeChartDate, startup} from "@/assets/js/dashboardCharts";

export default {
  name: "Dashboard",
  components: {TaskInfo, Pools, Staff},
  data: () => ({
    workerArray: [],
    userPermissions: {
      deleteFarm: false,
      managePools: false,
      seeInvites: false,
      addEmployees: false,
      deleteEmployees: false,
      changeAdministrator: false,
      changeWorker: false,
      dashboard: false
    }
  }),
  computed: {
    ...mapState({
      userId: state => state.user.user.userId,
      selectedTask: state => state.farms.selectedTask,
      needToUpdateTasks: state => state.farms.needToUpdateTasks
    }),
    farmId() {
      return parseInt(this.$route.params.farmId.toString())
    }
  },
  watch: {
    async selectedTask() {
      if (!this.selectedTask) {
        return true
      }

      const selectedTaskId = this.selectedTask.task.taskId
      const chartTaskData = await getStatisticByTask(selectedTaskId)
      changeChartDate("task", chartTaskData)
    }
  },
  methods: {
    async updateChartData() {

    }
  },
  async mounted() {
    this.userPermissions = await getUserPermissions(this.farmId, this.userId)

    this.workerArray = await getFarmWorkers(this.farmId)

    startup()
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
  overflow: hidden;
}


.dashboard__chart-block {
  width: 100%;
  flex: 1 1 50%;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard__chart-wrapper {
  width: 30%;
  padding: 10px 0;

  background-color: #eeeeee;
  box-shadow: 0 3px 6px 3px rgba(238, 238, 238, 0.4);
  border-radius: 7px;
}
</style>