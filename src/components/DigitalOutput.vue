<template>
  <div>
    <div class="flex-row">
      <span class="card-title">{{ digitalOutput.name }}</span>
      <br />
      {{ digitalOutput.description }}
    </div>
   
    <span class="state" :class="digitalOutput.value ? 'state-on' : 'state-off'">{{
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
  methods: {},
};
</script>

<style scoped>
.state-on {
  color: green;
}

.state-off {
  color: rgb(196, 4, 4);
}
</style>
