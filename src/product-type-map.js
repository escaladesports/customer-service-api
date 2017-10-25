const warrantyCategories = [
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

const contactCategories = [
	{id: 'air-hockey', associatedOptions: ['air hockey']},
	{id: 'arcade', associatedOptions: ['arcade']},
	{id: 'archery', associatedOptions: ['archery']},
	{id: 'basketball', associatedOptions: ['basketball']},
	{id: 'billiards', associatedOptions: ['billiards']},
	{id: 'darting', associatedOptions: ['darting']},
	{id: 'fitness', associatedOptions: ['fitness']},
	{id: 'foosball', associatedOptions: ['foosball']},
	{id: 'multi-games', associatedOptions: ['multi games']},
	{id: 'playsets', associatedOptions: ['playsets']},
	{id: 'table-tennis', associatedOptions: ['table tennis']},
	{id: 'utility-weights', associatedOptions: ['utility weights']},
	{id: 'other', associatedOptions: ['other']}
]

/**
	Looks up product category ID based on product type field data
	@param {String} productType Product Type POST/request data
	@returns {String} Product category ID string
*/
function lookupCategoryId(productType, categoryMap) {
	for (let category of categoryMap) {
		if (category.associatedOptions.indexOf(productType.toLowerCase()) !== -1) {
			return category.id;
		}
	}
	return null;
}

function lookupWarrantyClaimCategory(productType) {
	return lookupCategoryId(productType, warrantyCategories);
}

function lookupContactCategory(productType) {
	return lookupCategoryId(productType, contactCategories);
}

module.exports = {
	lookupWarrantyClaimCategory,
	lookupContactCategory
}