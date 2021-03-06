'use strict';

require('envdotjs').load()

const serviceApi = require('./src/customer-service-api.js');
const timestamp = require('./src/timestamp.js');

function sendJsonResponse(data, callback) {
  const body = JSON.stringify(data);
  const response = {
    statusCode: 200,
    body,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": 'true'
    }
  };
  callback(null, response);
}

function sendJsonError(err, callback) {
  console.error('Error:');
  console.dir(err);

  let msg = 'There was a problem with your request. Please try again later';

  if (err.code === 'malformed') {
    msg = 'The request data was malformed- ensure parameter data is correct and try again.'
  }

  const response = {
    statusCode: 400,
    body: JSON.stringify({
      errors: [msg]
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    }
  };
  callback(null, response);
}





function postWarrantyClaim(event, context, callback) {
  const body = JSON.parse(event.body);

  const params = {
    submissionTimestamp: timestamp.createCurrentTimestamp(),
    userFirstName: body['name-first'],
    userLastName: body['name-last'],
    userAddress: body['address'],
    userCity: body['city'],
    userState: body['state'],
    userZip: body['zip'],
    userCountry: body['country'],
    userEmail: body['email'],
    userEmailConfirm: body['confirm'],
    userDaytimePhone: body['daytime-phone'],
    userEveningPhone: body['evening-phone'],
    preferredContactMethod: body['preferred-contact-method'],

    dealerName: body['dealer-name'],
    dealerCity: body['dealer-city'],
    dealerState: body['dealer-state'],
    dealerZip: body['dealer-zip'],
    dealerCountry: body['dealer-country'],

    productType: body['product-type'],
    productModel: body['product-model'],
    productPurchaseDate: body['product-purchase-date'],
    productProblem: body['product-problem'],

    fileReceipt: body['file-receipt'].split(',,'),
    fileModelNumber: body['file-model-number'].split(',,'),
    filesProblem: body['files-problem'].split(',,') // multiple files possible
  };

  serviceApi.postWarrantyClaim(params).then(responseData => {
    return sendJsonResponse(responseData, callback);
  }).catch(err => {
    return sendJsonError(err, callback);
  });
}

function postContact(event, context, callback) {
  const body = JSON.parse(event.body);

  const params = {
    userName: body['name'],
    userEmail: body['email'],
    userEmailConfirm: body['confirm'],
    contactSubject: body['subject'],
    contactMessage: body['message'],
    productType: body['about']
  };

  serviceApi.postContact(params).then(responseData => {
    return sendJsonResponse(responseData, callback);
  }).catch(err => {
    return sendJsonError(err, callback);
  });

}

module.exports = {
  postWarrantyClaim,
  postContact
};