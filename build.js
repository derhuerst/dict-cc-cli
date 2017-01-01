'use strict'

const searchIndex = require('search-index')
const path = require('path')
const fs = require('fs')
const split = require('binary-split')
const filter = require('stream-filter')
const map = require('through2-map')

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
	return {
		de: data[0], en: data[1], type: data[2]
	}
}



searchIndex({
	levelPath: path.join(__dirname, 'index.leveldb')
}, (err, index) => {
	if (err) return showError(err)

	fs.createReadStream(path.join(__dirname, 'data.txt'))
	.pipe(split())
	.pipe(filter.obj(isNotAComment))
	.pipe(filter.obj(hasNoWatermark))
	.pipe(map.obj(parseRow))
	.on('data', () => {
		process.stdout.write('.')
	})
	.pipe(index.defaultPipeline())
	.pipe(index.add())

	.on('data', () => {})
	.on('error', showError)
})
