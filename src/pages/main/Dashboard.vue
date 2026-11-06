<script setup>
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartDom = ref(null)
const option = reactive({
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  legend: {
    data: ['销量']
  },
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    axisLabel: {
      formatter: (val) => { return val.split('').join('\n') }

    }
  },
  yAxis: {},
  grid: {
    left: '5%',
    right: '0%',
    bottom: '10%',
    top: '20%',
    containLabel: true
  },
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }]
})

const initChart = () => {
  const myChart = echarts.init(chartDom.value)

  myChart.setOption(option);
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}

onMounted(async() => {
  initChart()
  

})



</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <div ref="chartDom" class="chartDom"></div>
  </div>

</template>

<style scoped>
.chartDom {
  width: 100%;
  height: 450px;
}
</style>