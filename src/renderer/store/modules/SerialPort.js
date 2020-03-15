const state = {
  isOpenSerialPort: false, // 是否打开了串口 默认为false
  port: null // 串口对象
}

const mutations = {
  setSerialPort (state, value) {
    console.log('value', value)
    state.isOpenSerialPort = value
  },
  setSerialPortHandle (state, value) {
    console.log('setSerialPortHandle', value)
    state.port = value
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
