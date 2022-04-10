<template>
    <div class="tab">
        <div class="pwm-name">
            电机A控制口 对应引脚为Pin 12(Gpio 18)
        </div>
        <div class="pwm-item">
            <div class="pwm-item-left">
                正转
            </div>
            <div class="pwm-item-right">
                <el-slider
                        show-tooltip
                        show-stops
                        :step="0.005"
                        v-model="pwm0.left"
                        :max="1.5"
                        :min="0.81"
                        width="100%"
                        @change="(val) => change(val, 18)"
                />
            </div>
        </div>
        <div class="pwm-item">
            <div class="pwm-item-left">
                正转的占空比为:{{ pwm0.left }}  反转的占空比为:{{ pwm0.right}}
            </div>
            <div class="pwm-item-right">
                <el-button size="mini" type="danger" @click="change(1.5, 18)">停止</el-button>
            </div>
        </div>
        <div class="pwm-item">
            <div class="pwm-item-left">
                反转
            </div>
            <div class="pwm-item-right">
                <el-slider
                        show-tooltip
                        show-stops
                        :step="0.005"
                        v-model="pwm0.right"
                        :max="2.4"
                        :min="1.5"
                        width="100%"
                        @change="(val) => change(val, 18)"
                />
            </div>
        </div>

        <div class="pwm-name">
            电机B控制口 对应引脚为Pin 32(Gpio 12)
        </div>
        <div class="pwm-item">
            <div class="pwm-item-left">
                正转
            </div>
            <div class="pwm-item-right">
                <el-slider
                        show-tooltip
                        show-stops
                        :step="0.005"
                        v-model="pwm1.left"
                        :max="1.5"
                        :min="0.81"
                        width="100%"
                        @change="(val) => change(val, 12)"
                />
            </div>
        </div>
        <div class="pwm-item">
            <div class="pwm-item-left">
                正转的占空比为:{{ pwm1.left }}  反转的占空比为:{{ pwm1.right}}
            </div>
            <div class="pwm-item-right">
                <el-button size="mini" type="danger" @click="change(1.5, 12)">停止</el-button>
            </div>
        </div>
        <div class="pwm-item">
            <div class="pwm-item-left">
                反转
            </div>
            <div class="pwm-item-right">
                <el-slider
                        show-tooltip
                        show-stops
                        :step="0.005"
                        v-model="pwm1.right"
                        :max="2.4"
                        :min="1.5"
                        width="100%"
                        @change="(val) => change(val, 12)"
                />
            </div>
        </div>

        <div class="pwm-name">
            电机C控制口 对应引脚为Pin 33(Gpio 13)
        </div>
        <div class="pwm-item">
            <div class="pwm-item-left">
                正转
            </div>
            <div class="pwm-item-right">
                <el-slider
                        show-tooltip
                        show-stops
                        :step="0.005"
                        v-model="pwm2.left"
                        :max="1.5"
                        :min="0.81"
                        width="100%"
                        @change="(val) => change(val, 13)"
                />
            </div>
        </div>
        <div class="pwm-item">
            <div class="pwm-item-left">
                正转的占空比为:{{ pwm2.left }}  反转的占空比为:{{ pwm2.right}}
            </div>
            <div class="pwm-item-right">
                <el-button size="mini" type="danger" @click="change(1.5, 13)">停止</el-button>
            </div>
        </div>
        <div class="pwm-item">
            <div class="pwm-item-left">
                反转
            </div>
            <div class="pwm-item-right">
                <el-slider
                        show-tooltip
                        show-stops
                        :step="0.005"
                        v-model="pwm2.right"
                        :max="2.4"
                        :min="1.5"
                        width="100%"
                        @change="(val) => change(val, 13)"
                />
            </div>
        </div>


        <div class="pwm-name">
            电机E控制口 对应引脚为Pin 35(Gpio 19)
        </div>
        <div class="pwm-item">
            <div class="pwm-item-left">
                正转
            </div>
            <div class="pwm-item-right">
                <el-slider
                        show-tooltip
                        show-stops
                        :step="0.005"
                        v-model="pwm3.left"
                        :max="1.5"
                        :min="0.81"
                        width="100%"
                        @change="(val) => change(val, 19)"
                />
            </div>
        </div>
        <div class="pwm-item">
            <div class="pwm-item-left">
                正转的占空比为:{{ pwm3.left }}  反转的占空比为:{{ pwm3.right}}
            </div>
            <div class="pwm-item-right">
                <el-button size="mini" type="danger" @click="change(1.5, 19)">停止</el-button>
            </div>
        </div>
        <div class="pwm-item">
            <div class="pwm-item-left">
                反转
            </div>
            <div class="pwm-item-right">
                <el-slider
                        show-tooltip
                        show-stops
                        :step="0.005"
                        v-model="pwm3.right"
                        :max="2.4"
                        :min="1.5"
                        width="100%"
                        @change="(val) => change(val, 19)"
                />
            </div>
        </div>

        <div class="pwm-name">
            电机D控制口 对应引脚为Pin 38(Gpio 20)
        </div>
        <div class="pwm-item">
            <div class="pwm-item-left">
                正转
            </div>
            <div class="pwm-item-right">
                <el-slider
                        show-tooltip
                        show-stops
                        :step="0.005"
                        v-model="pwm4.left"
                        :max="1.5"
                        :min="0.81"
                        width="100%"
                        @change="(val) => change(val, 20)"
                />
            </div>
        </div>
        <div class="pwm-item">
            <div class="pwm-item-left">
                正转的占空比为:{{ pwm4.left }}  反转的占空比为:{{ pwm4.right}}
            </div>
            <div class="pwm-item-right">
                <el-button size="mini" type="danger" @click="change(1.5, 20)">停止</el-button>
            </div>
        </div>
        <div class="pwm-item">
            <div class="pwm-item-left">
                反转
            </div>
            <div class="pwm-item-right">
                <el-slider
                        show-tooltip
                        show-stops
                        :step="0.005"
                        v-model="pwm4.right"
                        :max="2.4"
                        :min="1.5"
                        width="100%"
                        @change="(val) => change(val, 20)"
                />
            </div>
        </div>


        <div class="pwm-name">
            电机F控制口 对应引脚为Pin 37(Gpio 26)
        </div>
        <div class="pwm-item">
            <div class="pwm-item-left">
                正转
            </div>
            <div class="pwm-item-right">
                <el-slider
                        show-tooltip
                        show-stops
                        :step="0.005"
                        v-model="pwm5.left"
                        :max="1.5"
                        :min="0.81"
                        width="100%"
                        @change="(val) => change(val, 26)"
                />
            </div>
        </div>
        <div class="pwm-item">
            <div class="pwm-item-left">
                正转的占空比为:{{ pwm5.left }}  反转的占空比为:{{ pwm5.right}}
            </div>
            <div class="pwm-item-right">
                <el-button size="mini" type="danger" @click="change(1.5, 26)">停止</el-button>
            </div>
        </div>
        <div class="pwm-item">
            <div class="pwm-item-left">
                反转
            </div>
            <div class="pwm-item-right">
                <el-slider
                        show-tooltip
                        show-stops
                        :step="0.005"
                        v-model="pwm5.right"
                        :max="2.4"
                        :min="1.5"
                        width="100%"
                        @change="(val) => change(val, 26)"
                />
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .tab {
        margin: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;

        .pwm-name {
            color: #669900;
            min-height: 30px;
        }
        .pwm-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            min-height: 25px;
            .pwm-item-left {
                margin-left: 10px;
                margin-right: 10px;
            }
            .pwm-item-right {
                flex: 1
            }
        }
    }
</style>
<script>
  export default {
    name: 'LandingPage',
    data () {
      return {
        url: 'http://192.168.0.10:7001/respberry',
        pwm0: {
          left: 1.5,
          right: 1.5
        },
        pwm1: {
          left: 1.5,
          right: 1.5
        },
        pwm2: {
          left: 1.5,
          right: 1.5
        },
        pwm3: {
          left: 1.5,
          right: 1.5
        },
        pwm4: {
          left: 1.5,
          right: 1.5
        },
        pwm5: {
          left: 1.5,
          right: 1.5
        }
      }
    },
    created () {},
    methods: {
      change (value, port) {
        console.log('value', value, port)
        // 延迟一秒钟开始发送即可 加入延迟函数即可
        let handleTimeOut = setTimeout(() => {
          // 如果value 是
          const num = parseFloat(value) * 200
          console.log('num', num, 'port', port)
          this.setPWMDutyTime(num, port)
          clearTimeout(handleTimeOut)
          // 延迟200ms 即可
        }, 200)
      },
      setPWMDutyTime (count, port) {
        this.$http
          .post(this.url + '/pwm', {
            port: port,
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



