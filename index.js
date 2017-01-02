'use strict'

const normalize = require('normalize-for-search')
const fs = require('fs')
const path = require('path')
const ndjson = require('ndjson')
const filter = require('stream-filter')
const words = require('word-regex')()



const dict = (query) => {
	const tokens = normalize(query).match(words)

	return fs.createReadStream(path.join(__dirname, 'data.ndjson'))
	.pipe(ndjson.parse())
	.pipe(filter.obj((row) => { // OR search
		const [de, en, type] = row

		const enTokens = normalize(en).match(words)
		if (tokens.every((t) => enTokens.includes(t))) return true

		const deTokens = normalize(de).match(words)
		if (tokens.every((t) => deTokens.includes(t))) return true

		return false
	}))
}

module.exports = dict
