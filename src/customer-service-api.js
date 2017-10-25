const request = require('request-promise-native');
const queryValidator = require('./query-validator.js');
const generateId = require('./generate-id.js');
const store = require('./store.js');
const range = require('./range.js');
const email = require('./email.js');

function postWarrantyClaimActions(data) {
	// post google sheets request
	// order is important, do this first so we can pass claim # to email properly
	return store.saveWarrantyClaim(data)
	.then(res => {
		// add in additional information from google sheets
		const rowNum = range.getFinalRangeRow(res.updates.updatedRange);
		const idData = Object.assign({}, data, { rowNum });

		// add in unique ID from google sheets row data + claim data
		const updatedData = Object.assign({}, data, { requestId: generateId.createWarrantyClaimId(idData) });

		// email relevant parties
		return email.sendWarrantyClaimEmail(updatedData)
	});
}




/**
* Use to make a request to the Escalade manuals API (if passed valid data)
* @param {Object} data Request data
* @param {String} data.brand Brand name to retrieve manuals for
* @returns {Promise.<Object>} Returns a promise resolving to a JSON response from the API (or an error
* if passed invalid data)
* @example
* manualsApi.manualsRequest({brand: 'goalrilla'}).then( ... )
*/
function postWarrantyClaim(data) {
	// validate
	if (!queryValidator.validateWarrantyClaimPost(data)) {
		return Promise.reject({
			code: 'malformed',
			error: new Error('Malformed request data')
		});
	}
	// make request if valid
	return postWarrantyClaimActions(data);
}

function postContact(data) {
	// validate
	// make request if valid
	return Promise.resolve(true);
}

module.exports = {
	postWarrantyClaim,
	postContact
}