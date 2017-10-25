const emailConfig = require('../config/email.config.js');
const productTypeMap = require('./product-type-map.js');
const createClient = require('./email-client.js').createClient;

/**
	Sends a quote request email filled-out with param data to specified recipients
	@param {Object} data Quote request data from form/etc.
	@param {String|Array.<String>} sendTo String or array of strings with email addresses of recipients
	@returns {Promise}
*/
function sendWarrantyClaimEmail(data) {
// take data and send to sendTo
	const client = createClient();

	const category = productTypeMap.lookupCategoryId(data.productType);
	const sendTo = emailConfig.warrantyClaimRecipients[category];

	const filesProblemItems = Array.isArray(data.filesProblem) ? data.filesProblem.map(path => `<li>${path}</li>`).join('') : `<li>${data.filesProblem}</li>`;

	const subject = 'New warranty claim submission from Escalade Customer Service website';
	const message = `<html><body><p>Warranty claim received from Escalade Customer Service website:</p>
	<p>Request ID: ${data.requestId}</p>
	<h2>User</h2>
	<ul>
		<li>First name: ${data.userFirstName}</li>
		<li>Last name: ${data.userLastName}</li>
		<li>Address: ${data.userAddress}</li>
		<li>City: ${data.userCity}</li>
		<li>State: ${data.userState}</li>
		<li>Country: ${data.userCountry}</li>
		<li>Email: ${data.userEmail}</li>
		<li>Daytime phone: ${data.userDaytimePhone}</li>
		<li>Evening phone: ${data.userEveningPhone}</li>
		<li>Preferred contact method: ${data.preferredContactMethod}</li>
	</ul>
	<h2>Dealer</h2>
	<ul>
		<li>Dealer name: ${data.dealerName}</li>
		<li>Dealer city: ${data.dealerCity}</li>
		<li>Dealer state: ${data.dealerState}</li>
		<li>Dealer zip code: ${data.dealerZip}</li>
		<li>Dealer country: ${data.dealerCountry}</li>
	</ul>
	<h2>Product information</h2>
	<ul>
		<li>Product type: ${data.productType}</li>
		<li>Product model: ${data.productModel}</li>
		<li>Product purchase date: ${data.productPurchaseDate || 'Not specified'}</li>
		<li>Problem with product: ${data.productProblem || 'Not specified'}</li>
		<li>Receipt photo: ${data.fileReceipt[0]}</li>
		<li>Model number photo: ${data.fileModelNumber[0]}</li>
		<li>Photo(s) of problem:
			<ul>${filesProblemItems}</ul>
		</li>
	</ul>
	</body></html>`;

	return client.send({subject, message}, sendTo);
}

module.exports = {
	sendWarrantyClaimEmail
}