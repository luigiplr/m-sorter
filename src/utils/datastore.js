import nedb from 'nedb'
import path from 'path'
import { sync as mkdirp } from 'mkdirp'

/**
 * @desc initializes a nedb instance w/ user options from config
 * @param object {datastorePath} - directory path (relative or absolute) to store the database file in
 * @return object - nedb instance
 * @author Luigi Poole
 */

class datastore extends nedb {
  constructor(datastorePath, log, callback) {
    super({
      filename: path.join(datastorePath, 'v-sorter.db'),
      timestampData: true,
      autoload: true,
      onload: err => this._onLoaded(err, callback)
    })
    log.verbose('Loading Datastore')
    this.log = log
  }

  _onLoaded(error, { resolve, reject }) {
    if (error) {
      this.log.error(`Something went wrong loading the datastore: ${error}`)
      reject()
    } else {
      this.log.verbose('Datastore loaded OK')
      resolve()
    }
  }
}

/**
 * Serves as a proxy for initializing the datastore while also creating datastore directory
 * @param object {datastorePath} - path of the datastore directory (absolute or relative)
 * @param object - winston instance for datastore
 * @return Promise - resolves if everything has initialized OK, rejects if there is an error.
 */
export default ({ datastorePath }, log) => new Promise((resolve, reject) => {
  // resolve just to be safe
  const datastoreResolved = path.resolve(datastorePath)
    // create it if not already created.
  mkdirp(datastoreResolved)
    // kick off datastore init and pass though relevent arguments.
  return new datastore(datastoreResolved, log, { resolve, reject })
})
