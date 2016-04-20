import nedb from 'nedb'
import path from 'path'

/**
 * @desc initializes a nedb instance w/ user options from config and creates instance datastore directory
 * @param object {datastorePath} - directory path (relative or absolute) to store the database file in
 * @return object - nedb instance
 * @author Luigi Poole
 */

export default class datastore extends nedb {
  constructor({ datastorePath }) {
    super({ filename: path.resolve(path.join(datastorePath, 'v-sorter.db')) })


  }
}
