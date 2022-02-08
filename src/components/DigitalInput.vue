<template>
  <div>
    <span>
      <b>{{ digitalInput.name }}</b> {{ digitalInput.description }}
    </span>
    <br />
    <span class="state" :class="digitalInput.value ? 'state-off' : 'state-on'">{{
      digitalInput.value ? "OFF" : "ON"
    }}</span
    ><br />

    <b-form-checkbox v-model="forced" @change="onChangeForced(id, forced)" switch>
      {{ forced ? "forcing enabled" : "forcing disabled" }}
    </b-form-checkbox>
    <b-form-checkbox
      :disabled="forced ? false : true"
      v-model="forcedValue"
      @change="onChangeForcedValue(id, forcedValue)"  
      switch    
    >
      forced value
    </b-form-checkbox>
    <slot />
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
      console.log(`change on digital input forcing with id ${id} to ${value}`);
      this.$emit("input-forced-change", id, value);
    },
    onChangeForcedValue(id, forcedValue) {
      console.log(`change on digital input forced value with id ${id} to ${forcedValue}`);
      this.$emit("input-forced-value-change", id, forcedValue);
    },
  },
};
</script>

<style scoped>
.state-on {
  color: green;
}

.state-off {
  color: rgb(196, 4, 4);
}
</style>
