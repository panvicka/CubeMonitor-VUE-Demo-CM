<template>
  <div class="d-flex flex-column mb-2">
    <div class="d-flex flex-row w-100 justify-content-between align-items-center mb-4">
      <h1 class="font-weight-bold text-uppercase">Cube Monitor + Vue DEMO</h1>
      <div class="d-flex flex-column">
        <div class="d-flex flex-row">
          <font-awesome-icon class="ml-1 icon-button text-success" v-on:click="onMeasurementStart" icon="play-circle" />
          <font-awesome-icon class="ml-1 icon-button text-danger" v-on:click="onMeasurementEnd" icon="stop-circle" />

          <div class="ml-3 align-items-end w-5 text-grey">
            socket <b>{{ connectionSocket ? "OK" : "ERR" }}</b
            ><br />
            MCU <b>{{ connectionMcu ? "OK" : "ERR" }}</b>
          </div>
        </div>
      </div>
    </div>
    <div class="lh-sm mb-3">
      This VUE app uses <a href="https://flows.nodered.org/node/node-red-contrib-uibuilder">ui-builder</a> +
      <a href="https://www.st.com/en/development-tools/stm32cubemonitor.html">STM32CubeMonitor</a>. You can display and
      directly manipulate variables without fiddling with the nodeRED function diagramm. More info on the
      <a href="https://panvicka.github.io/CubeMonitor-VUE-Demo-CM/">project documentation page.</a>
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
.icon-button {
  font-size: 3em;
  cursor: pointer;
  transition: opacity linear 0.2s;
}

.icon-button:hover {
  opacity: 0.8;
}

h1 {
  letter-spacing: 0.1em;
}
</style>
