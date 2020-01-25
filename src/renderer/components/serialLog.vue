<template>
  <!-- 日志显示 -->
  <div class="serial-log">
      <el-row>
          <el-button type="primary" @click="add">增加</el-button>
      </el-row>
  </div>
</template>

<script>
import DataStore from './dataStore.js'
export default {
  name: 'SerialLog',
  data () {
    return {

    }
  },
  created () {
    DataStore.loadDatabase() // 登录数据库
    // 查询所有的数据
    DataStore.find({}, (err, res) => {
      console.log(err, res)
    })
  },
  methods: {
    add () {
      DataStore.insert({
        name: 'yaodongcai'
      }, (err, res) => {
        console.log('err', err, 'res', res)
      })
    }
  }
}
</script>

<style>

</style>