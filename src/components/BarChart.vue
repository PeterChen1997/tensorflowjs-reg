
<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ["chartData"],
  data() {
    return {
      defaultData: {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        datasets: [
          {
            label: "识别可能性",
            backgroundColor: "#ef6c00",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      },
      options: {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                fontSize: 40
              }
            }
          ],
          yAxes: [
            {
              display: false,
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData || this.defaultData, this.options);
  }
};
</script>
