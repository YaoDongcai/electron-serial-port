/* eslint-disable no-new */
import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'
const filename = path.join(remote.app.getPath('userData'), 'db/device.db')
console.log('fileName', filename)
export default new Datastore({
  autoload: true,
  filename: '../assets/serialport.db'
})
