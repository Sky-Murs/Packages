#!/usr/bin/env -S npx tsx
import path from 'path'
import { fileURLToPath } from 'url'

import __loadSkyConfig, { __getAppConfig } from './__loadSkyConfig'
import __run from './__run'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sdkNodeModulesPath = path.resolve(__dirname, '../node_modules')

export namespace tauri {
    dev()

    export function dev(): void {
        const name = process.argv[4]

        if (name == null || name === '') {
            // eslint-disable-next-line no-console
            console.error('missing app name')
            // eslint-disable-next-line
            return
        }

        const skyConfig = __loadSkyConfig()
        const skyModuleConfig = __getAppConfig(name, skyConfig)

        if (!skyModuleConfig) {
            return
        }

        __run(path.join(sdkNodeModulesPath, '.bin/tauri') + ' dev', {
            cwd: path.resolve(skyModuleConfig['tauri-assets']),
        })
    }
}
