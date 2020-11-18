<template>
    <div class="edit">
        <!-- 选择图片 open图片File -->
        <div class="edit-left">
            <!-- 图片显示框子 action="http://127.0.0.1:8000/processImage" -->
            <div class="edit-left-origin">
                <el-upload
                    action=""
                    :on-change="getFile"
                    list-type="picture-card"
                    :limit="1"
                    :file-list="files"
                    :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img
                            class="el-upload-list__item-thumbnail"
                            :src="file.url" alt=""
                        >
                        <span class="el-upload-list__item-actions">
                            <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                            >
                            <i class="el-icon-zoom-in"></i>
                            </span>
                            <span
                                v-if="!disabled"
                                class="el-upload-list__item-delete"
                                @click="handleDownload(file)"
                            >
                              <i class="el-icon-download"></i>
                            </span>
                            <span
                                    v-if="!disabled"
                                    class="el-upload-list__item-delete"
                                    @click="handleRemove(file)"
                            >
                              <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
            </div>
        </div>
        <!-- 图片编辑区域 -->
        <div class="edit-center">
            <!-- 编辑区域 -->
            <div class="edit-center-header">
                <!-- 标题头部文字 -->
                <p class="edit-center-header-title">图片编辑</p>
                <!--变成灰色即可 -->
                <el-button size="mini" @click="handelEditImage('toGray')" type="primary">图片变灰</el-button>
                <el-button size="mini" @click="handelEditImage('detectImage')" type="primary">图片识别</el-button>
            </div>
        </div>
        <div class="edit-right">
            <p class="edit-right-title">原图片</p>
            <img :src="originImgBase64" />
            <p class="edit-right-title">处理的图片</p>
            <img :src="processImgBase64" />
        </div>
        <!-- dialog的图片 -->
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import { processImageByBase64 } from '../../api/processImage'
export default {
  name: 'ImageEditIndex', // 图像处理
  data () {
    return {
      originImgBase64: null, // 原来的图片地址
      processImgBase64: null, // 返回的处理图片数据
      formdata: null, // formdata 表单
      files: [], // 空数组
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      base64Resource: null
    }
  },
  methods: {
    getBase64 (file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    },
    getFile (file, fileList) {
      this.getBase64(file.raw).then(res => {
        this.base64Resource = res
      })
    },
    // 图片变成灰色
    handelEditImage (funName) {
      processImageByBase64({
        img: this.base64Resource,
        funName: funName + ''
      }).then(res => {
        // 提交success
        this.originImgBase64 = this.base64Resource
        this.processImgBase64 = 'data:image/png;base64,' + res.img64
        console.log('successs', res)
      }, error => {
        console.log('error', error)
      })
    },
    handleRemove (file) {
      // 如果是移除 那么就需要移除这个数据
      this.files = []
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload (file) {
      console.log(file)
    }
  }
}
</script>

<style lang="scss" scoped>
.edit {
    display: flex;
    &-left {
        width: 320px;
        display: flex;
        &-origin {
            width: 100%;
            display: block;
        }
        &-process {
            display: block;
            width: 100%;
        }
    }
    &-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        &-title {
            font-size: 24px;
            font-weight: bold;
            margin-top: 8px;
            margin-bottom: 8px;
            img {
                width: auto;
                min-width: 100px;
                height: 150px;
            }
        }
    }
    &-center {
        flex: 1;
        display: flex;
        .edit-center-header {
            padding: 8px;
            border: 1px solid #333;
            .edit-center-header-title {
                color: rgba(0,0,0,0.85);
                font-size: 14px;
                font-weight: 600;
                padding-bottom: 10px;
            }
        }

    }
}
</style>
