<template>
  <div class="chart-wrapper">
    <div style="display: block">
      <BarChart 
        :chartData="this.chartData"
      />
    </div>
  </div>
</template>

<script>
import BarChart from "./BarChart"

export default {
  components: {
    BarChart
  },
  data() {
    return {
      chartData: null
    }
  },
  methods: {
    setData(data) {
      // 更新为新对象才能触发 vue-chart 的刷新
      this.chartData = {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        datasets: [
          {
            label: "识别可能性",
            backgroundColor: "#ef6c00",
            data: data
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.chart-wrapper {
  width: 300px;
  height: 300px;
}
</style>