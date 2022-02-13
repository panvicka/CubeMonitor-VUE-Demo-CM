<template>
  <div class="graph-wrapper">
    <canvas :id="name" class="graph"></canvas>
    <div class="graph-buttons-wrapper">
      <font-awesome-icon class="start graph-button" v-on:click="start()" icon="play-circle" />
      <font-awesome-icon class="stop graph-button" v-on:click="stop()" icon="stop-circle" />
      <font-awesome-icon class="trash graph-button" v-on:click="clean()" icon="trash" />
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "VariableGraph",
  methods: {
    adddataNew(data, time) {
      data.forEach((element, index) => {
        this.myChart.data.datasets[index].data.push(element);
      });
      this.myChart.data.labels.push(time);
      this.myChart.update();
    },
    clean() {
      for (let i = 0; i < this.data3.length; i++) {
        this.myChart.data.datasets[i].data = [];
      }
      this.myChart.update();
    },
    stop() {
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
      this.myChart = new Chart(ctx, {
        type: chardData.type,
        data: chardData.data,
        options: chardData.options,
      });
    },
  },
  props: {
    id: String,
    name: String,
    data3: Array,
    colors: Array,
    labels: Array,
    refresh: Number,
  },

  data() {
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

.graph {
  height: 300px !important;
  width: 600px !important;
}

.graph-wrapper {
  display: flex;
  flex-direction: row;
}

.graph-buttons-wrapper {
  display: flex;
  align-items: center;
  padding-left: 0.9rem;
}

.graph-button {
  font-size: 2em;
  margin: 0.7rem;
  cursor: pointer;
  transition: opacity linear 0.2s;
  color: var(--grey);
}

.graph-button:hover {
  opacity: 0.8;
}
</style>
