<template>
  <div>
    <canvas :id="name" class="graph"></canvas>
    <button v-on:click="clean()">clean</button>
    <button v-on:click="stop()">stop</button>
    <button v-on:click="start()">start</button>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

let numberOfData = 0;
let chart;

let interval;

function clean() {
  this.myChart.data.datasets[0].data = [];
  this.myChart.data.datasets[1].data = [];
  this.myChart.data.datasets[2].data = [];
}

function stop() {
  console.log("stopping interval");
  window.clearInterval(interval);
}

export default {
  name: "PlanetChart",
  methods: {
    adddata(setpoint, current, power, time) {
      this.myChart.data.datasets[0].data.push(setpoint);
      this.myChart.data.datasets[1].data.push(current);
      this.myChart.data.datasets[2].data.push(power);
      this.myChart.data.labels.push(time);
      this.myChart.update();
    },
    clean() {
      this.myChart.data.datasets[0].data = [];
      this.myChart.data.datasets[1].data = [];
      this.myChart.data.datasets[2].data = [];
    },
    stop() {
      console.log("stopping interval");
      window.clearInterval(this.interval);
    },
    start() {
      this.interval = setInterval(() => {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        minutes = (minutes < 10 ? "0" : "") + minutes;
        this.adddata(
          this.setpoint,
          this.current,
          this.power,
          `${hours}:${minutes}`
        );
      }, 4000);
    },
    createChart(chartId, chardData) {
      const ctx = document.getElementById(chartId);
      // Save reference
      this.myChart = new Chart(ctx, {
        type: chardData.type,
        data: chardData.data,
        options: chardData.options,
      });
    },
  },
  props: ["id", "name", "current", "setpoint", "power"],
  data() {
    const interval = null;
    const chartSetting = {
      type: "line",
      data: {
        datasets: [
          {
            label: "setpoint",
            data: [],
            borderColor: "blue",
            borderWidth: 3,
          },
          {
            label: "current",
            data: [],
            borderColor: "red",
            borderWidth: 3,
          },
          {
            label: "power",
            data: [],
            borderColor: "black",
            borderWidth: 3,
          },
        ],
      },
      options: {
        resposive: true,
        scales: {
          y: {
            type: "linear",
            grace: "5%",
            ticks: {
              beginAtZero: true,
              max: 160,
            },
          },
        },
      },
    };
    return {
      myChart: null,
      chartSetting: chartSetting,
    };
  },
  mounted() {
    this.createChart(this.name, this.chartSetting);
    this.interval = setInterval(() => {
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      minutes = (minutes < 10 ? "0" : "") + minutes;
      this.adddata(
        this.setpoint,
        this.current,
        this.power,
        `${hours}:${minutes}`
      );
    }, 4000);
  },
};
</script>

<style scoped></style>
