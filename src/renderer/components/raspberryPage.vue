<template>
    <div class="raspberry">
        <!-- 相机控制界面界面 -->
        <div class="raspberry-camera">
            <label class="raspberry-camera-title">相机控制</label>
            <div class="raspberry-camera-item">
                <!-- 开机 和关机 -->
                <p class="raspberry-btn"><el-button icon="el-icon-open" @click="handleClick('on')" size="mini" type="primary">
                    开机</el-button></p>
                <p class="raspberry-btn"><el-button icon="el-icon-turn-off" @click="handleClick('off')" size="mini" type="danger">
                    关机</el-button></p>
            </div>
            <div class="raspberry-camera-item">
                <!-- 手动拍照 -->
                <el-button style="width: 100%;" @click="handleClick('photo')" size="mini" type="primary">
                    手动拍照</el-button>
            </div>

            <div class="raspberry-camera-item">
                <!-- 自动拍照 -->
                <label class="raspberry-camera-item-label">自动拍照间隔</label>
                <span style="width: 60px;">
                    <el-input  v-model.number="camera.defineTime" placeholder="请输入"/>
                </span>
                <span style="width: 70px;">
                    <el-select   v-model="camera.unit">
                        <el-option :key="index" v-for="(item, index) in defineTimeList" :label="item.label"  :value="item.value"></el-option>
                    </el-select>
                </span>
            </div>
            <div class="raspberry-camera-item">
                <!-- 自动拍照 -->
                <label class="raspberry-camera-item-label">相机模式</label>
                <span style="width: 100px;">
                    <el-select   v-model="camera.workType">
                        <el-option :key="index" v-for="(item, index) in workTypeList" :label="item.label"  :value="item.value"></el-option>
                    </el-select>
                </span>
                <span>
                    <el-button @click="setModel" type="primary" size="mini">确定</el-button>
                </span>
            </div>
            <div class="raspberry-camera-item">
                <!-- 开机 和关机 -->
                <p class="raspberry-btn"><el-button  icon="el-icon-timer" @click="setTimeHandle('on')" size="mini" type="primary">
                    定时拍照</el-button></p>
                <p class="raspberry-btn"><el-button icon="el-icon-unlock" @click="setTimeHandle('off')" size="mini" type="danger">
                    停止拍照</el-button></p>
            </div>
            <div class="raspberry-camera-item">
                <!-- 开机 和关机 -->
                <p class="raspberry-btn"><el-button icon="el-icon-timer" @click="handleClick('audioStart')" size="mini" type="primary">
                    录像开始</el-button></p>
                <p class="raspberry-btn"><el-button icon="el-icon-unlock" @click="handleClick('audioEnd')" size="mini" type="danger">
                    录像结束</el-button></p>
            </div>
            <div class="raspberry-camera-item">
                <p class="raspberry-btn">
                    <el-button :disabled="versionDisabled" icon="el-icon-zoom-in" size="mini" type="primary" @mouseup.native="mouseUp()" @mousedown.native="mouseDown('focusAdd')" @click="handleClick('focusAdd')">
                        变焦+
                    </el-button>
                </p>
                <p class="raspberry-btn">
                    <el-button :disabled="versionDisabled" icon="el-icon-zoom-out" size="mini" type="primary" @mouseup.native="mouseUp()" @mousedown.native="mouseDown('focusSub')" @click="handleClick('focusSub')">
                        变焦-
                    </el-button>
                </p>
            </div>
        </div>
        <!-- 这个是设置页面-->
        <div class="raspberry-set">
            <label class="raspberry-set-title">相机设置</label>
            <div class="raspberry-set-item">
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
            </div>
            <div class="raspberry-set-item" style="margin-top: 30px;">
                <el-button style="width: 100%;" size="mini" type="primary" @click="handleClick('menuOk')">
                    菜单确定
                </el-button>
            </div>
            <div class="raspberry-set-subtitle">
                日志显示
            </div>
            <ul class="raspberry-set-logs-ul">
                <li class="logs-li" v-for="item in logs">
                    <p :class="item.type"> {{ item.content }}</p>
                </li>
            </ul>
        </div>

        <div class="raspberry-col">
            <div class="raspberry-controller">
                <label class="raspberry-controller-title">数据控制</label>
                <div class="raspberry-controller-item">
                    <el-button  icon="el-icon-download" style="width: 100%;" @click="handleDownloadStartClick()" size="mini" type="primary">
                        下载开始</el-button>
                </div>
                <div class="raspberry-controller-item">
                    <el-button icon="el-icon-close" style="width: 100%;" @click="handleDownloadEndClick()" size="mini" type="primary">
                        下载结束</el-button>
                </div>
                <div class="raspberry-controller-item">
                    <el-button icon="el-icon-close" style="width: 100%;" @click="handleExportClick()" size="mini" type="primary">
                        导出数据(excel)</el-button>
                </div>
                <div class="raspberry-controller-item">
                    <el-button icon="el-icon-close" style="width: 100%;" @click="handleCleanClick()" size="mini" type="primary">
                        清空数据库</el-button>
                </div>
            </div>

            <div class="raspberry-controller" style="margin-top: 10px;">
                <label class="raspberry-controller-title">网络控制</label>
                <!-- IP 显示 -->

                <!--<div class="raspberry-controller-item">-->
                    <!--<el-button :loading="initLoading" icon="el-icon-switch-button" style="width: 100%;" size="mini" type="success" @click="init">连接相机</el-button>-->
                <!--</div>-->
                <div class="raspberry-controller-item">
                    <label class="raspberry-controller-item-label">相机选择</label>
                    <span style="width: 100px;">
                    <el-select @change="versionChangeEvent"  v-model="camera.versions">
                        <el-option :key="index" v-for="(item, index) in versionsList" :label="item.label"  :value="item.value"></el-option>
                    </el-select>
                    </span>
                    <span>
                    <el-button @click="init" type="primary" size="mini">连接相机</el-button>
                    </span>
                    <!-- 版本切换 -->
                    <!-- 低配版本的配置级别和高配版本是不一样的 -->
                    <!--<label class="raspberry-controller-item-label">版本切换</label>-->
                    <!--<span style="width: 100px;">-->
                    <!--<el-select   v-model="camera.versionType">-->
                        <!--<el-option :key="index" v-for="(item, index) in versionList" :label="item.label"  :value="item.value"></el-option>-->
                    <!--</el-select>-->
                    <!--</span>-->
                    <!--<span>-->
                    <!--<el-button @click="choiseVersion" type="primary" size="mini">确定</el-button>-->
                    <!--</span>-->
                </div>
                <!--<label class="raspberry-controller-title">串口连接</label>-->
            </div>
        </div>
        <div class="raspberry-col">
            <div class="raspberry-controller">
                <label class="raspberry-controller-title">串口控制</label>
                <serial-config></serial-config>
            </div>
        </div>

        <!--<el-row :gutter="15">-->
            <!--<el-col :span="8">-->
                <!--<p class="raspberry-title">相机工作模式设置</p>-->
                <!--<el-select @change="workTypeChange" class="raspberry-select" v-model="camera.workType" >-->
                    <!--<el-option :key="index" v-for="(item, index) in workTypeList" :label="item.label" :value="item.value"></el-option>-->
                <!--</el-select>-->
            <!--</el-col>-->
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
        <!--</el-row>-->

        <!--<el-row :gutter="15">-->
            <!--<el-col :span="8">-->
                <!--<p class="raspberry-title">外接闪光灯选择</p>-->
                <!--<el-select class="raspberry-select" v-model="camera.flashCode" >-->
                    <!--<el-option :key="index" v-for="(item, index) in flashCodeList" :label="item.label"  :value="item.value"> </el-option>-->
                <!--</el-select>-->
            <!--</el-col>-->

            <!--<el-col :span="4">-->
                <!--<p class="raspberry-btn">-->
                    <!--<el-button size="mini" type="primary" @click="showSetIP()">-->
                        <!--设置IP-->
                    <!--</el-button>-->
                <!--</p>-->
                <!--<p class="raspberry-btn"><el-button @click="handle2Click('SDToggleOn')" size="mini" type="primary">-->
                    <!--SD卡通电</el-button></p>-->
                <!--<p class="raspberry-btn"><el-button @click="handle2Click('SDOn')" size="mini" type="primary">-->
                    <!--USB通电</el-button></p>-->
            <!--</el-col>-->
        <!--</el-row>-->
        <el-dialog title="IP设置" :visible.sync="dialogVisible">
            <div class="ip-ul" :key="index" v-for="(IpItem, index) in lists">
                <label class="ip-ul-label">{{ IpItem.label }}</label>
                <div class="ip-ul-li" :key="index2" v-for="(item, index2) in IpItem.list">
                    <el-input size="mini" @input="inputKeyUp" v-model="item.ip" />
                    <span v-if="index2 != (IpItem.list.length-1)">.</span>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleClickBySubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import Bus from '../utils/bus.js'
  import { mapState } from 'vuex'
  import utils from '../utils/Excel'
  import SerialConfig from './serialConfig'
  const child = require('child_process')
  const uatCommandCodeObj = {
    'on': 'AA7511020000CC', // 开机
    'off': 'AA7522020000FF', // 关机
    'photo': 'AA7533020000EE', // 手动拍照
    'menuOn': 'AA7577020000AA',
    'menuOff': 'AA758802000055',
    'menuUp': 'AA759902000044',
    'menuDown': 'AA75AA02000077',
    'menuLeft': 'AA75BB02000066',
    'menuRight': 'AA75CC02000011',
    'menuOk': 'AA75DD02000000',
    'P': 'AA7555020a0082',
    'AUTO': 'AA755502010089',
    'TV': 'AA75550202008A',
    'AV': 'AA75550207008F'
  }
export default {
    name: 'raspberryPage', // 树莓派控制系统
    components: {
      SerialConfig
    },
    computed: {
      ...mapState({
        isOpenSerialPort: state => state.SerialPort.isOpenSerialPort
      })
    },
    data () {
      return {
        versionsList: [{
          label: '1200万像素', // G16
          value: '1'
        }, {
          label: '2000万像素',// G5x
          value: '2'
        }],
        logs: [], // 日志显示数组行列
        initLoading: false,
        versionDisabled: true, // 默认低版本是不能操作的
        timePhotoHandle: null, // 定时拍照句柄
        isSetTime: false, // 是否勾选为定时拍照
        lists: [{
          label: 'IP地址',
          list: [{
            ip: ''
          }, {
            ip: ''
          }, {
            ip: ''
          }, {
            ip: ''
          }]
        }, {
          label: 'DNS地址',
          list: [{
            ip: ''
          }, {
            ip: ''
          }, {
            ip: ''
          }, {
            ip: ''
          }]
        }, {
          label: '子网掩码',
          list: [{
            ip: ''
          }, {
            ip: ''
          }, {
            ip: ''
          }, {
            ip: ''
          }]
        }],
        name: '',
        dialogVisible: false,
        timeHandle: null, // 设置定时的句柄
        url: 'http://192.168.0.10:7001/respberry', // 192.168.0.10 192.168.43.131
        commandCodeObj: {
          SDToggleOn: 'SDToggleOn',
          SDToggleOff: 'SDToggleOff',
          SDOn: 'SDOn',
          SDOff: 'SDOff',
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
          versions: '1',
          unit: 's',
          workType: 'P',
          isSetTime: false, // 默认为false
          versionType: 'LOW', // 低版本
          exposure: '', // 曝光补偿设置
          baudRate: '0x04', // 波特率设置
          flashCode: '0x01', // 闪光灯选择码
          defineTime: 7 // 定时拍照 只能是数字 默认为7秒
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
        versionList: [{
          label: '前期版本',
          value: 'LOW'
        }, {
          label: '通用版本',
          value: 'HIGH'
        }],
        workTypeList: [{
          label: 'P(程序控制)',
          value: 'P'
        }, {
          label: 'AV模式',
          value: 'AV'
        }, {
          label: 'Tv模式',
          value: 'TV'
        }, {
          label: 'AUTO模式',
          value: 'AUTO'
        }]
      }
    },
    methods: {
      versionChangeEvent (value) {
        if (value == '2') {
          this.workTypeList = [{
            label: 'P(程序控制)',
            value: 'P'
          }, {
            label: 'AV模式',
            value: 'AV'
          }, {
            label: 'Tv模式',
            value: 'TV'
          }, {
            label: 'AUTO模式',
            value: 'AUTO'
          }, {
            label: '混合模式',
            value: 'MIX'
          }, {
            label: '摄像模式',
            value: 'VIDEO'
          }]
        } else {
          this.workTypeList = [{
            label: 'P(程序控制)',
            value: 'P'
          }, {
            label: 'AV模式',
            value: 'AV'
          }, {
            label: 'Tv模式',
            value: 'TV'
          }, {
            label: 'AUTO模式',
            value: 'AUTO'
          }]
        }
      },
      handleCleanClick () {
        // 清空数据
        this.$http.get(this.url + '/clearDB').then((res) => {
          const count = res.data.data
          this.logs.unshift({
            type: 'success',
            content: `清空${count}数据成功`
          })
        })
      },
      handleExportClick () {
        // 第一步先要获取数据
        // 先打开弹出框子
        const { dialog } = require('electron').remote
        const that = this
        this.$http
          .get(this.url + '/exportData')
          .then((res) => {
            const title = [['拍照日期', '序号']]
            const body = []
            const result = res.data.data.sort(function(a, b) {
              return a.index - b.index < 0
            })
            result.map(item => {
              if (item.time) {
                body.push([item.time, item.index])
              } else {
                body.push(['', item.index])
              }
            })
            if(body.length ==0 ) {
              this.logs.unshift({
                type: 'success',
                content: '当前数据为空'
              })
              return;
            }
            dialog.showSaveDialog({
              title: '保存文件Excel',
              defaultPath: '/',
              filters: [{
                name: 'Excel',
                extensions: ['csv']
              }]
            }, function (fileName) {
              utils.exportFromArray({
                title,
                body,
                name: '表格',
                suffix: 'csv',
                merges: [
                  { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
                  { s: { r: 0, c: 1 }, e: { r: 0, c: 2 } },
                  { s: { r: 0, c: 3 }, e: { r: 0, c: 4 } },
                  { s: { r: 0, c: 5 }, e: { r: 1, c: 5 } }
                ]
              }, fileName)
              that.logs.unshift({
                type: 'success',
                content: '数据库导出数据成功'
              })
            })
          })
      },
      // 模式识别
      choiseVersion () {
        // 获取当前的参数
        const type = this.camera.versionType
        console.log('type', type)
        switch (type) {
          case 'LOW':
            // 表示这个是低版本
            this.versionDisabled = true
            break
          case 'HIGH':
            // 表示这个是高版本
            this.versionDisabled = false
            break
        }
      },
      setTimeHandle (type) {
        if (type === 'on') {
          this.isSetTime = true
        } else {
          this.isSetTime = false
        }
        if (!this.isSetTime) {
          // 如果是勾选了 取消定时器
          // 如果当前已经是定时拍照 那么就不需要再去调用了
          if (this.isOpenSerialPort) {
            Bus.$emit('sendData', {
              'sendType': 'hex', // 表示为16进制
              'value': 'AA756602000000' //  对应的值即可// 表示为发送的值
            })
            return
          }
          this.$http
            .post(this.url + '/GPIOControllerIntertime', {
              send: 'noPhoto'
            })
            .then((res) => {
              this.logs.unshift({
                type: 'success',
                content: '取消成功'
              })
            })
        } else {
          let time = null
          let uatUnit = '', intHex = ''
          intHex = (this.camera.defineTime).toString(16)
          if (intHex.length == 1) {
            intHex = '0' + '' + intHex
          }
          switch (this.camera.unit) {
            case 's':
              time = parseInt(this.camera.defineTime * 1000)
              uatUnit = '01'
              break
            case 'm':
              time = parseInt(this.camera.defineTime * 1000 * 60)
              uatUnit = '02'
              break
            case 'h':
              time = parseInt(this.camera.defineTime * 1000 * 60 * 60)
              uatUnit = '03'
              break
          }
          // 发送对应的指令 表示为端口其实为打开的
          if (this.isOpenSerialPort) {
            Bus.$emit('sendData', {
              'sendType': 'hex', // 表示为16进制
              'value': 'AA754402' + intHex + uatUnit + '20' //  对应的值即可// 表示为发送的值
            })
            this.logs.unshift({
              type: 'success',
              content: '定时拍照设置成功'
            })
            return
          }
          this.$http
            .post(this.url + '/GPIOControllerIntertime', {
              send: 'photo',
              defineTime: this.camera.defineTime,
              unit: this.camera.unit,
              timeOut: time
            })
            .then((res) => {
              this.logs.unshift({
                type: 'success',
                content: '定时拍照设置成功'
              })
            })
        }
      },
      inputKeyUp (value) {
        value = value.replace(/[^\d]/g, '')
        console.log(typeof (value), value)
        if (Number.isInteger(value)) {
          // 如果是一个数字 那么就需要判断当前的值需要为0~255之间的值
          console.log(Number.isInteger(value), value)
          if (value < 0) {
            this.logs.unshift({
              type: 'error',
              content: '当前的值小于0,请重新输入'
            })
          }
          if (value > 255) {
            this.logs.unshift({
              type: 'error',
              content: '当前的值大于255,请重新输入'
            })
          }
        }
      },
      handleClickBySubmit () {
        this.dialogVisible = false
      },
      // 设置IP 地址
      showSetIP () {
        // 此时先要获取树莓派的ip地址
        this.dialogVisible = true
        this.$http
          .get(this.url + '/getIP').then(res => {
            // 成功后的回调数据
            console.log('res', res)
            if (res.status === 200) {
            // 表示调用成功
              const obj = res.data.list
              const addressList = (obj.address + '').split('.')
              addressList.map((item, index) => {
                console.log('this.lists[0][index]', this.lists[0].list)
                this.lists[0].list[index].ip = item
              })
              const netmaskList = (obj.netmask + '').split('.')
              netmaskList.map((item, index) => {
                this.lists[2].list[index].ip = item
              })
            // cidr:"192.168.0.10/24"
            // netmask:"255.255.255.0"
            }
          }, () => {
            // 调用失败后的
          })
      },
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
      handleDownloadEndClick () {
        this.handle2Click('SDOff')
        // 300ms 后开始再次调用新的参数
        setTimeout(() => {
          this.handle2Click('SDToggleOff')
          // 这个时候再调用一个接口来挂载当前的数据即可
          this.$http
            .get(this.url + '/downLoadEnd').then(res => {
            })
        }, 300)
      },
      handleDownloadStartClick () {
        this.handle2Click('SDToggleOn')
        // 300ms 后开始再次调用新的参数
        setTimeout(() => {
          this.handle2Click('SDOn')
          // 这个时候再调用一个接口来挂载当前的数据即可
          setTimeout(() => {
            // 需要调用download 接口
            this.$http
              .get(this.url + '/downLoadStart').then(res => {
                setTimeout(() => {
                  child.exec('explorer.exe "ftp://pi:raspberry@192.168.0.10"', function (err, sto) {
                    console.log('err', err, sto)
                  })
                }, 1000)
              })
          }, 3000) // 需要延时一秒来打开
        }, 1000)
      },
      handle2Click (type) {
        let message = ''
        message = this.commandCodeObj[type + '']
        console.log('message', message, 'type', type)
        this.$http
          .post(this.url + '/GPIOControllerByGPIO', {
            send: message
          })
          .then((res) => {
            console.log('res', res)
            if (type === 'downloadStart') {
              setTimeout(() => {
                child.exec('explorer.exe "ftp://pi:raspberry@192.168.0.10"', function (err, sto) {
                  console.log('err', err, sto)
                })
              }, 1000) // 需要延时一秒来打开
              // 这个时候需要判断这个res 的内容
              if (res.status === 2) {
                // 表示这个其实是一个错误的信息
                this.logs.unshift({
                  type: 'error',
                  content: '出现错误了'
                })
              } else {
                this.logs.unshift({
                  type: 'success',
                  content: '发送成功'
                })
              }
              return
            }
            this.logs.unshift({
              type: 'success',
              content: '发送成功'
            })
          })
      },
      // 模式选择
      setModel () {
        if (this.isOpenSerialPort) {
          let value = ''
          switch (this.camera.workType) {
            case 'P':
              value = 'AA7555020A0082'
              break
            case 'AUTO':
              value = 'AA755502010089'
              break
            case 'AV':
              value = 'AA75550207008F'
              break
            case 'TV':
              value = 'AA75550202008A'
              break
            default:
              value = 'AA755502010089'
          }
          Bus.$emit('sendData', {
            'sendType': 'hex', // 表示为16进制
            'value': value //  对应的值即可// 表示为发送的值
          })
          return
        }
        this.$http
          .post(this.url + '/GPIOControllerByModel', {
            send: this.camera.workType
          })
          .then((res) => {
            this.logs.unshift({
              type: 'success',
              content: '发送成功'
            })
          })
      },
      handleClick (type) {
        let message = ''
        message = this.commandCodeObj[type + '']
        // 根据这个命令来实现
        if (this.isOpenSerialPort) {
          // 如果当前是串口打开了 那么就优先串口来实现
          const value = uatCommandCodeObj[type]// 串口对应发送的值
          Bus.$emit('sendData', {
            'sendType': 'hex', // 表示为16进制
            'value': value //  对应的值即可// 表示为发送的值
          })
          return
        }
        this.$http
          .post(this.url + '/GPIOController', {
            send: message
          })
          .then((res) => {
            console.log('res', res)
            if (type === 'downloadStart') {
              setTimeout(() => {
                child.exec('explorer.exe "ftp://pi:raspberry@192.168.0.10"', function (err, sto) {
                  console.log('err', err, sto)
                })
              }, 1000) // 需要延时一秒来打开
              // 这个时候需要判断这个res 的内容
              if (res.status === 2) {
                // 表示这个其实是一个错误的信息
                this.logs.unshift({
                  type: 'error',
                  content: '发生错误'
                })
              }
              return
            }

            this.logs.unshift({
              type: 'success',
              content: '发送成功'
            })
          })
      },
      // 测试是否已经连接树莓派了 或者树莓派是否开始启动成功了
      async init () {
        // const loading = this.$loading({
        //   lock: true,
        //   text: 'Loading',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // })
        this.initLoading = true
        // 随便发一个请求去请求树莓派地址 然后看有没有响应即可
        const nTimeStamps = Math.floor(Date.now() / 1000)
        const date = new Date(nTimeStamps * 1000)
        const retDate = {
          nYear: date.getFullYear(),
          nMonth: date.getMonth() + 1,
          nDay: date.getDate(),
          nHour: date.getHours(),
          nMinutes: date.getMinutes(),
          nSeconds: date.getSeconds()
        }
        const dateTempYMD = retDate.nYear + '-' + retDate.nMonth + '-' + retDate.nDay
        const dateTempHMS = retDate.nHour + ':' + retDate.nMinutes + ':' + retDate.nSeconds
        this.$http.post(this.url + '/initGPIOController', {
          dateYMD: dateTempYMD,
          dateHMS: dateTempHMS,
          versionType: this.camera.versions // 摄像机的版本
        }).then(res => {
          // 获取了所有的数据
          this.initLoading = false
          // 将返回的数据获取到 这样就可以初始化这边的数据
          const json = res.data.data
          this.camera.workType = json.workType
          this.camera.isSetTime = json.isSetTime !== 0
          this.camera.unit = json.unit || 's'
          this.camera.defineTime = json.defineTime || 7
          this.logs.unshift({
            type: 'success',
            content: '相机连接成功'
          })
        // 开始初始化usb的接口 开始提交数据
        }).catch(() => {
          this.initLoading = false
          this.logs.unshift({
            type: 'error',
            content: '连接失败，请检查设备服务是否启动'
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    .el-input__inner {
        font-size: 12px;
    }
    .ip-ul {
        display: flex;
        flex-direction: row;
        margin-bottom: 15px;
        &-label {
            width: 80px;
            margin-right: 15px;
            text-align: right;
            line-height: 28px;
        }
        &-li {
            width: 120px;
            display: flex;
            flex-direction: row;
            align-items: flex-end;
        }
    }
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
    width: 100%;
    height: 80vh;
    display: flex;
    &-col {
        display: flex;
        /*flex: 1;*/
        flex-direction: column;
        .raspberry-controller {
            /* 数据控制 */
            flex: 1;
            display: flex;
            margin-left: 15px;
            position: relative;
            flex-direction: column;
            border: medium double black;
            &-item {
                display: flex;
                flex-direction: row;
                padding: 15px 15px;
                .raspberry-controller-item-label {
                    font-size: 14px;
                    height: 28px;
                    line-height: 28px;
                    font-weight: bold;
                }
            }
            &-title {
                font-weight: bold;
                height: 20px;
                line-height: 20px;
                font-size: 14px;
                background-color: white;
                position: absolute;
                top: -10px;
                left:10px;
            }
        }
    }

    &-camera {
        width: 250px;
        display: flex;
        position: relative;
        flex-direction: column;
        border: medium double black;
        &-item {
            display: flex;
            flex-direction: row;
            padding: 15px 15px;
            .raspberry-camera-item-label {
                font-size: 14px;
                height: 28px;
                line-height: 28px;
                font-weight: bold;
            }
            .raspberry-btn {
                flex: 1;
                .el-button {
                    width: 100%;
                }
                &:last-of-type {
                    margin-left: 15px;
                }
            }
        }
        &-title {
            font-weight: bold;
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            background-color: white;
            position: absolute;
            top: -10px;
            left:10px;
        }
    }
    &-set {
        flex: 1;
        margin-left: 15px;
        display: flex;
        position: relative;
        flex-direction: column;
        border: medium double black;
        &-subtitle {
            font-size: 14px;
            margin-left: 18px;
        }
        &-logs-ul {
            display: flex;
            flex-direction: column;
            list-style-type: none;
            margin-left: 18px;
            .logs-li {
                font-size: 12px;
                .success {
                    color: #67C23A;
                }
                .error {
                    color: #F56C6C;
                }
            }
        }
        &-title {
            font-weight: bold;
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            background-color: white;
            position: absolute;
            top: -10px;
            left:10px;
        }
        &-item {
            display: flex;
            padding: 15px 15px;
        }
    }
    .raspberry-serial {
        width: 200px;
        padding: 30px 15px;
        display: flex;
        position: relative;
        flex-direction: column;
        border: medium double white;
        &-title {
            font-weight: bold;
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            background-color: white;
            position: absolute;
            top: -10px;
            left:10px;
        }
        &-item {
            display: flex;
            .label {
                width: 70px;
            }
            .label-select {
                flex: 1;
                width: 100%;
            }
        }
    }
     &-title {
         font-size: 16px;
         font-weight: 400;
     }
    &-select {
        width: 100%;
    }
}
</style>
