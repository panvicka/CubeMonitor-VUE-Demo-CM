<template>
  <div>
    <div class="d-flex flex-row">
      <span class="collaps-card-title">{{ digitalOutput.name }}</span>
      <br />
      {{ digitalOutput.description }}
    </div>

    <span class="font-weight-bold" :class="digitalOutput.value ? 'text-success' : 'text-danger'">{{
      digitalOutput.value ? "ON" : "OFF"
    }}</span>
  </div>
</template>

<script lang="ts">
/**
 * @displayName Digital output
 */
export default {
  name: "DigitalOutput",
  props: {
    digitalOutput: Object,
  },
};
</script>

<docs>
Shows a state of a simple digital output.
</docs>