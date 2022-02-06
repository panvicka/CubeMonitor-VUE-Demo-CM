<template>
  <div>
    <b>{{ item.name }}</b> {{ item.description }}
    <br />
    {{ item.value / item.scale }}{{ item.unit }}
  </div>
</template>

<script lang="ts">
export default {
  name: 'RangeSignalNameValue',
  props: {
    item: Object,
  },
};
</script>

<style scoped></style>
