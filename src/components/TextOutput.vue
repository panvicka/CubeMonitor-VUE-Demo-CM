<template>
  <div class="output-wrapper">
    <span>
      <b>{{ TextOutput.name }}: </b>
    </span>
    <span> {{ TextOutput.value }}</span>
  </div>
</template>

<script lang="ts">
export default {
  name: "TextOutput",
  props: {
    TextOutput: Object,
  },
};
</script>

<style scoped>
.output-wrapper {
  display: flex;
}
</style>
