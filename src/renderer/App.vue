<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'electron-serialport-app'
  }
</script>

<style>
  .el-form-item {
    margin-bottom: 0px;
  }
  /* CSS */
  .el-input__icon {
    line-height: 28px !important;
  }
  .el-input__inner {
    height: 28px !important;
    line-height: 28px !important;
  }
</style>
