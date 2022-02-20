<template>
  <div>
    <div class="d-flex flex-row">
      <span class="collaps-card-title">{{ digitalInput.name }}</span>
      {{ digitalInput.description }}
    </div>

    <span class="font-weight-bold" :class="digitalInput.value ? 'text-success' : 'text-danger'">{{
      digitalInput.value ? "ON" : "OFF"
    }}</span>

    <div>
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
/**
 * @displayName Digital input
 */
export default {
  name: "DigitalInput",
  data() {
    return {
      // input value is beeing overwritten
      forced: 0,
      // the overwritte value
      forcedValue: 0,
    };
  },
  props: {
    // Button ID
    id: {
      type: Number,
      required: true,
    },
    digitalInput: Object,
  },
  methods: {
    onChangeForced(id, value) {
      /**
       * Called when the input value is forced/released
       * @property {Number} id input ID
       * @property {Boolean} value forced or not
       */
      this.$emit("input-forced-change", id, value);
    },
    onChangeForcedValue(id, forcedValue) {
      /**
       * Called when the value of the forced input changes
       * @property {Number} id input ID
       * @property {Boolean} forcedValue forced value
       */
      this.$emit("input-forced-value-change", id, forcedValue);
    },
  },
};
</script>

<docs>
Shows a state of a simple digital input and enabled turning on/off of the input overwrite (force).
</docs>
