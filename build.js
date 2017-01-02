'use strict'

const fs = require('fs')
const path = require('path')
const split = require('binary-split')
const filter = require('stream-filter')
const map = require('through2-map')
const ndjson = require('ndjson')

const showError = (err) => {
	console.error(err.message || err)
	process.exit(1)
}



const watermark = process.argv[2].trim()
if (!watermark) showError('Missing water mark.')

const isNotAComment = (row) => row.toString('utf8').slice(0, 1) !== '#'
const hasNoWatermark = (row) => row.toString('utf8').indexOf(watermark) < 0
const parseRow = (row) => {
	const data = row.toString('utf8').trim().split(/\t+/)
	return data.slice(0, 3)
}



fs.createReadStream(path.join(__dirname, 'data.txt'))
.pipe(split())
.pipe(filter.obj(isNotAComment))
.pipe(filter.obj(hasNoWatermark))
.pipe(map.obj(parseRow))
.pipe(ndjson.stringify())
.pipe(fs.createWriteStream(path.join(__dirname, 'data.ndjson')))
