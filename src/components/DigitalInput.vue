<template>
  <div>
    <div class="flex-row">
      <span class="card-title">{{ digitalInput.name }}</span>
      {{ digitalInput.description }}
    </div>

    <span class="state" :class="digitalInput.value ? 'text-success' : 'text-danger'">{{
      digitalInput.value ? "ON" : "OFF"
    }}</span>

    <div class="controls">
      <b-form-checkbox v-model="forced" @change="onChangeForced(id, forced)" switch>
        {{ forced ? "overwrite activated" : "overwrite deactivate" }}
      </b-form-checkbox>

      <b-form-checkbox
        :disabled="forced ? false : true"
        v-model="forcedValue"
        @change="onChangeForcedValue(id, forcedValue)"
        switch
      >
        {{ forcedValue ? "forced ON" : "forced OFF" }}
      </b-form-checkbox>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "DigitalInput",
  data() {
    return {
      forced: 0,
      forcedValue: 0,
    };
  },
  props: {
    id: Number,
    digitalInput: Object,
  },
  methods: {
    onChangeForced(id, value) {
      this.$emit("input-forced-change", id, value);
    },
    onChangeForcedValue(id, forcedValue) {
      this.$emit("input-forced-value-change", id, forcedValue);
    },
  },
};
</script>
