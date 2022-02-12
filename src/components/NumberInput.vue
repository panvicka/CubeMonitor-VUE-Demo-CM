<template>
  <div class="number-input-wrapper">
    <div class="inner-wrapper">
      <b-form-input
        class="number-input"
        v-model="inputValue"
        type="number"
        :min="input.min"
        :max="input.max"
        :step="input.step"
        @change="onChange(id, inputValue * input.scale)"
        :disabled="input.forced == 0"
      ></b-form-input>
      <div class="threshold-values">
        <span v-if="input.min != null">min: {{ input.min / input.scale }}{{ input.unit ? input.unit : "" }}</span>
        <span v-if="input.max != null">max: {{ input.max / input.scale }}{{ input.unit ? input.unit : "" }}</span>
      </div>
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
.inner-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.number-input {
  width: 80px;
  margin: 0;
}

.threshold-values {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 1rem;
}

.threshold-values span {
  margin: 0;
  padding: 0;
  color: rgb(131, 131, 131);
  font-size: 0.8em;
  line-height: 0.8em;
}
</style>
