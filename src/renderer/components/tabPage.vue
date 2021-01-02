<template>
  <div class="tab-page">
    <el-row class="tab-page-row">
      <el-col :span="24">
        <el-tabs type="border-card">
            <el-tab-pane label="树莓派设备控制">
                <raspberry-page></raspberry-page>
            </el-tab-pane>
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-date"></i>
              <el-dropdown @command="handleCommand" trigger="click">
                <span class="el-dropdown-link">
                  {{ choiseName }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="send">
                      <span class="iconfont icon-003"></span>
                      发射机</el-dropdown-item>
                  <el-dropdown-item command="receive">
                      <span class="iconfont icon-jieshou"></span>
                      接受机</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
            <send-view></send-view>
          </el-tab-pane>
          <el-tab-pane >
              <span slot="label">
                  <!-- <i class="el-icon-setting">
                  </i> -->
                  <span class="iconfont icon-chuankou "></span>
                  串口设置
              </span>
              <serial-config></serial-config>
              </el-tab-pane>
          <el-tab-pane label="索尼摄像头控制">
              <camera-ctrl></camera-ctrl>
          </el-tab-pane>
          <!--<el-tab-pane label="日志设置">-->
            <!--<serial-log></serial-log>-->
          <!--</el-tab-pane>-->
          <el-tab-pane label="图像处理">
            <image-edit></image-edit>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ImageEdit from './ImageEdit/index' // 图片管理
import SendView from './sendView'
import SerialConfig from './serialConfig'
import SerialLog from './serialLog'
import CameraCtrl from './cameraCtrl'
import RaspberryPage from './raspberryPage'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'tabPage',
  components: {
    SendView,
    SerialConfig,
    SerialLog,
    CameraCtrl,
    RaspberryPage,
    ImageEdit
  },
  computed: {
    ...mapState({
      isOpenSerialPort: state => state.SerialPort.isOpenSerialPort
    })
  },
  data () {
    return {
      choiseName: '设备选择'
    }
  },
  created () {
    this.setSerialPort(false)
  },
  methods: {
    ...mapMutations(['setSerialPort']),
    handleCommand (value) {
      switch (value) {
        case 'send':
          this.choiseName = '发射机'
          break
        case 'receive':
          this.choiseName = '接收机'
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tabs--border-card {
    box-shadow: none;
}
.tab-page {
    /*width: 700px;*/
  .tab-page-row {

  }
}
</style>
