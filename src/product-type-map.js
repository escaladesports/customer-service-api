const productCategories = [
	{id: 'air-hockey', associatedOptions: ['Air Hockey Table']},
	{id: 'basketball', associatedOptions: ['Basketball Hoop', 'Training Equipment']},
	{id: 'billiards', associatedOptions: ['Pool Table']},
	{id: 'darting', associatedOptions: ['Electronic Dartboard']},
	{id: 'foosball', associatedOptions: ['Foosball Table']},
	{id: 'multi-games', associatedOptions: ['Multi-Game Table']},
	{id: 'outdoor-games', associatedOptions: ['Outdoor Game']},
	{id: 'pickleball', associatedOptions: ['Pickleball Paddle']},
	{id: 'table-tennis', associatedOptions: ['Table Tennis Table']},
	{id: 'other', associatedOptions: ['select-or-other']}
];

/**
	Looks up product category ID based on product type field data
	@param {String} productType Product Type POST/request data
	@returns {String} Product category ID string
*/
function lookupCategoryId(productType) {
	// dummy function
	return 'air-hockey';
}

module.exports = {
	lookupCategory
}