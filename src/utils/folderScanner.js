import { EventEmitter } from 'events'
import _ from 'lodash'
import async from 'async'
import readDir from 'recursive-readdir'

/**
 * @desc folder scanning util, scans a given folder and returns (along side the directorys) a md5 hash of the dir structure for later use
 * @param string 'folder' - directory path to scan
 * @return object {folders} - object of folders with their respective sub-folders
 *         string 'hash'    - md5 hash of the object (stringified)
 * @author Luigi Poole
 */

export default class folderScanner extends EventEmitter {
  constructor(folder, logging) {
      super()
      this.logging = logging

      logging.info(`Scanning "${folder}"`)

      readDir(folder, (err, files) => {
        if (err) return this.emit('error', err)


        console.log(files)
      })
    }
    /*
      _metaDataMatcher = async.queue(folder, next) => {


        next()
      }, 2) //lets allow 2 match operations concurrent at once */
}
