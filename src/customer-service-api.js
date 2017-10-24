const request = require('request-promise-native');
const queryValidator = require('./query-validator.js');
const store = require('./store.js');
const range = require('./range.js');
const email = require('./email.js');
const emailConfig = require('../config/email.config.js');

function postQuoteActions(data) {
	// post google sheets request
	// order is important, do this first so we can pass claim # to email properly
	return store.saveQuoteRequest(data)
	.then(res => {
		// add in additional information from google sheets
		const requestId = range.getFinalRangeRow(res.updates.updatedRange);
		const updatedData = Object.assign({}, data, { requestId });
		// email relevant parties
		return email.sendQuoteRequestEmail(updatedData, emailConfig.quoteRequestRecipients)
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
module.exports.postWarrantyClaim = function(data) {
	// validate
	if (!queryValidator.validateWarrantyClaimPost(data)) {
		return Promise.reject({
			code: 'malformed',
			error: new Error('Malformed request data')
		});
	}
	// make request if valid
	return postQuoteActions(data);
}