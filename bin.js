#!/usr/bin/env node
'use strict'

const mri = require('mri')
const pkg = require('./package.json')

const argv = mri(process.argv.slice(2), {
	boolean: ['help', 'h', 'version', 'v']
})

if (argv.help || argv.h) {
	process.stdout.write(`
Usage:
    dict-cc <query>
Examples:
    dict-cc watermark
\n`)
	process.exit(0)
}

if (argv.version || argv.v) {
	process.stdout.write(`dict-cc-cli v${pkg.version}\n`)
	process.exit(0)
}

const showError = (err) => {
	if (process.env.NODE_DEBUG === 'dict-cc-cli') console.error(err)
	else console.error(err.message || (err + ''))
	process.exit(1)
}

const chalk = require('chalk')
const dict = require('.')

const query = argv._[0]
if (!query) showError('Missing query.')

dict(query)
.on('data', ([de, en, type]) => {
	console.log(chalk.yellow(de), chalk.blue(en), type ? chalk.gray(type) : '')
})
.on('error', (err) => {
	if (err.code === 'ENOENT') {
		showError('Couldn\'t find the data file. Run dict-cc-import first.')
	} else showError(err)
})
