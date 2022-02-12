<template>
  <div class="top-panel">
    <div class="info-toolbar">
      <h1>{{ title }}</h1>

      <!-- <slot /> -->
    </div>

    <div class="status">
      <div class="button-container">
        <font-awesome-icon class="icon-button start" v-on:click="onMeasurementStart" icon="play-circle" />
        <font-awesome-icon class="icon-button stop" v-on:click="onMeasurementEnd" icon="stop-circle" />
      </div>
      <div class="connection-status-container">
        <span>
          socket <b>{{ connectionSocket ? "OK" : "ERR" }}</b></span
        >
        <span>
          live counter <b>{{ heatbeat }}</b></span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "StatusPanel",
  props: {
    heatbeat: Number,
    connectionSocket: Boolean,
    title: String,
  },
  methods: {
    onMeasurementStart() {
      console.log("clicked start measurement");
      this.$emit("measurement-start");
    },
    onMeasurementEnd() {
      console.log("clicked stop measurement");
      this.$emit("measurement-stop");
    },
  },
};
</script>

<style scoped>
.top-panel {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
 
  margin-bottom: 1rem;
}

.info-toolbar {
 
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 600px;
  font-weight: bolder;
  font-size: 2em;
}

.status {
  display: flex;
  flex-direction: column;
}

.chip-logo {
  font-size: 3em;
}

.icon-button {
  font-size: 3em;
  cursor: pointer;
}

.start {
  color: green;
}

.stop {
  color: red;
}

.button-container {
  display: flex;
  flex-direction: row;
}

.connection-status-container {
  display: flex;
  flex-direction: column;
}
</style>
