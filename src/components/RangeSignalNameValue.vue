<template>
  <div>
    <div clas="flex-row">
      <span class="card-title">{{ item.name }}</span> {{ item.description }}
    </div>
    <span class="state">{{ item.value / item.scale }}{{ item.unit }} </span>
  </div>
</template>

<script lang="ts">
export default {
  name: "RangeSignalNameValue",
  props: {
    item: Object,
  },
};
</script>

<style scoped>
.state {
  color: blue;
}
</style>
