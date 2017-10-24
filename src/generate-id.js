const productTypeMap = require('./product-type-map.js');

/**
	Creates warranty claim ID from request data
	@param {Oject} data Warranty Claim request data
	@param {String} data.productType Product type data from warranty claim request
	@param {Number} data.rowNum Datastore row/record number for this record
	@returns {String} ID string for this claim
*/
function createWarrantyClaimId(data) {
	const prefix = productTypeMap.lookupCategoryId(data.productType);
	const suffix = data.rowNum;

	return `${prefix}-${suffix}`;
}

module.exports = {
	createWarrantyClaimId
}