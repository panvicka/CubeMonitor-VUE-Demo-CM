<template>
  <div class="number-input-wrapper">
    <div class="inner-wrapper">
      <div class="threshold-values">
        min: {{ input.min / input.scale }}{{ input.unit }}
      </div>
      <div class="threshold-values">
        max: {{ input.max / input.scale }}{{ input.unit }}
      </div>
      <b-form-input
        id="range-analog-inputs"
        v-model="inputValue"
        type="number"
        :min="input.min"
        :max="input.max"
        :step="input.step"
        @change="onChange(id, inputValue * input.scale)"
      ></b-form-input>
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
      if (value > this.input.max) {
        value = this.input.max;
      } else if (value < this.input.min) {
        value = this.input.min;
      }
      this.inputValue = value / this.input.scale;
      console.log(`change on input with id ${id} to ${value}`);
      this.$emit("input-change", id, value);
    },
  },
};
</script>
