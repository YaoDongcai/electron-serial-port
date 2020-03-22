<template>
  <el-row class="serial-config">
    <el-form
      :model="configForm"
      :rules="configRules"
      ref="ruleForm"
      label-width="100px"
      class="serial-config-form"
    >
      <el-form-item label="串口名称" prop="name">
        <el-select :disabled="isDisabled" v-model="configForm.name" placeholder="请选择串口">
          <el-option :key="index" v-for="(item, index) in serialPortList" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="波特率" prop="baudrate">
        <el-select :disabled="isDisabled" v-model="configForm.baudrate" placeholder="请选择波特率">
          <el-option label="9600" value="9600"></el-option>
          <el-option label="19200" value="19200"></el-option>
          <el-option label="38400" value="38400"></el-option>
          <el-option label="43000" value="43000"></el-option>
          <el-option label="56000" value="56000"></el-option>
          <el-option label="57600" value="57600"></el-option>
          <el-option label="115200" value="115200"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="数据位" prop="databits">
        <el-select :disabled="isDisabled" v-model="configForm.databits" placeholder="请选择数据位">
          <el-option label="5" value="5"></el-option>
          <el-option label="6" value="6"></el-option>
          <el-option label="7" value="7"></el-option>
          <el-option label="8" value="8"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="校验位" prop="checkDigit">
        <el-select :disabled="isDisabled" v-model="configForm.checkDigit" placeholder="请选择校验位">
          <el-option label="None" value="none"></el-option>
          <el-option label="Odd" value="odd"></el-option>
          <el-option label="Even" value="even"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="停止位" prop="stopBit">
        <el-select :disabled="isDisabled" v-model="configForm.stopBit" placeholder="请选择停止位">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button v-if="!isDisabled" type="primary" @click="openSerialPort('ruleForm')">
          <span class="iconfont icon-dakai"></span>打开串口
        </el-button>
        <el-button v-if="isDisabled" type="info" @click="closeSerialPort('ruleForm')">
          <span class="iconfont icon-guanbi"></span>关闭串口
        </el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
import { mapMutations } from 'vuex'
import Bus from '../utils/bus.js'
const SerialPort = require('serialport')
export default {
  name: 'serialConfig',
  data () {
    return {
      serialPortList: [], // 端口列表
      isDisabled: false, /// 限制开启
      configForm: { // 端口创建控制
        name: '',
        baudrate: 9600,
        databits: 8,
        checkDigit: 'none',
        stopBit: 1
      },
      // form表单校验
      configRules: {
        name: [{ required: true, message: '请选择串口名称', trigger: 'change' }]
      }
    }
  },
  created () {
    // 此时先要获取打开的端口有哪些
    const self = this
    Bus.$on('sendData', (value) => {
      // 获取到这个数据
      console.log('value')
      this.port.write(value.value, value.sendType, err => {
        console.log('err', err)
        if (err) {
          return console.log('write Error', err.message)
        } else {
          console.log('写入成功')
        }
      })
    })
    self.serialPortList = [] // 初始化
    // 获取串口数据
    // let index = 0
    SerialPort.list(function (err, ports) {
      if (err) {
        console.log('err', err)
      }
      ports.forEach(function (port) {
        console.log('port', port)
        self.serialPortList.push({
          label: port.comName,
          value: port.comName
        })
      })
    })
  },
  methods: {
    ...mapMutations(['setSerialPort', 'setSerialPortHandle']),
    // 通过portname 端口打开这个端口
    openSerialPortByPortName (portName) {
      console.log('portName', portName)
      let port = new SerialPort(portName + '', {
        baudRate: this.configForm.baudrate, // 传输率
        dataBits: this.configForm.databits, // 数据位数
        parity: this.configForm.checkDigit,
        stopBits: this.configForm.stopBit, // 停止位
        flowControl: false
      }, false)

      this.port = port

      // 连接成功后 绑定事件监听
      // 建立建立的时候
      port.on('open', (value) => {
        console.log('open', value)
        // 提示用户 串口打开成功
        this.$message.success('串口打开成功')
      })
      // 建立接收到数据时
      port.on('data', (data) => {
        // 需要在这个时候把数据传递给那边
        // 接收数据
        Bus.$emit('receive', data)
      })
      // 出现错误的时候
      port.on('error', (error) => {
        console.log('error', error)
      })

      // 表示延迟去发送数据
      // setTimeout(() => {
      //   // 这个是变成了16进制的数据
      //   // 需要这个时候获取到数据 也要传递到那边
      //   // 发送的8位数字
      //   let str = 'FF010020000021'
      //   let stopStr = 'FF010000000001'
      //
      //   port.write(str + stopStr, 'hex', err => {
      //     console.log('err', err)
      //     if (err) {
      //       return console.log('write Error', err.message)
      //     } else {
      //       console.log('写入成功')
      //     }
      //   })
      // }, 2000)
    },
    closeSerialPort () {
      // 关闭为
      this.isDisabled = false
      // 同时需要将port的串口方法调用
      this.port.close(() => {
        // 关闭成功后调用
        this.setSerialPort(false)
      })
      // 开始设置串口的数据为空
    },
    openSerialPort (formName) {
      this.setSerialPort(true)
      // 表示打开成功 那么这些串口就需要disabled
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.setSerialPort(true)
          console.log('this.name', this.configForm.name)
          this.openSerialPortByPortName(this.configForm.name)
          this.isDisabled = true
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.serial-config {
}
</style>
