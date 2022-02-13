<template>
  <div class="d-flex flex-row align-items-center">
    <b-form-input
      class="m-0 number-input"
      v-model="inputValue"
      type="number"
      :min="input.min"
      :max="input.max"
      :step="input.step"
      @change="onChange(id, inputValue * input.scale)"
      :disabled="input.forced == 0"
    ></b-form-input>
    <div class="d-flex flex-column justify-content-start ml-1">
      <span class="m-0 p-0" v-if="input.min != null"
        ><small>min: {{ input.min / input.scale }}{{ input.unit ? input.unit : "" }}</small></span
      >
      <span class="m-0 p-0" v-if="input.max != null"
        ><small>max: {{ input.max / input.scale }}{{ input.unit ? input.unit : "" }}</small></span
      >
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "NumberValue",
  data() {
    return {
      inputValue: 0,
    };
  },
  props: {
    id: Number,
    input: Object,
  },
  methods: {
    onChange(id, value) {
      console.log(value);

      if (this.input.max) {
        if (value > this.input.max) {
          value = this.input.max;
        }
      }

      if (this.input.min) {
        if (value < this.input.min) {
          value = this.input.min;
        }
      }

      console.log(value);
      this.inputValue = value / this.input.scale;
      console.log(`change on input with id ${id} to ${value}`);
      this.$emit("input-change", id, value);
    },
  },
};
</script>

<style scoped>
.number-input {
  width: 80px;
}

/* .threshold-values {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 1rem;
} */

small {
  color: var(--grey);
}
</style>
