<template>
    <div class="raspberry">
        <el-row :gutter="15">
            <el-col :span="8">
                <p class="raspberry-title">相机工作模式设置</p>
                <el-select class="raspberry-select" v-model="camera.workType" >
                    <el-option :key="index" v-for="(item, index) in workTypeList" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-col>
            <el-col :span="8">
                <p class="raspberry-title">相机曝光补偿量设置</p>
                <el-select class="raspberry-select" v-model="camera.exposure" >
                    <el-option :key="index" v-for="(item, index) in exposureList"  :value="item.value"> {{ item.label }}</el-option>
                </el-select>
            </el-col>
            <el-col :span="8">
                <p class="raspberry-title">串口通信波特率设置</p>
                <el-select class="raspberry-select" v-model="camera.baudRate" >
                    <el-option :key="index" v-for="(item, index) in baudRateList" :label="item.label"  :value="item.value"></el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row :gutter="15">
            <el-col :span="8">
                <p class="raspberry-title">外接闪光灯选择</p>
                <el-select class="raspberry-select" v-model="camera.flashCode" >
                    <el-option :key="index" v-for="(item, index) in flashCodeList" :label="item.label"  :value="item.value"> </el-option>
                </el-select>
                <p class="raspberry-title">定时拍照</p>
                <el-select class="raspberry-select" v-model="camera.defineTime" >
                    <el-option :key="index" v-for="(item, index) in defineTimeList" :label="item.label"  :value="item.value"></el-option>
                </el-select>
            </el-col>
            <el-col :span="4" >
                <p class="raspberry-btn">
                    <el-button size="mini" type="primary" @click="init">初始化</el-button>
                </p>
                <p class="raspberry-btn"><el-button @click="handleClickOn" size="mini" type="primary">
                    <svg t="1591102827278" fill="rgb(255,255,255)" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5890" width="16" height="16"><path d="M722.474667 246.485333c-13.226667-8.362667-39.125333-21.248-39.125334-41.642666s18.986667-29.013333 39.125334-20.010667C851.072 251.861333 938.666667 385.152 938.666667 538.666667 938.666667 759.594667 757.205333 938.666667 533.333333 938.666667S128 759.594667 128 538.666667c0-153.514667 87.594667-286.805333 216.192-353.877334 20.138667-8.96 39.125333-0.341333 39.125333 20.053334s-25.685333 32.554667-39.125333 41.514666v2.261334C251.690667 310.528 192.853333 417.28 192.853333 538.666667c0 191.445333 146.474667 336.810667 340.48 336.810666 194.005333 0 340.48-145.365333 340.48-336.810666 0-121.344-58.837333-228.138667-151.338666-290.048v-2.133334zM533.333333 85.333333c14.933333 0 27.008 12.117333 27.008 27.008v388.437334a27.008 27.008 0 1 1-54.016 0V112.341333c0-14.933333 12.074667-27.008 27.008-27.008z" p-id="5891"></path></svg>
                    开机</el-button></p>
                <p class="raspberry-btn"><el-button size="mini" type="danger">
                    <svg t="1591102972090" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6635" width="16" height="16"><path d="M512 512c-35.2 0-64-28.8-64-64V128c0-35.2 28.8-64 64-64s64 28.8 64 64v320c0 35.2-28.8 64-64 64z" fill="#D93934" p-id="6636"></path><path d="M700.8 182.4c-16 25.6-9.6 60.8 16 80 86.4 70.4 134.4 182.4 112 304-22.4 128-124.8 233.6-252.8 259.2C371.2 864 192 707.2 192 512c0-99.2 44.8-188.8 118.4-246.4 22.4-19.2 28.8-54.4 12.8-80-19.2-35.2-67.2-41.6-96-16-112 92.8-179.2 240-160 400C89.6 768 256 934.4 460.8 956.8 729.6 988.8 960 774.4 960 512c0-140.8-64-265.6-163.2-345.6-32-25.6-76.8-16-96 16z" fill="#D93934" p-id="6637"></path></svg>
                    关机</el-button></p>
                <p class="raspberry-btn"><el-button  size="mini" type="primary">
                    <svg t="1591103030966" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7465" width="16" height="16"><path d="M887.296 315.904h-153.6c-51.2 0-68.096-102.4-119.296-102.4H392.704c-34.304 0-51.2 102.4-102.4 102.4h-153.6c-29.696 0-51.2 21.504-51.2 51.2v439.296c0 25.6 21.504 47.104 51.2 47.104h751.104c29.696 0 51.2-21.504 51.2-51.2v-435.2c-0.512-30.208-21.504-51.2-51.712-51.2zM512 768c-115.2 0-204.8-89.6-204.8-200.704s89.6-200.704 204.8-200.704 204.8 89.6 204.8 200.704-93.696 200.704-204.8 200.704z m247.296-354.304c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6 25.6 12.8 25.6 25.6c0 17.408-12.8 25.6-25.6 25.6zM256 264.704c0-8.704-8.704-16.896-16.896-16.896h-51.2c-8.704 0-16.896 8.704-16.896 16.896V281.6H256v-16.896z m256 148.992c-85.504 0-153.6 68.096-153.6 153.6s68.096 153.6 153.6 153.6 153.6-68.096 153.6-153.6-68.096-153.6-153.6-153.6z" fill="#007AFF" p-id="7466"></path></svg>
                    手动拍照</el-button></p>
            </el-col>
            <el-col :span="12">
                <div class="button-group">
                    <div class="outter-circle">
                        <div class="inner-parts brown"  @click="handleClick('UP')">
                            <span class="rotate">上</span>
                        </div>
                        <div class="inner-parts primary"  @click="handleClick('RIGHT')">
                            <span class="rotate">右</span>
                        </div>
                        <div class="inner-parts primary"  @click="handleClick('LEFT')">
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
        </el-row>
    </div>
</template>

<script>
  const child = require('child_process');
  export default {
    name: 'raspberryPage', // 树莓派控制系统
    data () {
      return {
        url: 'http://localhost:7001/respberry', // 192.168.43.131
        camera: {
          workType: '0x0a',
          exposure: '', // 曝光补偿设置
          baudRate: '0x04', // 波特率设置
          flashCode: '0x01', // 闪光灯选择码
          defineTime: '0x01' // 定时拍照
        },
        defineTimeList: [
          {label: '3~255秒', value: '0x01'},
          {label: '1~255分', value: '0x02'},
          {label: '1~255时', value: '0x03'}
        ],
        flashCodeList: [
          {label: '外部热靴闪光灯1', value: '0x01'},
          {label: '外部热靴闪光灯2', value: '0x02'}
        ],
        baudRateList: [
          {
            value: '0x01',
            label: '1200'
          }, {
            value: '0x02',
            label: '2400'
          }, {
            value: '0x03',
            label: '4800'
          }, {
            value: '0x04',
            label: '9600' // 默认
          }, {
            value: '0x05',
            label: '14400'
          }, {
            value: '0x06',
            label: '19200'
          }, {
            value: '0x07',
            label: '38400'
          }, {
            value: '0x08',
            label: '56000'
          }, {
            value: '0x09',
            label: '115200'
          }, {
            value: '0x0a',
            label: '128000'
          }, {
            value: '0x0b',
            label: '256000'
          }
        ],
        exposureList: [
          {
            label: 'Av',
            value: '0x02'
          }
        ],
        workTypeList: [{
          label: 'AUTO(自动)',
          value: '0x01'
        }, {
          label: 'Av',
          value: '0x02'
        }, {
          label: 'HDR(高反差景象)',
          value: '0x03'
        }, {
          label: '人像',
          value: '0x04'
        }, {
          label: 'C1',
          value: '0x05'
        }, {
          label: 'M(手动)',
          value: '0x06'
        }, {
          label: 'Tv(快门优先)',
          value: '0x07'
        }, {
          label: '摄像',
          value: '0x08'
        }, {
          label: 'C2',
          value: '0x09'
        }, {
          label: 'P(程序控制)',
          value: '0x0a'
        }, {
          label: '混合(摄像和拍照)',
          value: '0x0b'
        }]
      }
    },
    methods: {
      handleClickOn () {
        child.exec('explorer.exe "ftp://192.168.43.131"', function(err, sto) {
          console.log('err', err, sto)
        })
      },
      // 测试是否已经连接树莓派了 或者树莓派是否开始启动成功了
      async init () {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        // 随便发一个请求去请求树莓派地址 然后看有没有响应即可
        this.$http.get(this.url + '/serialPortList').then(res => {
          // 获取了所有的数据
          loading.close();
          this.$message.success('连接成功，初始化接口数据')
          const list = res.data.list.filter(item => {
            return !!item.hasOwnProperty('vendorId')
          })
          // 当前的接口就是为list[0].path
          const portName = list[0].path
          portName &&
          this.$http
            .post(this.url + '/openPortByName', {
              portName: portName
            })
            .then(function (res) {
              this.$message.success('USB端口打开成功，开始读写数据')
            })
        // 开始初始化usb的接口 开始提交数据
        }).catch(error => {
          console.log('error', error)
        })
      },
      handleClick (type) {
      //   对于不同的ajax 来发送不同的数据
      }
    }
  }
</script>

<style lang="scss" scoped>
    .button-group {
        padding-top: 20px;
        width: 150px;
        height: 150px;
        /*background-color: pink;*/
    }
    .outter-circle {
        position: relative;
        margin-left: 10px;
        width: 140px;
        height: 140px;
        background-color: lightcyan;
        border-radius: 100%;
        overflow: hidden;
        transform-origin: center;
        transform: rotate(45deg);
        cursor: pointer;
    }
    .inner-parts {
        float: left;
        width: 70px;
        height: 70px;
        line-height: 70px;
        text-align: center;
    }
    .silver {
        background-color: silver;
    }
    .primary {
        background-color: #409EFF;
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
        margin-top: 35px;
        margin-left: 35px;
        width: 70px;
        height: 70px;
        line-height: 70px;
        text-align: center;
        border-radius: 100%;
        background-color: lightblue;
    }
    .rotate {
        display: inline-block;
        transform: rotate(-45deg);
    }
// 树莓派的样式
.raspberry {
     &-title {
         font-size: 16px;
         font-weight: 400;
     }
    &-select {
        width: 100%;
    }
    &-btn {
        margin-top: 10px;
        margin-left: 15px;
    }
}
</style>
