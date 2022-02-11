<template>
<!-- wrapping collapsable content into div prevents animation glitch -->
  <div>
    <b-collapse :id="id" @hide="$emit('hide')" @show="$emit('show')">
      <slot />
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "CollapsableContent",
  props: {
    id: String,
  },
};
</script>

<style scoped>

</style>
