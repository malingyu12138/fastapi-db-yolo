<script setup>
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
import { searchRsyield } from '@/api/userApi'
const ruleFormRef = ref()
const ruleForm = reactive({
  region: '',
  count: '',
  startDate1: '',
  startDate2: '',
  endDate1: '',
  endDate2: '',
  resource: '',
  desc: '',
})
const locationOptions = ['Home', 'Company', 'School']
const rules = reactive({
  region: [
    {
      required: true,
      message: 'Please select Activity fab',
      trigger: 'change',
    },
  ],
  startDate1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  startDate2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  endDate1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  endDate2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],

  resource: [
    {
      required: true,
      message: 'Please select activity step',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input pro form', trigger: 'blur' },
  ],
})
const customValue = ref('')
const handleRadioChange = (val) => {
  if (val !== 'custom') {
    // 如果选了预设项，清空自定义输入框的内容（可选操作）
    customValue.value = ''
  }
}
const handleCustomInput = (val) => {

  ruleForm.resource = val
}

const seachApi = async () => {
  // 1. 格式化日期为 ISO 字符串 (如 "2026-05-28T09:30:00")
  const formatDate = (date, time) => {
    if (!date || !time) return ''
    const d = new Date(date)
    const t = new Date(time)
    d.setHours(t.getHours(), t.getMinutes(), t.getSeconds())

    // 直接格式化为 YYYY-MM-DDTHH:mm:ss，不转换为 UTC
    const pad = (num) => num.toString().padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  }

  // 2. 构造符合 curl --data-raw 结构的请求参数
  const params = {
    factoryname: ruleForm.region,           // 对应 factoryname
    product_id: ruleForm.desc,              // 假设 product_id 对应 Activity Pro 输入框
    rs_step_id: ruleForm.resource,          // 对应 rs_step_id
    start_date: formatDate(ruleForm.startDate1, ruleForm.startDate2),
    end_date: formatDate(ruleForm.endDate1, ruleForm.endDate2)
  }

  // 3. 发起请求并返回数据
  const res = await searchRsyield(params)
  return res
}

const submitForm = async (formEl) => {
  if (!formEl) return
  try {
    // 直接 await validate，校验通过才会继续往下走
    await formEl.validate()
    console.log('submit!')
    const res = await seachApi()
    console.log("searchRsyield", res)

  } catch (err) {
    // 如果 validate 校验失败，或者 seachApi 报错，都会进入这里
    console.error('error submit!', err)
  }
}
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))

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

onMounted(async () => {
  initChart()


})



</script>

<template>
  <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto">
    <el-form-item label="Activity Fab" prop="region">
      <el-select v-model="ruleForm.region" placeholder="Activity Fab">
        <el-option label="ARRAY" value="ARRAY" />
        <el-option label="OLED" value="OLED" />
        <el-option label="TP" value="TP" />
        <el-option label="POSTCELL" value="POSTCELL" />
      </el-select>
    </el-form-item>

    <el-form-item label="Activity time Start" required>
      <el-col :span="11">
        <el-form-item prop="startDate1">
          <el-date-picker v-model="ruleForm.startDate1" type="date" aria-label="Pick a date"
            placeholder="Pick a start date" style="width: 100%" />
        </el-form-item>
      </el-col>
      <el-col class="text-center" :span="2">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-form-item prop="startDate2">
          <el-time-picker v-model="ruleForm.startDate2" aria-label="Pick a time" placeholder="Pick a time"
            style="width: 100%" />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="Activity time End" required>
      <el-col :span="11">
        <el-form-item prop="endDate1">
          <el-date-picker v-model="ruleForm.endDate1" type="date" aria-label="Pick a date" placeholder="Pick a end date"
            style="width: 100%" />
        </el-form-item>
      </el-col>
      <el-col class="text-center" :span="2">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-form-item prop="endDate2">
          <el-time-picker v-model="ruleForm.endDate2" aria-label="Pick a time" placeholder="Pick a time"
            style="width: 100%" />
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item label="Step" prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio value="1A609">1A609</el-radio>
        <el-radio value="11609">11609</el-radio>
        <el-radio value="12609">12609</el-radio>
        <el-radio value="13609">13609</el-radio>
        <el-radio value="17609">17609</el-radio>
        <el-radio value="custom">自定义</el-radio>

        <el-input v-if="ruleForm.resource === 'custom'" v-model="customValue" placeholder="请输入自定义资源"
          style="width: 200px; margin-left: 10px;" @input="handleCustomInput" />

      </el-radio-group>

    </el-form-item>
    <el-form-item label="Activity Pro" prop="desc">
      <el-input v-model="ruleForm.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">Search
        <el-icon>
          <Search />
        </el-icon>
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
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