<template>
  <b-collapse :id="id" @hide="$emit('hide')" @show="$emit('show')">
    <slot />
  </b-collapse>
</template>

<script>
export default {
  name: "CollapsableContent",
  props: {
    id: String,
  },
};
</script>
