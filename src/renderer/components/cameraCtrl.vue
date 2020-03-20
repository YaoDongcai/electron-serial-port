<template>
    <div class="camera-ctrl">
        <el-row>
            <!-- 等分布局 -->
            <el-col :span="12">
                <div class="button-group">
                    <div class="outter-circle">
                        <div class="inner-parts brown" @click="handleClick('UP')">
                            <span class="rotate">上</span>
                        </div>
                        <div class="inner-parts silver" @click="handleClick('RIGHT')">
                            <span class="rotate">右</span>
                        </div>
                        <div class="inner-parts blue" @click="handleClick('LEFT')">
                            <p class="rotate">左</p>
                        </div>
                        <div class="inner-parts gold" @click="handleClick('DOWN')">
                            <p class="rotate">下</p>
                        </div>
                        <div class="inner-circle" @click="handleClick('MENU')">
                            <p class="ok rotate">菜单</p>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="24">
                        <el-button size="mini" type="success" @click="handleClick('ZOOMPlUS')">
                            放大+
                        </el-button>
                        <el-button size="mini" type="success" @click="handleClick('ZOOMSUB')">
                            放小-
                        </el-button>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 15px;">
                    <el-col :span="24">
                        <el-button size="mini" type="success" @click="handleClick('FOCUSPLUS')">
                            调焦+
                        </el-button>
                        <el-button size="mini" type="success" @click="handleClick('FOCUSSUB')">
                            调焦-
                        </el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import Bus from '../utils/bus.js'
  export default {
    name: 'cameraCtrl', // 摄像头控制命令
    data () {
      return {
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
    methods: {
      // 点击事件触发发送数据
      handleClick (type) {
        let message = '' // 暂时为空的数据
        message = this.sendData[type + '']
        // 获取数据后需要把这个信息发送数据 同时需要延时发送停止位
        Bus.$emit('sendData', message) // 过20ms 发送停止位
        setTimeout(() => {
          Bus.$emit('sendData', this.sendData.STOP)
        }, 20)
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
