import request from '../utils/request'
export function processImageByBase64 (data) {
  return request({
    url: 'processImage',
    method: 'post',
    dataType: 'json',
    processData: false,
    contentType: false,
    data: data
  })
}
