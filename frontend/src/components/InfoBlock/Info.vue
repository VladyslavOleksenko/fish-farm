<template>
  <div class="info">
    <MyModal @hide="$emit('hide')">
      <div class="info__content">
        <div class="info__title">{{ data.title }}</div>
        <div class="info__body">
          <div class="info__row"
               v-for="(parameter, i) in data.parameterArray"
               :key="i">
            <div class="info__parameter">
              {{ data.parameterArray[i] }}:
            </div>
            <div class="info__value">
              {{ data.valueArray[i] }}
            </div>
          </div>
        </div>
        <div class="info__hide-button-wrapper">
          <MyRectangleButton
            class="info__hide-button"
            icon-name="ok"
            text="ok"
            @click="$emit('hide')"/>
        </div>
      </div>
    </MyModal>
  </div>
</template>

<script>
import MyModal from "@/components/Modal/MyModal";
import MyRectangleButton from "@/components/UI/MyRectangleButton";

export default {
  name: "Info",
  components: {MyRectangleButton, MyModal},
  props: {
    data: {type: Object, required: true}
  }
}
</script>

<style scoped>
.info__content {
  padding: 10px 20px;
}


.info__title {
  margin: 0 0 30px 0;

  font-size: 28px;
  text-align: center;

  color: #eeeeee;
}


.info__body {
  margin: 0 0 50px 0;
}

.info__row {
  margin: 0 0 14px 0;

  display: flex;

  font-size: 22px;

  color: #cccccc;
}

.info__parameter {
  margin: 0 10px 0 0;
}

.info__value {
  flex: 1 1 auto;
  color: #eeeeee;
  font-weight: 500;
  text-align: right;

  overflow: auto;
}


.info__hide-button-wrapper {
  display: flex;
  justify-content: center;
}

.info__hide-button {
  height: 50px;
}
</style>