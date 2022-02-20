<template>
  <b-form-checkbox v-model="inputValue" @change="onChange(id, inputValue)" switch :size="elSize"> </b-form-checkbox>
</template>

<script lang="ts">
/**
 * @displayName Checkbox (forcing/releasing)
 */
export default {
  name: "ForcingCheckBox",
  data() {
    return {
      inputValue: 0,
    };
  },
  props: {
    // element ID
    id: {
      type: Number,
      required: true,
    },
    /**
     * Size of the element
     * @values sm, lg, null (default)
     */
    elSize: {
      type: String,
      default: "lg",
    },
  },
  methods: {
    onChange(id, value) {
      /**
       * Called when the input value is forced/released
       * @property {Number} id input ID
       * @property {Boolean} value forced or not
       */
      this.$emit("checkbox-change", id, value);
    },
  },
};
</script>

<docs>
Checkbox used to set input state to forced/released.
</docs>
