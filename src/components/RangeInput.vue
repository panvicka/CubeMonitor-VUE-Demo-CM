<template>
  <div class="range-input-wrapper">
    <div class="inner-wrapper">
      <div class="threshold-values">{{ input.min / input.scale }}{{ input.unit }}</div>
      <b-form-input
        id="range-analog-inputs"
        v-model="inputValue"
        type="range"
        :min="input.min"
        :max="input.max"
        :step="input.step"
        @change="onChange(id, inputValue)"
      ></b-form-input>
      <div class="threshold-values">{{ input.max / input.scale }}{{ input.unit }}</div>
    </div>
    <span>{{ inputValue / input.scale }}{{ input.unit }}</span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'RangeInput',
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
      console.log(`change on input with id ${id} to ${value}`);
      this.$emit('input-change', id, value);
    },
  },
};
</script>

<style scoped>
span {
  text-align: center;
  margin-top: -0.9em;
  color: rgb(0, 98, 205);
  opacity: 80%;
}

.range-input-wrapper {
  display: flex;
  flex-direction: column;
}
.inner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.custom-range {
  width: 80%;
  margin-bottom: 0px;
}

.threshold-values {
  color: rgb(0, 98, 205);
  font-weight: bolder;
  margin: 0.5em;
  font-size: 1.1em;
}
</style>
