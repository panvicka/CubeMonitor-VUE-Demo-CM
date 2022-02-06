<template>
  <div>
    <b>{{ item.name }}</b> {{ item.description }}
    <br />
    {{ item.forcedValue / item.scale }}{{ item.unit }}
  </div>
</template>

<script lang="ts">
export default {
  name: 'RangeSignalNameForcedValue',
  props: {
    item: Object,
  },
};
</script>

<style scoped></style>
