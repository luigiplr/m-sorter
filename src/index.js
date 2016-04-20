import folderScanner from './utils/folderScanner'
import logging from './utils/logging'
import { checkPath } from './utils/common'
import config from './config'
import datastore from './utils/datastore'
import path from 'path'

const [log, db] = [new logging(config), new datastore(config)]

class vSorter {
  constructor() {
    log.verbose('Starting m-sorter')

    this.verifyConfig().then(::this.verifyFolderMapping).catch(log.error)
  }

  verifyFolderMapping() {


  }

  verifyConfig() {
    log.verbose('Verifying Config')

    const { seriesPaths, moviePaths, sortPaths, traktAPIToken } = config
    const checkPaths = []

    if (!traktAPIToken || traktAPIToken.length === 0) return Promise.reject('No Trakt API token defined')

    if (seriesPaths.length > 0) seriesPaths.forEach(p => checkPaths.push(p))
    else log.warn('No Series Path(s) defined')
    if (moviePaths.length > 0) moviePaths.forEach(p => checkPaths.push(p))
    else log.warn('No Movie Path(s) defined')

    if (sortPaths.length > 0) sortPaths.forEach(p => checkPaths.push(p))
    else return Promise.reject('No Sort Path(s) defined')

    return Promise.all(checkPaths.map(p => checkPath(p)))
  }
}


new vSorter()
