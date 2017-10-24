const productCategories = [
	{id: 'air-hockey', associatedOptions: ['air hockey table']},
	{id: 'basketball', associatedOptions: ['basketball hoop', 'training equipment']},
	{id: 'billiards', associatedOptions: ['pool table']},
	{id: 'darting', associatedOptions: ['electronic dartboard']},
	{id: 'foosball', associatedOptions: ['foosball table']},
	{id: 'multi-games', associatedOptions: ['multi-game table']},
	{id: 'outdoor-games', associatedOptions: ['outdoor game']},
	{id: 'pickleball', associatedOptions: ['pickleball paddle']},
	{id: 'table-tennis', associatedOptions: ['table tennis table']},
	{id: 'other', associatedOptions: ['select-or-other']}
];

/**
	Looks up product category ID based on product type field data
	@param {String} productType Product Type POST/request data
	@returns {String} Product category ID string
*/
function lookupCategoryId(productType) {
	for (let category of productCategories) {
		if (category.associatedOptions.indexOf(productType.toLowerCase()) !== -1) {
			return category.id;
		}
	}
	return null;
}

module.exports = {
	lookupCategoryId
}