<template>
  <div class="my-rectangle-button">
    <div class="content"
         :class="{'content__disabled': disabled}"
         @click="clicked">
      <MyIcon class="content__icon"
              :style="{'opacity': disabled ? .5 : 1}"
              :icon-name="iconName"
              path-color="#eee"/>
      <p class="content__text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
import MyIcon from "@/components/UI/MyIcon";

export default {
  name: "MyRectangleButton",
  components: {MyIcon},
  props: {
    text: {type: String, required: true},
    iconName: {type: String, required: true},
    disabled: {type: Boolean, default: false}
  },
  methods: {
    clicked() {
      if (this.disabled) {
        return
      }
      this.$emit('clicked')
    }
  }
}
</script>

<style scoped>
.my-rectangle-button {
  display: flex;
  justify-content: center;
}

.content {
  width: 100%;
  height: 100%;
  padding: 0 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid #eeeeee;
  border-radius: 4px;

  cursor: pointer;
  transition: background-color .2s ease,
  border .2s ease;
}

.content__icon {
  margin: 0 15px 0 0;
  width: 20px;
  height: 20px;

  transition: opacity .2s ease;
}

.content__text {
  font-size: 20px;

  color: #eeeeee;

  transition: color .2s ease;
}

.content:hover {
  background-color: var(--light-purple-color);
}

.content:hover .content__text {
  color: #ffffff;
}

.content:active .content__text {
  color: var(--light-gray-color);
}


.content__disabled {
  border: 2px solid var(--light-gray-color);

  transition: background-color .5s ease;
}

.content__disabled .content__text {
  color: var(--light-gray-color);
}

.content__disabled:hover {
  background-color: rgba(243, 117, 117, 0.15);
}

.content__disabled:hover .content__text {
  color: var(--light-gray-color);
}

.content__disabled:active {
  background-color: rgba(243, 117, 117, 0.5);
}
</style>