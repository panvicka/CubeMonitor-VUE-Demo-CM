<template>
  <b-form-checkbox v-model="inputValue" @change="onChange(id, inputValue)" switch>
    {{ inputValue ? 'forcing enabled' : 'forcing disabled' }}
  </b-form-checkbox>
</template>

<script lang="ts">
export default {
  name: 'ForcingCheckBox',
  data() {
    return {
      inputValue: 0,
    };
  },
  props: {
    id: Number,
  },
  methods: {
    onChange(id, value) {
      console.log(`change on checkbox with id ${id} to ${value}`);
      this.$emit('checkbox-change', id, value);
    },
  },
};
</script>

<style scoped></style>
