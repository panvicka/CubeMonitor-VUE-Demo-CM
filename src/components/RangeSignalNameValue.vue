<template>
  <div>
    <div clas="flex-row">
      <span class="card-title">{{ item.name }}</span> {{ item.description }}
    </div>
    <span class="text-info font-weight-bold">{{ item.value / item.scale }}{{ item.unit }} </span>
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

 