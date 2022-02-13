<template>
  <div class="d-flex flex-column">
    <div class="d-flex justify-content-start align-items-center">
      <div class="font-weight-bold text-primary m-1" :class="!input.forced && 'text-dark'">
        {{ input.min / input.scale }}{{ input.unit }}
      </div>
      <b-form-input
        :disabled="input.forced == false"
        id="range-analog-inputs"
        v-model="inputValue"
        type="range"
        :min="input.min"
        :max="input.max"
        :step="input.step"
        @input="onChange(id, inputValue)"
      ></b-form-input>
      <div class="font-weight-bold text-primary m-1 " :class="!input.forced && 'text-dark'">
        {{ input.max / input.scale }}{{ input.unit }}
      </div>
    </div>
    <!-- round to 2 decimal places -->
    <span :class="input.forced ? 'text-primary' : 'text-dark'" class="text-center"
      >{{ Math.round((inputValue / input.scale) * 100) / 100 }}{{ input.unit }}</span
    >
  </div>
</template>
<script lang="ts">
export default {
  name: "RangeInput",
  data() {
    return {
      inputValue: null,
      lastInputState: false,
    };
  },
  props: {
    id: Number,
    input: Object,
  },
  watch: {
    $props: {
      handler: function() {
        if (this.input.forced == true && this.lastInputState == false) {
          this.$emit("input-change", this.id, this.inputValue);
        }
        if (this.input.forced == false) {
          this.inputValue = this.input.value;
        }
        this.lastInputState = this.input.forced;
      },
      deep: true,
    },
  },
  methods: {
    onChange(id, value) {
      this.$emit("input-change", id, value);
    },
  },
  created: function() {
    setTimeout(() => {
      this.inputValue = this.input.value;
    }, 1000);
  },
};
</script>

<style scoped>
span {
  margin-top: -0.9em;
  opacity: 80%;
}

.custom-range {
  width: 100px;
  margin-bottom: 0px;
}
</style>
