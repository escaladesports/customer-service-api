const isEmail = require('is-email');
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
			'userFirstName',
			'userLastName',
			'userAddress',
			'userCity',
			'userState',
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
	if (!validateEmail(params.userEmail, params.userEmailConfirm)) {
		return false;
	}
	if (!validateFileField(params.fileReceipt, 1, 1)) {
		return false;
	}
	if (!validateFileField(params.fileModelNumber, 1, 1)) {
		return false;
	}
	if (!validateFileField(params.filesProblem, 1, 5)) {
		return false;
	}
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
	if (!validateEmail(params.userEmail, params.userEmailConfirm)) {
		return false;
	}
	if (!validateContactCategory(params.productType)) {
		return false;
	}
	return true;
}

module.exports = {
	validateWarrantyClaimPost,
	validateContactPost
}