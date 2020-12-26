<template>
    <!-- 这个是树莓派新的界面控制 -->
    <div class="raspberry">
        <!-- 串口控制界面 -->
        <!--<div class="raspberry-serial">-->
            <!--<label class="raspberry-serial-title">设置串口</label>-->
            <!--<div class="raspberry-serial-item">-->
               <!---->
            <!--</div>-->
            <!--<div  class="raspberry-serial-item">-->
                <!---->
            <!--</div>-->
        <!--</div>-->
        <!-- 相机控制界面界面 -->
        <div class="raspberry-camera">
            <label class="raspberry-serial-title">相机控制</label>
            <div class="raspberry-serial-item">
                <!-- 开机 和关机 -->
            </div>
        </div>
        <!-- 这个是设置页面-->
        <div class="raspberry-set">

        </div>
    </div>
</template>

<script>
  export default {
    name: 'raspberryPageLayout'
  }
</script>

<style lang="scss" scoped>
.raspberry {
    width: 100%;
    height: 80vh;
    background-color: #795da3;
    display: flex;
    &-camera {
        flex: 1;
        display: flex;
        &-title {
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
        display: flex;
    }
    .raspberry-serial {
        width: 200px;
        padding: 30px 15px;
        display: flex;
        position: relative;
        flex-direction: column;
        border: medium double white;
        &-title {
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
}
</style>
