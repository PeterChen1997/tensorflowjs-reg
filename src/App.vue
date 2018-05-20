<template>
<div>
  <!-- wrapper -->
  <div :class="this.isTraining ? 'loading-wrapper' : 'loading-wrapper hidden'">
    I am loading...
  </div>
  <!-- main -->
  <div class="container">
    <div class="row justify-content-center">
      <!-- canvas -->
      <div class="col-sm">
        <h3>在这画画看吧</h3>
          <div class="wrapper">
              <canvas id="canvas"></canvas><br>
          </div>

          <button class="btn btn-sm btn-warning" @click="this.getInfo">识别</button>
          <button class="btn btn-sm btn-danger" @click="() => this.drawer.clear()">重画</button>
      </div>
      <!-- chart -->
      <Chart ref="chart"/>
    </div>

    <div class="center">
      偏移量数据较少，所以在中间画识别率较高哈
    </div>
  </div>
</div>
</template>

<script>
import * as tf from "@tensorflow/tfjs";
import Draw from "./classes/draw.js";
import Chart from "./components/Chart";

export default {
  components: {
    Chart
  },

  data() {
    return {
      isTraining: false,
      model: {}
    };
  },

  mounted() {
    this.isTraining = true
    this.loadModel()
    this.drawer = new Draw("canvas")
    this.drawer.init()
  },

  methods: {
    async loadModel() {
      console.log("Loading model...")
      this.model = await tf.loadModel("/static/model.json")
      console.log("I am done.")
      this.isTraining = false
    },

    async predict(imageData) {
      // 防止GPU显存溢出
      const pred = await tf.tidy(() => {

        // 转换imageData为tf.sensor
        let img = tf.fromPixels(imageData, 1)
        img = img.reshape([1, 28, 28, 1])

        // 转换为可处理的数据格式
        img = tf.cast(img, "float32")

        // 识别并归一化结果
        const output = this.model.predict(img)

        // 保存识别结果
        this.predictions = Array.from(output.dataSync())
      })
    },

    async getInfo() {
      let imgData = this.drawer.getImgData()

      console.log(imgData)
      await this.predict(imgData)

      this.$refs.chart.setData(this.predictions)
    }
  }
}
</script>

<style lang="scss">
.loading-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #898989;
  font-size: 4em;
  color: white;
  transition: height 0.8s;
}

.hidden {
  height: 0;
}

.wrapper {
  display: inline-flex;
  justify-content: flex-end;
  border: 10px solid lighten(#ef6c00, 15%);
  transition: border-color 0.2s ease-in;
  &:hover {
    border: 10px solid #ef6c00;
    transition: border-color 0.2s ease-in;
  }
}

canvas {
  cursor: crosshair;
}

.row {
  margin: 10vh 5vw;
}

.center {
  text-align: center;
}
</style>