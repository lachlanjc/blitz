import {resolve} from 'path'
import {synchronizeFiles} from './synchronizer'
import {ServerConfig, enhance} from './config'
import {nextStartDev} from './next-utils'

export async function dev(config: ServerConfig) {
  const {
    watch = true,
    rootFolder,
    nextBin,
    devFolder,
    ignoredPaths,
    manifestPath,
    writeManifestFile,
    includePaths,
  } = await enhance({
    ...config,
    interceptNextErrors: true,
  })
  const src = resolve(rootFolder)
  const dest = resolve(rootFolder, devFolder)
  console.log('STARTING')
  const {manifest} = await synchronizeFiles({
    src,
    dest,
    watch: watch,
    ignoredPaths,
    includePaths,
    manifestPath,
    writeManifestFile,
  })
  console.log('FINISHING')
  nextStartDev(nextBin, dest, manifest, devFolder)
}
