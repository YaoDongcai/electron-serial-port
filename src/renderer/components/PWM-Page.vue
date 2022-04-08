<template>
    <div class="tab">
        <el-row>
            <el-col :span="6">
                <p>PWM1----PIN12----GPIO18</p>
                <p>当前的占空比为: {{ formatTooltip(pwm0) }}</p>
                <el-slider
                        show-tooltip
                        :format-tooltip="formatTooltip"
                        v-model="pwm0"
                        vertical
                        :max="25"
                        height="200px"
                        @change="change"
                >
                </el-slider>
            </el-col>
            <el-col :span="6">
                <p>PWM1----PIN13----GPIO13</p>
                <el-slider show-tooltip v-model="pwm1" vertical height="200px">
                </el-slider>
            </el-col>
            <el-col :span="6">
                <p>PWM1----PIN14----GPIO14</p>
                <el-slider show-tooltip v-model="pwm2" vertical height="200px">
                </el-slider>
            </el-col>
            <el-col :span="6">
                <p>PWM1----PIN15----GPIO16</p>
                <el-slider show-tooltip v-model="pwm3" vertical height="200px">
                </el-slider>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  export default {
    name: 'LandingPage',
    data () {
      return {
        url: 'http://192.168.0.10:7001/respberry',
        pwm0: 0,
        pwm1: 0,
        pwm2: 0,
        pwm3: 0
      }
    },
    created () {},
    methods: {
      change (value) {
        // 延迟一秒钟开始发送即可 加入延迟函数即可
      },
      formatTooltip (val) {
        return val / 10
      },
      setPWMDutyTime () {
        this.$http
          .post(this.url + '/pwm', {
            count: 1.5
          })
          .then((res) => {
            const data = res.data.data
            console.log('data', data)
          })
      }
    }
  }
</script>

<style lang="scss">
    .tab {
        margin: 20px;
    }
</style>

