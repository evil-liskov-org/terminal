import Debug from 'debug'
import assert from 'assert'
import { LicenseInfo } from '@material-ui/x-grid'
LicenseInfo.setLicenseKey(
  '0f94d8b65161817ca5d7f7af8ac2f042T1JERVI6TVVJLVN0b3J5Ym9vayxFWFBJUlk9MTY1NDg1ODc1MzU1MCxLRVlWRVJTSU9OPTE='
)
const debug = Debug('terminal:utils')

export const getNextPath = (path, cwd) => {
  assert.strictEqual(typeof path, 'string')
  assert.strictEqual(typeof cwd, 'string')
  const segments = getPathSegments(path)
  assert(segments.includes(cwd), `invalid cwd: ${cwd}`)
  while (segments[0] !== cwd) {
    segments.shift()
  }
  segments.shift()
  const nextPath = segments.shift()
  debug(`nextPath`, nextPath)
  return nextPath
}
export const getPathSegments = (alias) => {
  // TODO merge with metrologyFactory function
  if (alias === '/') {
    return ['/']
  }
  let prefix = ''
  const splits = alias.split('/').filter((seg) => !!seg)
  splits.unshift('/')
  const paths = splits.map((segment) => {
    prefix && prefix !== '/' && (prefix += '/') // TODO make child naming convention avoid this check ?
    prefix += segment
    return prefix
  })
  return paths
}
