const isEmail = require('is-email');
const isValidZip = require('is-valid-zip');
const productTypeMap = require('./product-type-map');

/*
	Checks for missing keys in request data
	@param {Array.<String>} keys Keys/properties to check for on request data
	@param {Object} data Request data to validate
	@returns {Boolean} False if validation fails, true if successful
*/
function checkMissingKeys(keys, data) {
	for (let key of keys) {
		if (!data[key]) {
			console.log('missing key '+key);
			return false;
		}
	}
	return true;
}

/**
	Checks for valid email address with matching confirmation email address
	@param {String} email Email address to validate
	@param {String} confirmationEmail Confirmation email data (must match first param for email to be valid)
	@returns {Boolean} False if validation fails, true if successful
*/
function validateEmail(email, confirmationEmail) {
	if (email !== confirmationEmail) {
		return false;
	}
	if (!isEmail(email)) {
		return false;
	}
	return true;
}

/**
	Checks for valid US zip code
	@param {String|Number} zip Zip code to validate
	@returns {Boolean} False if validation fails, true if successful
*/
function validateZip(zip) {
	return isValidZip(zip);
}

/**
	Checks text data length
	@param {String} text Text to validate length of
	@param {Number} maxLength Maximum character length of text
	@returns {Boolean} False if validation fails, true if successful
*/
function validateTextLength(text, maxLength) {
	if (text.toString().length > parseInt(maxLength)) {
		return false;
	}
	return true;
}

/**
	Checks file field to ensure it has a number of files within the correct range
	@param {Array.<String>|String} files Array of file path strings or a single file path string
	@param {Number} minCount Minimum number of files allowed in field
	@param {Number} maxCount Maximum number of files allowed in field
	@returns {Boolean} False if validation fails, true if successful
*/
function validateFileField(files, minCount, maxCount) {
	if (Array.isArray(files) && (files.length < minCount || files.length > maxCount)) {
		return false;
	}
	// if it isn't an array, we can assume it's a single file, so we'll just check min
	else if (!Array.isArray(files) && minCount > 1) {
		return false;
	}
	return true;
}

/**
	Checks product type to ensure it's a recognized warranty claim product type option
	@param {String} productType Product type string to validate
	@returns {Boolean} False if validation fails, true if successful
*/
function validateWarrantyCategory(productType) {
	const category = productTypeMap.lookupWarrantyClaimCategory(productType);
	return (category ? true : false);
}

/**
	Checks product type to ensure it's a recognized contact product type option
	@param {String} productType Product type string to validate
	@returns {Boolean} False if validation fails, true if successful
*/
function validateContactCategory(productType) {
	const category = productTypeMap.lookupContactCategory(productType);
	return (category ? true : false);
}






function validateWarrantyClaimPost(params) {
	// check for missing data
	if (!checkMissingKeys([
			'submissionTimestamp',
			'userFirstName',
			'userLastName',
			'userAddress',
			'userCity',
			'userState',
			'userZip',
			'userCountry',
			'userEmail',
			'userEmailConfirm',
			'userDaytimePhone',
			'userEveningPhone',
			'preferredContactMethod',
			'dealerName',
			'dealerCity',
			'dealerState',
			'dealerZip',
			'dealerCountry',
			'productType',
			'productModel',
			//'productPurchaseDate',
			//'productProblem',
			'fileReceipt',
			'fileModelNumber',
			'filesProblem'
		], params)) {
		return false;
	}
	// field length validation
	if (
		!validateTextLength(params.userFirstName, 255) || !validateTextLength(params.userLastName, 255) ||
		!validateTextLength(params.userAddress, 2000) || !validateTextLength(params.userCity, 255) ||
		!validateTextLength(params.userState, 255) || !validateTextLength(params.userZip, 12) ||
		!validateTextLength(params.userCountry, 255) || !validateTextLength(params.userEmail, 255) ||
		!validateTextLength(params.userEmailConfirm, 255) || !validateTextLength(params.userDaytimePhone, 255) ||
		!validateTextLength(params.userEveningPhone, 255) || !validateTextLength(params.preferredContactMethod, 255) ||
		!validateTextLength(params.dealerName, 255) || !validateTextLength(params.dealerCity, 255) ||
		!validateTextLength(params.dealerState, 255) || !validateTextLength(params.dealerZip, 255) ||
		!validateTextLength(params.dealerCountry, 255) || !validateTextLength(params.productType, 255) ||
		!validateTextLength(params.productModel, 255) ||
		(params.productPurchaseDate && !validateTextLength(params.productPurchaseDate, 255)) ||
		(params.productProblem && !validateTextLength(params.productProblem, 50000)) ||
		!validateTextLength(params.fileReceipt[0], 1000) || !validateTextLength(params.fileModelNumber[0], 1000)
	) {
		console.log('invalid field length');
		return false;
	}
	for (let file of params.filesProblem) {
		if (!validateTextLength(file, 1000)) {
			console.log('invalid field length');
			return false;
		}
	}
	// email validation
	if (!validateEmail(params.userEmail, params.userEmailConfirm)) {
		return false;
	}
	// file field validation
	if (!validateFileField(params.fileReceipt, 1, 1)) {
		return false;
	}
	if (!validateFileField(params.fileModelNumber, 1, 1)) {
		return false;
	}
	if (!validateFileField(params.filesProblem, 1, 5)) {
		return false;
	}
	// product type validation
	if (!validateWarrantyCategory(params.productType)) {
		return false;
	}
	return true;
}

function validateContactPost(params) {
	// check for missing data
	if (!checkMissingKeys([
		'userName',
		'userEmail',
		'userEmailConfirm',
		'contactSubject',
		'contactMessage',
		'productType'
	], params)) {
		return false;
	}
	// field length validation
	if (
		!validateTextLength(params.userName, 255) || !validateTextLength(params.userEmail, 255) ||
		!validateTextLength(params.userEmailConfirm, 255) || !validateTextLength(params.contactSubject, 255) ||
		!validateTextLength(params.contactMessage, 50000) || !validateTextLength(params.productType, 255)
	) {
		return false;
	}
	// zip validation
	if (!validateZip(params.userZip)) {
		return false;
	}
	// email validation
	if (!validateEmail(params.userEmail, params.userEmailConfirm)) {
		return false;
	}
	// product type/category validation
	if (!validateContactCategory(params.productType)) {
		return false;
	}
	return true;
}

module.exports = {
	validateWarrantyClaimPost,
	validateContactPost
}