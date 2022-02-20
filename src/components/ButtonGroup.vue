<template>
  <div class="d-flex flex-column w-100">
    <div :key="item.value" v-for="item in itemToButtonize" class="m-1 rounded button-container">
      <Button
        @btn-click="$emit('set-magic-register', item.value)"
        :text="item.description"
        :variant="item.btnType"
        :eventId="item.value.toString()"
      />
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";

/**
 *
 * @displayName Button Group
 */
export default {
  name: "ButtonGroup",
  // Array of objects from which the buttons should be created
  props: {
    itemToButtonize: Array,
  },
  components: {
    Button,
  },
  emits: ["set-magic-register"],
};
</script>

<docs>
Component creating buttons from an definition array
</docs>
