'use strict'

const searchIndex = require('search-index')
const normalizer = require('docproc').pipeline
const path = require('path')
const sink = require('stream-sink')



const tokenize = (query) => new Promise((yay, nay) => {
	const pipeline = normalizer()
	pipeline.once('data', (data) => yay(data.tokenised))
	pipeline.once('error', nay)
	pipeline.end(query)
})

const search = (index, tokenized) =>
	index.search({
		query: [{AND: tokenized}],
		pageSize: 10
	})
	.pipe(sink('object'))



const dict = () => {
	let index
	const init = () => new Promise((yay, nay) => {
		if (index) return yay(index)
		searchIndex({
			levelPath: path.join(__dirname, 'index.leveldb')
		}, (err, _index) => {
			if (err) return nay(err)
			index = _index
			yay(index)
		})
	})

	const search = (query) => {
		return init().then((index) =>
			tokenize(query)
			.then((tokenized) => {
				console.log(tokenized)
				return search(index, tokenized)
			})
		)
	}
	return search
}

module.exports = dict

// module.exports = {tokenize, search}
