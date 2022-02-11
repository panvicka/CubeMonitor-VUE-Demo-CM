<template>
  <div class="graph-wrapper">
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
  name: "ThreeValGraph",
  methods: {
    adddataNew(data, time) {
      data.forEach((element, index) => {
        // console.log(element);
        this.myChart.data.datasets[index].data.push(element);
      });
      this.myChart.data.labels.push(time);
      this.myChart.update();
    },
    adddata(data1, data2, data3, time) {
      this.myChart.data.datasets[0].data.push(data1);
      this.myChart.data.datasets[1].data.push(data2);
      this.myChart.data.datasets[2].data.push(data3);
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
        this.adddataNew(this.data3, `${hours}:${minutes}`);
      }, this.refresh);
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
  props: ["id", "name", "data2", "data1", "data3", "colors", "labels", "refresh"],
  data() {
    const interval = null;
    const chartSetting = {
      type: "line",
      data: {
        datasets: [],
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
    for (let i = 0; i < this.data3.length; i++) {
      console.log(this.colors[i]);
      this.myChart.data.datasets.push({
        label: `${this.labels[i]}`,
        data: [],
        borderColor: `${this.colors[i]}`,
        borderWidth: 3,
      });
    }
  },
};
</script>

<style scoped>
.graph-wrapper {
  min-height: 300px;
}

canvas {
  height: 100% !important;
}

.graph {
  height: 300px !important;
  width: 600px !important;
}
</style>
