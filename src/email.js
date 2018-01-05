const emailConfig = require('../config/email.config.js');
const productTypeMap = require('./product-type-map.js');
const createClient = require('./email-client.js').createClient;

const stage = process.env.STAGE || 'dev';

const regularFontSize = 12;
const headerFontSize = 14;

/**
	Sends a quote request email filled-out with param data to specified recipients
	@param {Object} data Quote request data from form/etc.
	@param {String|Array.<String>} sendTo String or array of strings with email addresses of recipients
	@returns {Promise}
*/
function sendWarrantyClaimEmail(data) {
// take data and send to sendTo
	const client = createClient();

	const category = productTypeMap.lookupWarrantyClaimCategory(data.productType);
	const sendTo = emailConfig[stage].warrantyClaimRecipients[category];

	const filesProblemItems = Array.isArray(data.filesProblem) ? data.filesProblem.map(path => `<li>${path}</li>`).join('') : `<li>${data.filesProblem}</li>`;

	const subject = `New warranty claim submission [${data.requestId}] from Escalade Customer Service website`;
	const message = `<html><body><div style="font-size: ${regularFontSize}px;"><p>Warranty claim received from Escalade Customer Service website:</p>
	<hr>
	<p><b>Claim ID: ${data.requestId}</b></p>
	<p>Submitted at ${data.submissionTimestamp}</p>
	<hr>
	<h2 style="font-size: ${headerFontSize}px;">User</h2>
	<ul>
		<li>First name: ${data.userFirstName}</li>
		<li>Last name: ${data.userLastName}</li>
		<li>Address: ${data.userAddress}</li>
		<li>City: ${data.userCity}</li>
		<li>State: ${data.userState}</li>
		<li>Zip: ${data.userZip}</li>
		<li>Country: ${data.userCountry}</li>
		<li>Email: ${data.userEmail}</li>
		<li>Daytime phone: ${data.userDaytimePhone}</li>
		<li>Evening phone: ${data.userEveningPhone}</li>
		<li>Preferred contact method: ${data.preferredContactMethod}</li>
	</ul>
	<hr>
	<h2 style="font-size: ${headerFontSize}px;">Dealer</h2>
	<ul>
		<li>Dealer name: ${data.dealerName}</li>
		<li>Dealer city: ${data.dealerCity}</li>
		<li>Dealer state: ${data.dealerState}</li>
		<li>Dealer zip code: ${data.dealerZip}</li>
		<li>Dealer country: ${data.dealerCountry}</li>
	</ul>
	<hr>
	<h2 style="font-size: ${headerFontSize}px;">Product information</h2>
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
	</div></body></html>`;

	return client.send({subject, message}, sendTo);
}

function sendContactSubmissionEmail(data) {
	const client = createClient();

	const category = productTypeMap.lookupContactCategory(data.productType);
	const sendTo = emailConfig[stage].contactRecipients[category];

	const subject = 'New contact submission from Escalade Customer Service website';
	const message = `<html><body><div style="font-size: ${regularFontSize}px;"><p>Contact submission received from Escalade Customer Service website:</p>
	<hr>
	<ul>
		<li>Name: ${data.userName}</li>
		<li>Email: ${data.userEmail}</li>
		<li>Contacting about: ${data.productType}</li>
	</ul>
	<hr>
	<p>Begin message:</p>
	<h2 style="font-size: ${headerFontSize}px;">${data.contactSubject}</h2>
	<p><div style="white-space: pre-wrap; word-wrap: break-word;">${data.contactMessage}</div></p>
	</div></body></html>`;

	return client.send({subject, message}, sendTo);
}

module.exports = {
	sendWarrantyClaimEmail,
	sendContactSubmissionEmail
}