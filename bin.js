#!/usr/bin/env node
'use strict'

const chalk = require('chalk')

const dict = require('.')
const argv = process.argv.slice(2)

const showError = (err) => {
	console.error(chalk.red(err.message || err.toString()))
	process.exit(1)
}



if (argv.join(' ').trim().length === 0)
	showError('Missing query')

dict(argv.join(' '))
.on('data', ([de, en, type]) => {
	console.log(chalk.yellow(de), chalk.blue(en), type ? chalk.gray(type) : '')
})
.on('error', showError)
