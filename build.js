'use strict'

const ent = require('ent')
const lines = require('binary-split')
const filter = require('stream-filter')
const map = require('through2-map')
const ndjson = require('ndjson')
const fs = require('fs')
const path = require('path')

const showError = (err) => {
	console.error(err.message || err)
	process.exit(1)
}



const watermark = process.argv[2].trim()
if (!watermark) showError('Missing water mark.')

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
