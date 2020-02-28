#!/usr/bin/env node
'use strict'

const mri = require('mri')
const pkg = require('./package.json')

const argv = mri(process.argv.slice(2), {
	boolean: ['help', 'h', 'version', 'v']
})

if (argv.help || argv.h) {
	process.stdout.write(`
1. Request & download a dict.cc dump.
    - Go to http://www1.dict.cc/translation_file_request.php?l=
    - You will get an e-mail with a link. Confirm by opening.
    - Then, you will get another e-mail with another link.
2. Unzip the dump. There will be a file inside, named like
    cmfkobmobk-18522520842-e6u765.txt, where the watermark is e6u765.
3. Import the data:
    cat cmfkobmobk-18522520842-e6u765.txt | dict-cc-import e6u765
\n`)
	process.exit(0)
}

if (argv.version || argv.v) {
	process.stdout.write(`dict-cc-cli v${pkg.version}\n`)
	process.exit(0)
}

const showError = (err) => {
	console.error(err.message || err)
	process.exit(1)
}

const ent = require('ent')
const lines = require('binary-split')
const filter = require('stream-filter')
const map = require('through2-map')
const ndjson = require('ndjson')
const fs = require('fs')
const path = require('path')

const watermark = argv._[0]
if (!watermark) showError('Missing watermark.')

const split = (row) => row.toString('utf8').trim().split(/\t+/)

const isNotAComment = (row) => row.toString('utf8').slice(0, 1) !== '#'
const hasNoWatermark = (row) => row.toString('utf8').indexOf(watermark) < 0
const isNotEmpty = (row) => split(row).length >= 2

const parseRow = (row) => {
	const [de, en, type] = split(row)
	return [ent.decode(de), ent.decode(en), type]
}

process.stdin
.pipe(lines())
.pipe(filter.obj(isNotAComment))
.pipe(filter.obj(hasNoWatermark))
.pipe(filter.obj(isNotEmpty))
.pipe(map.obj(parseRow))
.pipe(ndjson.stringify())
.pipe(fs.createWriteStream(path.join(__dirname, 'data.ndjson')))
