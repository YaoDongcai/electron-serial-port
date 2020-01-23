<template>
  <div class="tab-page">
    <el-row class="tab-page-row">
      <el-col :span="24">
        <el-tabs type="border-card">
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
          <el-tab-pane label="GPS设置">GPS设置</el-tab-pane>
          <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SendView from './sendVIew'
import SerialConfig from './serialConfig'
export default {
  name: "tabPage",
  components: {
      SendView,
      SerialConfig
  },
  data() {
    return {
        choiseName: "设备选择",
    };
  },
  created() {},
  methods: {
      handleCommand(value) {
      switch (value) {
        case "send":
          this.choiseName = "发射机";
          break;
        case "receive":
          this.choiseName = "接收机";
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-page {
    width: 660px;
  .tab-page-row {
      
  }
}
</style>