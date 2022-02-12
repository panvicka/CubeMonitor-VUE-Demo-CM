<template>
  <div class="top-panel">
    <div class="info-toolbar">
      <h1>Cube Monitor + Vue DEMO</h1>
      <div class="info-text">
        This VUE app uses <a href="https://flows.nodered.org/node/node-red-contrib-uibuilder">ui-builder</a> +
        <a href="https://www.st.com/en/development-tools/stm32cubemonitor.html">STM32CubeMonitor</a>. You can display
        and directly manipulate variables without fiddling with the nodeRED function diagramm. Use cases:

        <ul>
          <li>
            you do not have the HW yet, but you have to start with integration tests
          </li>
          <li>
            there is a part of a system (like sensor or switch) missing (broken, not delivered on time)
          </li>
          <li>
            the sensor/switch is in unreachable position or it is not possible/save to simulate the conditions
            (pressure/oxygen sensors)
          </li>
          <li>
            you need to simulate situations that should never occur in real-life to test edge cases
          </li>
        </ul>
      </div>
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
          MCU <b>{{ connectionMcu ? "OK" : "ERR" }}</b></span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "StatusPanel",
  props: {
    connectionSocket: Boolean,
    connectionMcu: Boolean,
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
ul {
  margin-left: 2em;
}

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
  flex-direction: column;
  align-items: flex-start;
  max-width: 800px;
  font-weight: bolder;
  font-size: 2em;
  margin-left: -0.8rem;
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
  transition: color linear 0.2s;
}

.start {
  color: green;
}
.start:hover {
  color: rgba(0, 128, 0, 0.5);
}

.stop {
  color: red;
}

.stop:hover {
  color: rgba(255, 0, 0, 0.5);
}

.button-container {
  display: flex;
  flex-direction: row;
}

.connection-status-container {
  display: flex;
  flex-direction: column;
}

h1 {
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.info-text {
  font-size: 0.5em;
  font-weight: normal;
  line-height: 1.3em;
}
</style>
