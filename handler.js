'use strict';

const quotesApi = require('./src/quotes-api.js');

module.exports.postWarrantyClaim = (event, context, callback) => {
  const body = JSON.parse(event.body);

  const params = {
    userFirstName: body['name-first'],
    userLastName: body['name-last'],
    userAddress: body['address'],
    userCity: body['city'],
    userState: body['state'],
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

    fileReceipt: body['file-receipt'],
    fileModelNumber: body['file-model-number'],
    filesProblem: body['files-problem']
  };

  quotesApi.postQuote(params).then(responseData => {
    const body = JSON.stringify(responseData);
    const response = {
      statusCode: 200,
      body,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": 'true'
      }
    };
    callback(null, response);
  }).catch(err => {
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
  });
};