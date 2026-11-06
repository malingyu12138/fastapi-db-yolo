<script setup>


</script>

<template>
  <div class="button-row">
    <el-button>T</el-button>
    <el-button type="primary">A</el-button>
    <el-button type="success">I</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>

  </div>
  <router-view></router-view>
</template>

<style scoped>
.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

</style>