const state = {
  isOpenSerialPort: false // 是否打开了串口 默认为false
}

const mutations = {
  setSerialPort (state, value) {
    console.log('value', value)
    state.isOpenSerialPort = value
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
