#!/usr/bin/env tsx
import { b, e, purple } from './__coloredConsole'
import __run from './__run'

const command = `npm i -D\
eslint eslint-config-prettier\
eslint-plugin-prettier\
eslint-plugin-react\
eslint-plugin-react-hooks\
@typescript-eslint/eslint-plugin\
@typescript-eslint/parser\
prettier\
`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace init {
    format()

    export function format(): void {
        process.stdout.write(`${b}${purple}install packages${e}\n`)
        __run(command)
        process.stdout.write(`\n${b}${purple}install packages${e} 👌\n`)
    }
}
