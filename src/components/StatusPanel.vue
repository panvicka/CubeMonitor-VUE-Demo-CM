<template>
  <div class="top-panel">
    <div class="info-toolbar info-logo">
      <b-img
        src="./images/node-blue-192x192.png"
        rounded
        left
        alt="Blue Node-RED"
        class="mt-1 mr-2"
      ></b-img>
      <h1>{{ title }}</h1>
      <slot/>
    </div>
    <div class="flex-container-item-flex flex-container-column info-toolbar">
      <b-button id="btn_start" variant="primary" v-on:click="onMeasurementStart"
        >Measurement Start
      </b-button>
      <b-button id="btn_stop" variant="primary" v-on:click="onMeasurementEnd"
        >End Measurement</b-button
      >
      <span>
        Socket.io Connection Status: <b>{{ connectionSocket }}</b></span
      >
      <span>
        Heartbeat <b>{{ heatbeat }}</b></span
      >
    </div>
    <br />
  </div>
</template>

<script lang="ts">
export default {
  name: 'StatusPanel',
  props: {
    heatbeat: Number,
    connectionSocket: Boolean,
    title: String,
  },
  methods: {
    onMeasurementStart() {
      console.log('clicked start measurement');
      this.$emit('measurement-start');
    },
    onMeasurementEnd() {
      console.log('clicked stop measurement');
      this.$emit('measurement-stop');
    },
  },
};
</script>

<style scoped>
img {
    width: 60px;
}
</style>
