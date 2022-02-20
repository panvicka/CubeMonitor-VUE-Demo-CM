<template>
  <div class="d-flex flex-row">
    <canvas :id="name" class="graph"></canvas>
    <div class="graph-buttons-wrapper d-flex align-items-center pl-1">
      <font-awesome-icon class="start graph-button m-1" v-on:click="start()" icon="play-circle" />
      <font-awesome-icon class="stop graph-button m-1" v-on:click="stop()" icon="stop-circle" />
      <font-awesome-icon class="trash graph-button m-1" v-on:click="clean()" icon="trash" />
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
/**
 * @displayName Graph
 */
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
    /**
     * Clicking the trash icon will clean the graph data
     */
    clean() {
      for (let i = 0; i < this.data.length; i++) {
        this.myChart.data.datasets[i].data = [];
      }
      this.myChart.update();
    },
    /**
     * Clicking the stop icon will stop the data plotting
     */
    stop() {
      window.clearInterval(this.interval);
    },
    /**
     * Clicking the stop icon will start the data plotting
     */
    start() {
      this.interval = setInterval(() => {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        minutes = (minutes < 10 ? "0" : "") + minutes;
        this.adddataNew(this.data, `${hours}:${minutes}`);
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
    // Graph ID, must be unique
    id: String,
    // Graph name, must be unique
    name: String,
    // data
    data: Array,
    // Color of the lines, keep the order the same as data
    colors: Array,
    // Labels, keep the order the same as data
    labels: Array,
    // refresh rate of the graph
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
    for (let i = 0; i < this.data.length; i++) {
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

.graph-button {
  font-size: 2em;
  cursor: pointer;
  transition: opacity linear 0.2s;
  color: var(--grey);
}

.graph-button:hover {
  opacity: 0.8;
}
</style>

<docs>
Creates a graph from the passed data array. Custom labels, colors and refresh rate can be set. There are also buttons for 
controlling the graph. 
</docs>
