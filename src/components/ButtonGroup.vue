<template>
  <div class="flex-container">
    <div
      :key="item.value"
      v-for="item in itemToButtonize"
      class="button-container"
    >
      <Button
        @btn-click="$emit('set-magic-register', item.value)"
        :text="item.description"
        :variant="item.btnType"
        :title="item.value.toString()"
      />
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'ButtonGroup',
  props: {
    itemToButtonize: Array,
  },
  components: {
    Button,
  },
  emits: ['set-magic-register'],
};
</script>

<style scoped>
.button-container {
  margin: 0.2em;
  background-color: rgba(255, 255, 255, 0.849);
  width: 30%;
  min-width: 250px;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
}

.button-container button {
  width: 100%;
  text-align: left;
}
</style>
