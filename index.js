'use strict'

const normalize = require('normalize-for-search')
const fs = require('fs')
const path = require('path')
const ndjson = require('ndjson')
const filterStream = require('stream-filter')
const words = require('word-regex')()



const dict = (query) => {
	const tokens = normalize(query).match(words)

	const reader = fs.createReadStream(path.join(__dirname, 'data.ndjson'))
	const parser = ndjson.parse()
	const filter = filterStream.obj((row) => { // OR search
		const [de, en, type] = row

		const enTokens = normalize(en).match(words)
		if (tokens.every((t) => enTokens.includes(t))) return true

		const deTokens = normalize(de).match(words)
		if (tokens.every((t) => deTokens.includes(t))) return true

		return false
	})

	reader.once('error', err => parser.destroy(err))
	parser.once('error', err => filter.destroy(err))
	return reader.pipe(parser).pipe(filter)
}

module.exports = dict
