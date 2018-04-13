const google = require('googleapis');

const googleSheetsClientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
const googleSheetsKey = process.env.GOOGLE_SHEETS_API_KEY

/**
	Creates a JWT client with the given credentials
	@param {String} clientEmail Google project client email
	@param {String} privateKey Google project private key
	@param {Array.<String} scopes Google API client scopes
	@returns {Object} Google auth client
*/
function authorizeGoogleJWT(clientEmail, privateKey, scopes) {
	return new google.auth.JWT(
		clientEmail,
		null,
		privateKey,
		scopes,
		null
	)
}

/**
	Creates an auth client prepped for a google sheets project
	@param {Boolean} readOnly Set to true for a readonly client
	@returns {Promise.<Object>} Promise resolving to auth client
*/
function authenticateGoogleSheets(readonly) {
	const scopes = [(readonly ? 'https://www.googleapis.com/auth/spreadsheets.readonly' : 'https://www.googleapis.com/auth/spreadsheets')];
	return Promise.resolve(authorizeGoogleJWT(googleSheetsClientEmail, googleSheetsKey, scopes))
}

module.exports = {
	authenticateGoogleSheets
}