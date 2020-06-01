<template>
    <div class="camera-ctrl">
        <el-row>
            <!-- 等分布局 -->
            <el-col :span="12">
                <div class="button-group">
                    <div class="outter-circle">
                        <div class="inner-parts brown"  @click="handleClick('UP')">
                            <span class="rotate">上</span>
                        </div>
                        <div class="inner-parts silver"  @click="handleClick('RIGHT')">
                            <span class="rotate">右</span>
                        </div>
                        <div class="inner-parts blue"  @click="handleClick('LEFT')">
                            <p class="rotate">左</p>
                        </div>
                        <div class="inner-parts gold"  @click="handleClick('DOWN')">
                            <p class="rotate">下</p>
                        </div>
                        <div class="inner-circle" @click="handleClick('MENU')">
                            <p class="ok rotate">菜单</p>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="12" >
                <el-row>
                    <el-col :span="24" style="text-align: right;">
                        <el-button size="mini" type="success" @mouseup.native="mouseUp()" @mousedown.native="mouseDown('ZOOMPlUS')" @click="handleClick('ZOOMPlUS')">
                            放大+
                        </el-button>
                        <el-button size="mini" type="success" @mouseup.native="mouseUp()" @mousedown.native="mouseDown('ZOOMSUB')" @click="handleClick('ZOOMSUB')">
                            放小-
                        </el-button>
                    </el-col>
                    <el-col :span="24" style="margin-top: 15px;text-align: right;">
                        <el-button size="mini" type="success"  @click="handleClick('FOCUSPLUS')">
                            调焦+
                        </el-button>
                        <el-button  size="mini" type="success"  @click="handleClick('FOCUSSUB')">
                            调焦-
                        </el-button>
                    </el-col>
                    <el-col :span="24" style="margin-top: 15px;text-align: right;">
                        <span>延时选择</span>
                        <el-select v-model="delayTime">
                            <el-option label="20毫秒" value="20">

                            </el-option>
                            <el-option label="30毫秒" value="30">

                            </el-option>
                            <el-option label="40毫秒" value="40">

                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row >

                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import Bus from '../utils/bus.js'
  import { mapState } from 'vuex'
  export default {
    name: 'cameraCtrl', // 摄像头控制命令
    data () {
      return {
        timeHandle: null, // 定时器对象
        delayTime: '20', // 表示默认值20ms
        isMouseDown: false, // 如果鼠标不是在长按 那么就不需要停止了
        // 当前发送的数据类型
        sendData: {
          'UP': 'FF010008001019', // 向上数据
          'RIGHT': 'FF010002100013', // 右边数据
          'LEFT': 'FF010004100015', // 左边数据
          'DOWN': 'FF010010001021',
          'MENU': 'FF010007005F67', // 菜单数据
          'STOP': 'FF010000000001', // 停止位数据
          'ZOOMPlUS': 'FF010020000021', // zoom加数据
          'ZOOMSUB': 'FF010040000041', // zoom减数据
          'FOCUSPLUS': 'FF010080000081', // focus加数据
          'FOCUSSUB': 'FF010100000002' // focus减数据
        }
      }
    },
    computed: {
      ...mapState({
        isOpenSerialPort: state => state.SerialPort.isOpenSerialPort
      })
    },
    methods: {
      // 停止长按
      mouseUp () {
        // 取消这个time
        if (this.timeHandle) {
          clearInterval(this.timeHandle)
        }
        // 发送一下停止位
        this.isMouseDown = false
        setTimeout(() => {
          Bus.$emit('sendData', {
            'sendType': 'hex', // 表示为16进制
            'value': this.sendData.STOP // 表示为发送的值
          })
        }, this.delayTime)
      },
      // 长按检测
      mouseDown (type) {
        if (this.timeHandle) {
          clearInterval(this.timeHandle)
        }
        this.timeHandle = setInterval(() => {
          this.isMouseDown = true
          this.handleClick(type)
        }, 100) // 设置为100ms 就去发送以下请求
      },
      // 点击事件触发发送数据
      handleClick (type) {
        // if (this.timeHandle) {
        //   clearInterval(this.timeHandle)
        // }
        // 先检测串口是否打开 如果没有打开 那么提醒用户去打开串口
        if (!this.isOpenSerialPort) {
          // 提醒用户
          this.$message.warning('请打开串口')
          return
        }
        let message = '' // 暂时为空的数据
        message = this.sendData[type + '']
        // 获取数据后需要把这个信息发送数据 同时需要延时发送停止位
        Bus.$emit('sendData', {
          'sendType': 'hex', // 表示为16进制
          'value': message // 表示为发送的值
        }) // 过20ms 发送停止位
        if (!this.isMouseDown) {
          setTimeout(() => {
            Bus.$emit('sendData', {
              'sendType': 'hex', // 表示为16进制
              'value': this.sendData.STOP // 表示为发送的值
            })
          }, this.delayTime)
        }
      }
    }
  }
</script>
<style lang="scss">
    .button-group {
        padding-top: 20px;
        width: 300px;
        height: 300px;
        /*background-color: pink;*/
    }
    .outter-circle {
        position: relative;
        margin-left: 10px;
        width: 280px;
        height: 280px;
        background-color: lightcyan;
        border-radius: 100%;
        overflow: hidden;
        transform-origin: center;
        transform: rotate(45deg);
        cursor: pointer;
    }
    .inner-parts {
        float: left;
        width: 140px;
        height: 140px;
        line-height: 140px;
        text-align: center;
    }
    .silver {
        background-color: silver;
    }
    .gold {
        background-color: gold;
    }
    .blue {
        background-color: silver;
    }
    .brown {
        background-color: gold;
    }
    .inner-circle {
        position: absolute;
        margin-top: 70px;
        margin-left: 70px;
        width: 140px;
        height: 140px;
        line-height: 140px;
        text-align: center;
        border-radius: 100%;
        background-color: lightblue;
    }
    .rotate {
        display: inline-block;
        transform: rotate(-45deg);
    }
</style>
