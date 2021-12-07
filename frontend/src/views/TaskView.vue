<template>
  <div class="task-view">
    <div class="task-view__content">
      <div class="task-view__header">
        <div class="task-view__salutation">
          Hey, Vladyslav
        </div>
        <div class="task-view__description">
          It is a page with all your tasks
        </div>
      </div>

      <img class="task-view__image"
           src="../../public/tasks.svg"
           alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "Tasks"
}
</script>

<style scoped>
.task-view__content {
  padding: 40px 0 0 60px;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
}


.task-view__salutation {
  margin: 0 0 15px 0;

  font-size: 50px;

  color: var(--dark-purple-color);
}

.task-view__description {
  margin: 0 0 80px 0;

  font-size: 35px;

  color: #444444;
}


.task-view__image {
  margin: 200px 0 0 0;
  flex: 1 1 auto;
  width: 30%;

  opacity: .8;
}
</style>