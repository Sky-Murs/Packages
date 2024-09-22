#!/usr/bin/env -S npx tsx
import fs from 'fs'
import path from 'path'

import { b, e, purple } from './_coloredConsole'
import __loadSkyConfig, { __getAppConfig } from './_loadSkyConfig'
import __sdkPath from './_sdkPath'

export namespace tauri {
    init()

    export async function init(): Promise<void> {
        const name = process.argv[4]

        if (name == null || name === '') {
            // eslint-disable-next-line no-console
            console.error('missing app name')
            // eslint-disable-next-line
            return
        }

        const skyConfig = await __loadSkyConfig()

        if (!skyConfig) {
            return
        }

        const skyAppConfig = __getAppConfig(name, skyConfig)

        if (!skyAppConfig) {
            return
        }

        if (!fs.existsSync(path.resolve(skyAppConfig.path, 'src-tauri'))) {
            fs.cpSync(
                path.resolve(__sdkPath, 'commands/assets/tauri-initial'),
                path.resolve(skyAppConfig.path, 'src-tauri'),
                {
                    recursive: true,
                }
            )
        }

        process.stdout.write(`${b}${purple}Init${e} 👌\n`)
    }
}
