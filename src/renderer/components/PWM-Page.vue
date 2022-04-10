<template>
    <div class="tab">
        <el-row>
            <el-col :span="24">
                <p>PWM1----PIN12----GPIO18</p>
                <p>当前的占空比为: {{ pwm0 }}</p>
                <el-slider
                        show-tooltip
                        show-stops
                        :step="0.01"
                        v-model="pwm0"
                        :max="2.5"
                        :min="0.8"
                        width="100%"
                        @change="change"
                >
                </el-slider>
            </el-col>
            <!--<el-col :span="6">-->
                <!--<p>PWM1&#45;&#45;&#45;&#45;PIN13&#45;&#45;&#45;&#45;GPIO13</p>-->
                <!--<el-slider show-tooltip v-model="pwm1" vertical height="200px">-->
                <!--</el-slider>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
                <!--<p>PWM1&#45;&#45;&#45;&#45;PIN14&#45;&#45;&#45;&#45;GPIO14</p>-->
                <!--<el-slider show-tooltip v-model="pwm2" vertical height="200px">-->
                <!--</el-slider>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
                <!--<p>PWM1&#45;&#45;&#45;&#45;PIN15&#45;&#45;&#45;&#45;GPIO16</p>-->
                <!--<el-slider show-tooltip v-model="pwm3" vertical height="200px">-->
                <!--</el-slider>-->
            <!--</el-col>-->
        </el-row>
    </div>
</template>

<script>
  export default {
    name: 'LandingPage',
    data () {
      return {
        url: 'http://192.168.0.10:7001/respberry',
        pwm0: 1.5,
        pwm1: 0,
        pwm2: 0,
        pwm3: 0
      }
    },
    created () {},
    methods: {
      change (value) {
        console.log('value', value)
        // 延迟一秒钟开始发送即可 加入延迟函数即可
        let handleTimeOut = setTimeout(() => {
          // 如果value 是
          const num = parseFloat(value) * 100
          this.setPWMDutyTime(num)
          clearTimeout(handleTimeOut)
          // 延迟200ms 即可
        }, 200)
      },
      setPWMDutyTime (count) {
        this.$http
          .post(this.url + '/pwm', {
            count: count
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
        width: 100%;
    }
</style>

