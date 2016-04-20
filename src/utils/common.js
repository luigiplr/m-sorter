import fs from 'fs'
import path from 'path'

export function checkPath(checkPath, pathType = 'directory') {
  return new Promise((resolve, reject) => {
    try {
      const stat = fs.lstatSync(path.normalize(checkPath))
      resolve((pathType === 'directory' ? stat.isDirectory() : stat.isFile()))
    } catch (e) {
      reject(`${checkPath} is not a ${pathType}`)
    }
  })
}
