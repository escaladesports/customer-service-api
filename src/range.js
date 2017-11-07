/**
	Determines the final row in a Google Sheets range
	@param {String} range Range to parse
	@returns {Number} Final row in range
*/
function getFinalRangeRow(range) {
	const num = range.match(/\d+$/);
	const finalRow = num ? parseInt(num[0]) : NaN;

	if (isNaN(finalRow)) {
		return false;
	}
	return finalRow;
}

module.exports = {
	getFinalRangeRow
}