<template>
  <div>
    <div class="flex-row">
      <span class="card-title">{{ digitalOutput.name }}</span>
      <br />
      {{ digitalOutput.description }}
    </div>

    <span class="state" :class="digitalOutput.value ? 'text-success' : 'text-danger'">{{
      digitalOutput.value ? "ON" : "OFF"
    }}</span>
  </div>
</template>

<script lang="ts">
export default {
  name: "DigitalOutput",
  props: {
    digitalOutput: Object,
  },
};
</script>

 