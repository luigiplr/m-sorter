import { Logger, transports } from 'winston'
import moment from 'moment'
import path from 'path'
import { sync as mkdirp } from 'mkdirp'

/**
 * @desc initializes a winston instance w/ user options from config and creates instance logging directory
 * @param object {logLevel} - log level passed to winston, can be any of: error, warn, info, verbose, debug, silly
 *               {logDir}   - directory to store logs
 * @return object - winston instance
 * @author Luigi Poole
 */

export default class log extends Logger {
  constructor({ logLevel = 'info', logDir = 'logs' }) {
    //route logs to console for the one or two nano seconds it takes the code below to run
    super({ level: logLevel, transports: [new(transports.Console)()] })

    //define the log path for the instance, uses config parm alongside the exsact time stamp of exsecution
    const logPath = path.resolve(path.join(logDir, moment().format('YYYY-MM-DD_HH-MM-SS-MS')))

    // create the logging path. (do this synchronously)
    mkdirp(logPath)

    //route uncaught errors within the app to winston for logging
    process.on('uncaughtException', this.error)

    //now that the logging path has been created finnish configuring winston
    this.configure({
      level: logLevel,
      transports: [
        new(transports.Console)(),
        new(transports.File)({
          name: 'info-file',
          filename: path.join(logPath, 'info.log'),
          level: 'info'
        }),
        new(transports.File)({
          name: 'error-file',
          filename: path.join(logPath, 'error.log'),
          level: 'error'
        })
      ]
    })
  }
}
