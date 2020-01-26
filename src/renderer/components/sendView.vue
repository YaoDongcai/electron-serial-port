<template>
  <div class="send-view">
    <el-row>
      <el-col :span="18">
        <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="textarea"></el-input>
      </el-col>
      <el-col :span="6" class="send-radio-group">
        <el-radio-group v-model="checkedSendCheckbox" size="small">
          <el-radio
            class="send-radio-item"
            v-for="item in sendCheckboxList"
            :label="item.value"
            :key="item.id"
          >{{item.name}}</el-radio>
        </el-radio-group>

        <div class="send-group-btn">
          <el-button type="primary" @click="sendTextarea" size="small">发送</el-button>
          <el-button type="default" @click="clearTextarea" size="small">清空</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SendView',
  data () {
    return {
      textarea: '',
      checkedSendCheckbox: 'hex',
      sendCheckboxList: [
        {
          id: 1,
          name: '十六进制',
          value: 'hex'
        },
        {
          id: 2,
          name: '二进制',
          value: 'double'
        },
        {
          id: 3,
          name: '字符',
          value: 'str'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      isOpenSerialPort: state => state.SerialPort.isOpenSerialPort
    })
  },
  created () {
    console.log('created', this.isOpenSerialPort)
  },
  methods: {
    // 发送按钮
    sendTextarea () {
      // 先要检测是否打开串口
      if (this.isOpenSerialPort) {
        console.log('sendTextarea isOpenSerialPort', this.isOpenSerialPort)
        // ok
      } else {
        // 提醒用户需要打开串口
        this.$notify({
          title: '串口检测',
          message: '请点击串口设置打开串口',
          type: 'warning'
        })
      }
    },
    clearTextarea () {
      this.textarea = '' // clear textarea
    },
    handleCheckedSendCheckboxChange () {}
  }
}
</script>

<style scoped lang="scss">
.send-view {
  .send-radio-group {
    display: inline-block;
    text-align: left;
    .send-radio-item {
      margin: 8px 15px;
    }
    .send-group-btn {
      margin-left: 15px;
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
}
</style>