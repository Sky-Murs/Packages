#!/usr/bin/env tsx
import __import from './__import'
import args from 'args'

function initArgs() {
    args.command('build', 'Build docs', () => __import(`readme-build.ts`))
    
    args.parse(process.argv, {
        name: 'sky readme',
        mainColor: 'magenta',
        subColor: 'grey',
        mri: {},
    })
}

const command = process.argv[3]
if (!command) {
    initArgs()
    args.showHelp()
} else if (!__import(`./readme-${command}.ts`)) {
    initArgs()
    // eslint-disable-next-line no-console
    console.error(`readme: command "${command}" not found`)
    args.showHelp()
}