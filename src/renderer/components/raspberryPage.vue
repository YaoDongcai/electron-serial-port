<template>
    <div class="index">
        <el-row>
            <el-col :span="8">
                相机工作模式设置
                <el-select v-model="camera.workType" >
                    <el-option v-for="item in workTypeList"  :value="item.value"> {{ item.label }}</el-option>
                </el-select>
            </el-col>
            <el-col :span="8">
                相机曝光补偿量设置
                <el-select v-model="camera.exposure" >
                    <el-option v-for="item in exposureList"  :value="item.value"> {{ item.label }}</el-option>
                </el-select>
            </el-col>
            <el-col :span="8">
                串口通信波特率设置
                <el-select v-model="camera.baudRate" >
                    <el-option v-for="item in baudRateList"  :value="item.value"> {{ item.label }}</el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                外接闪光灯选择
                定时拍照

                数据下载
            </el-col>
            <el-col :span="8">
                开机
                关机
                手动拍照
            </el-col>
            <el-col :span="8">
                外接闪光灯选择
            </el-col>
        </el-row>
    </div>
</template>

<script>
  export default {
    name: 'raspberryPage', // 树莓派控制系统
    data () {
      return {
        camera: {
          workType: '0x0a',
          exposure: '', // 曝光补偿设置
          baudRate: '9600', //波特率设置
        },
        baudRateList: [
          {
            label: '0x01',
            value: '1200'
          }, {
            label: '0x02',
            value: '2400'
          }, {
            label: '0x03',
            value: '4800'
          }, {
            label: '0x04',
            value: '9600' // 默认
          }, {
            label: '0x05',
            value: '14400'
          }, {
            label: '0x06',
            value: '19200'
          }, {
            label: '0x07',
            value: '38400'
          }, {
            label: '0x08',
            value: '56000'
          }, {
            label: '0x09',
            value: '115200'
          }, {
            label: '0x0a',
            value: '128000'
          }, {
            label: '0x0b',
            value: '256000'
          }
        ],
        exposureList: [
          {
            label: 'Av',
            value: '0X02'
          }
        ],
        workTypeList: [{
          label: 'AUTO(自动)',
          value: '0X01'
        }, {
          label: 'Av',
          value: '0X02'
        }, {
          label: 'HDR(高反差景象)',
          value: '0X03'
        }, {
          label: '人像',
          value: '0X04'
        }, {
          label: 'C1',
          value: '0X05'
        }, {
          label: 'M(手动)',
          value: '0X06'
        }, {
          label: 'Tv(快门优先)',
          value: '0X07'
        }, {
          label: '摄像',
          value: '0X08'
        }, {
          label: 'C2',
          value: '0X09'
        }, {
          label: 'P(程序控制)',
          value: '0X0a'
        }, {
          label: '混合(摄像和拍照)',
          value: '0X0b'
        }]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
