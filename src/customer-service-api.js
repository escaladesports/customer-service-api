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
* Use to post a warranty claim
* @param {Object} data Request data
* @returns {Promise} Returns a promise
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

/**
* Use to post a contact request
* @param {Object} data Request data
* @returns {Promise} Returns a promise
*/
function postContact(data) {
	// validate
	if (!queryValidator.validateContactPost(data)) {
		return Promise.reject({
			code: 'malformed',
			error: new Error('Malformed request data')
		});
	}
	// make request if valid
	return Promise.resolve(true);
}

module.exports = {
	postWarrantyClaim,
	postContact
}