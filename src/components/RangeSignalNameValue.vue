<template>
  <div>
    <div clas="d-flex flex-row">
      <span class="collaps-card-title">{{ item.name }}</span> {{ item.description }}
    </div>
    <span class="text-info font-weight-bold">{{ item.value / item.scale }}{{ item.unit }} </span>
  </div>
</template>

<script lang="ts">
/**
 * @displayName Ranged input value
 */
export default {
  name: "RangeSignalNameValue",
  props: {
    item: Object,
  },
};
</script>


<docs>
Shows value of an analog input with scaling and unit.
</docs>

 