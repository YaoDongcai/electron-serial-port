/* eslint-disable no-new */
import Datastore from 'nedb'
// import path from 'path'
// import { remote } from 'electron'
const filename = '../assets/serialport.db' // path.join(remote.app.getPath('userData'), 'db/device.db')
console.log('filename', filename)
export default new Datastore({
  autoload: true,
  filename: filename
})
