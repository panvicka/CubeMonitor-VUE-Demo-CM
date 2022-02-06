<template>
  <b-button
    size="sm"
    id="magic"
    :title="title"
    :variant="variant"
    @click="onClick(title)"
    >{{ text }}</b-button
  >
</template>

<script lang="ts">
export default {
  name: 'Button',
  props: {
    text: String,
    variant: String,
    title: String,
  },
  methods: {
    onClick(title) {
      console.log('clicked ' + title);
      this.$emit('btn-click', title);
    },
  },
};
</script>
