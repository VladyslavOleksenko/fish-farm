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
        <div class="dashboard__info">
          General info: <br>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
          consectetur cum dolor error facere fugiat libero mollitia officia
          recusandae repellat. Amet animi assumenda commodi culpa delectus dicta
          enim expedita explicabo facilis, fugit id in, ipsa ipsum libero magnam
          minima modi molestiae nihil non numquam, odio odit officia officiis
          quasi quia quibusdam reiciendis repudiandae tempora vel vero.
          Assumenda deserunt earum nostrum pariatur quam sapiente sequi sit!
          Cumque cupiditate iste, itaque iusto molestiae natus sint tempore. Aut
          culpa debitis dolor ex fugit laborum, maxime nesciunt porro.
          Accusamus, asperiores assumenda in minima nulla numquam officia,
          pariatur praesentium provident quia quos velit? Placeat, repellendus.
        </div>

        <div class="dashboard__chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Staff from "@/components/StaffBlock/Staff";
import Pools from "@/components/PoolsBlock/Pools";
import {getFarmWorkers} from "@/assets/js/serverRequest";

export default {
  name: "Dashboard",
  components: {Pools, Staff},
  data: () => ({
    workerArray: [],
  }),
  computed: {
    farmId() {
      return parseInt(this.$route.params.farmId.toString())
    }
  },
  methods: {},
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