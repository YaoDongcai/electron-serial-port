<template>
    <div class="raspberry">
        <el-row :gutter="15">
            <el-col :span="8">
                <p class="raspberry-title">相机工作模式设置</p>
                <el-select @change="workTypeChange" class="raspberry-select" v-model="camera.workType" >
                    <el-option :key="index" v-for="(item, index) in workTypeList" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-col>
            <!--<el-col :span="8">-->
                <!--<p class="raspberry-title">相机曝光补偿量设置</p>-->
                <!--<el-select class="raspberry-select" v-model="camera.exposure" >-->
                    <!--<el-option :key="index" v-for="(item, index) in exposureList"  :value="item.value"> {{ item.label }}</el-option>-->
                <!--</el-select>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
                <!--<p class="raspberry-title">串口通信波特率设置</p>-->
                <!--<el-select class="raspberry-select" v-model="camera.baudRate" >-->
                    <!--<el-option :key="index" v-for="(item, index) in baudRateList" :label="item.label"  :value="item.value"></el-option>-->
                <!--</el-select>-->
            <!--</el-col>-->
        </el-row>
        <el-row :gutter="15">
            <el-col :span="8">
                <p class="raspberry-title">外接闪光灯选择</p>
                <el-select class="raspberry-select" v-model="camera.flashCode" >
                    <el-option :key="index" v-for="(item, index) in flashCodeList" :label="item.label"  :value="item.value"> </el-option>
                </el-select>
                <p class="raspberry-title">定时拍照</p>
                <div style="display: flex;">
                    <span><el-input v-model.number="camera.defineTime" placeholder="请输入"/></span>
                    <span>
                        <el-select class="raspberry-select"  v-model="camera.unit">
                        <el-option :key="index" v-for="(item, index) in defineTimeList" :label="item.label"  :value="item.value"></el-option>
                    </el-select>
                    </span>
                </div>
            </el-col>
            <el-col :span="4" >
                <p class="raspberry-btn">
                    <el-button size="mini" type="primary" @click="init">初始化</el-button>
                </p>
                <p class="raspberry-btn"><el-button @click="handleClick('on')" size="mini" type="primary">
                    开机</el-button></p>
                <p class="raspberry-btn"><el-button @click="handleClick('off')" size="mini" type="danger">
                    关机</el-button></p>
                <p class="raspberry-btn">
                    <el-button size="mini" type="primary" @mouseup.native="mouseUp()" @mousedown.native="mouseDown('focusAdd')" @click="handleClick('focusAdd')">
                        变焦+
                    </el-button>
                </p>
                <p class="raspberry-btn">
                    <el-button size="mini" type="primary" @mouseup.native="mouseUp()" @mousedown.native="mouseDown('focusSub')" @click="handleClick('focusSub')">
                        变焦-
                    </el-button>
                </p>
            </el-col>
            <el-col :span="8">
                <div class="button-group">
                    <div class="outter-circle">
                        <div class="inner-parts brown"  @click="handleClick('menuUp')">
                            <span class="rotate">上</span>
                        </div>
                        <div class="inner-parts primary"  @click="handleClick('menuRight')">
                            <span class="rotate">右</span>
                        </div>
                        <div class="inner-parts primary"  @click="handleClick('menuLeft')">
                            <p class="rotate">左</p>
                        </div>
                        <div class="inner-parts gold"  @click="handleClick('menuDown')">
                            <p class="rotate">下</p>
                        </div>
                        <div class="inner-circle" @click="handleClick('menuOn')">
                            <p class="ok rotate">菜单</p>
                        </div>
                    </div>
                </div>
                <el-button size="mini" type="primary" @click="handleClick('menuOk')">
                    确定
                </el-button>
            </el-col>
            <el-col :span="4">
                <p class="raspberry-btn"><el-button @click="handleClick('photo')" size="mini" type="primary">
                    手动拍照</el-button></p>
                <p class="raspberry-btn">
                    <el-button size="mini" type="primary" @click="handleClick('downloadStart')">
                        下载开始
                    </el-button>
                </p>
                <p class="raspberry-btn">
                    <el-button size="mini" type="primary" @click="handleClick('downloadEnd')">
                        下载结束
                    </el-button>
                </p>
                <p class="raspberry-btn">
                    <el-button size="mini" type="primary" @click="handleClick('audioStart')">
                        录像开始
                    </el-button>
                </p>
                <p class="raspberry-btn">
                    <el-button size="mini" type="primary" @click="handleClick('audioEnd')">
                        录像结束
                    </el-button>
                </p>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  const child = require('child_process')
  export default {
    name: 'raspberryPage', // 树莓派控制系统
    data () {
      return {
        timeHandle: null, // 设置定时的句柄
        url: 'http://192.168.43.131:7001/respberry', // 192.168.43.131
        commandCodeObj: {
          on: 'on', // 开机命令
          off: 'off', // 关机命令
          photo: 'photo', // 手动拍照
          menuOn: 'menuOn', // 菜单打开
          menuOff: 'menuOff', // 菜单关闭
          menuUp: 'menuUp', // 菜单上翻
          menuDown: 'menuDown', // 菜单下翻
          menuLeft: 'menuLeft', // 菜单左翻
          menuRight: 'menuRight', // 菜单右翻
          menuOk: 'menuOk', // 菜单确定
          focusSub: 'focusSub', // 变焦-
          focusAdd: 'focusAdd', // 变焦+
          downloadStart: 'downloadStart', // 数据下载开始
          downloadEnd: 'downloadEnd', // 数据下载结束
          audioStart: 'audioStart', // 录像开始
          audioEnd: 'audioEnd' // 录像结束
        },
        camera: {
          unit: 's',
          workType: 'autoModel',
          exposure: '', // 曝光补偿设置
          baudRate: '0x04', // 波特率设置
          flashCode: '0x01', // 闪光灯选择码
          defineTime: 10 // 定时拍照 只能是数字
        },
        defineTimeList: [
          {label: '秒', value: 's'},
          {label: '分', value: 'm'},
          {label: '时', value: 'h'}
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
          value: 'autoModel'
        }, {
          label: 'Av',
          value: 'avModel'
        }, {
          label: 'HDR(高反差景象)',
          value: 'hdrModel'
        }, {
          label: '人像',
          value: 'personImageModel'
        }, {
          label: 'C1',
          value: 'c1Model'
        }, {
          label: 'M(手动)',
          value: 'mModel'
        }, {
          label: 'Tv(快门优先)',
          value: 'tvModel'
        }, {
          label: '摄像',
          value: 'audioModel'
        }, {
          label: 'C2',
          value: 'c2Model'
        }, {
          label: 'P(程序控制)',
          value: 'pModel'
        }, {
          label: '混合(摄像和拍照)',
          value: 'mixinModel'
        }]
      }
    },
    methods: {
      mouseDown (type) {
        if (this.timeHandle) {
          clearInterval(this.timeHandle)
        }
        this.timeHandle = setInterval(() => {
          this.handleClick(type)
        }, 100) // 设置为100ms 就去发送以下请求
      },
      mouseUp () {
        if (this.timeHandle) {
          clearInterval(this.timeHandle)
        }
      },
      // 工作模式选择
      workTypeChange (value) {
        // 这个时候需要去发送数据
        this.$http
          .post(this.url + '/writePort', {
            send: value
          })
          .then((res) => {
            this.$message.success('发送成功')
            console.log('res', res)
          })
      },
      handleClick (type) {
        let message = ''
        message = this.commandCodeObj[type + '']
        console.log('message', message, 'type', type)
        this.$http
          .post(this.url + '/writePort', {
            send: message
          })
          .then((res) => {
            this.$message.success('发送成功')
            if (type === 'downloadStart') {
              setTimeout(() => {
                child.exec('explorer.exe "ftp://192.168.43.131"', function (err, sto) {
                  console.log('err', err, sto)
                })
              }, 1000) // 需要延时一秒来打开
            }
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
          loading.close()
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
            .then((res) => {
              this.$message.success('USB端口打开成功，开始读写数据')
            })
        // 开始初始化usb的接口 开始提交数据
        }).catch(() => {
          loading.close()
          this.$message.success('连接失败，请检查设备服务是否启动')
        })
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
        font-size: 14px;
        color: white;
        font-weight: 500;
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
        font-size: 14px;
        color: white;
        font-weight: 500;
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
