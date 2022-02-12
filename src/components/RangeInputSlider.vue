<template>
  <div class="range-input-wrapper">
    <div class="inner-wrapper">
      <div class="threshold-values" :class="!input.forced && 'hidden'">
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
      <div class="threshold-values " :class="!input.forced && 'hidden'">
        {{ input.max / input.scale }}{{ input.unit }}
      </div>
    </div>
    <!-- round to 2 decimal places -->
    <span :class="!input.forced && 'hidden'"
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
  text-align: center;
  margin-top: -0.9em;
  color: rgb(0, 98, 205);
  opacity: 80%;
}

.range-input-wrapper {
  display: flex;
  flex-direction: column;
  width: 200px;
}
.inner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.custom-range {
  width: 60%;
  margin-bottom: 0px;
}

.threshold-values {
  color: rgb(0, 98, 205);
  font-weight: bolder;
  margin: 0.5em;
  font-size: 1.1em;
}

.hidden {
  color: rgb(58, 60, 61);
}
</style>
