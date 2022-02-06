<template>
  <b-collapse :id="id"> 
      <slot />
  </b-collapse>
</template>

<script>
export default {
  name: 'CollapsableContent',
  props: {
    id: String,
  },
};
</script>
