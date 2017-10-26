module.exports = {
	production: {
		spreadsheetId: '17bLYtG8zmZjttHJePBODOYkm30tI31YdE5Yvn5Tpl88',
		spreadsheetNames: {
			// category-key : spreadsheet-name
			"air-hockey" : 'air-hockey',
			"basketball" : 'basketball',
			"billiards" : 'billiards',
			"darting" : 'darting',
			"foosball" : 'foosball',
			"multi-games" : 'multi-games',
			"outdoor-games" : 'outdoor-games',
			"pickleball" : 'pickleball',
			"table-tennis" : 'table-tennis',
			"other" : 'other'
		}
	}
}

// dev settings duplicate for now
module.exports.dev = Object.assign({}, module.exports.production);