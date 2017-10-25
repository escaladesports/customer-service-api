# Escalade Customer Service API
Serverless API for handling various [Escalade Customer Service](http://support.escaladesports.com) site functions

## Table of Contents
- [Installation](#installation)
- [Environment variables](#environment-variables)
- [Running development server](#running-development-server)
- [Deployment](#deployment)
- [Endpoints](#endpoints)
    - [warranty-claim](#warranty-claim)
        - [Warranty Claim Product Types](#warranty-claim-product-types)
    - [contact](#contact)
    	- [Contact Product Types](#contact-product-types)

---

## Installation

Ensure git, node.js 6.1.0+ and yarn are installed

1. Clone repository `git clone https://github.com/escaladesports/customer-service-api.git`
2. `yarn` (installs dependencies)

## Environment variables
Sensitive credentials are located in `env.yml` - make sure that the Google Sheets API key and similar multiline entries should be prefixed by | and a newline in order to preserve newlines. See example.env.yml for expected entries.

## Running development server

Use `yarn dev` to run a local testing server using serverless-offline

## Deployment

Use `serverless deploy` to deploy to AWS Lambda

---

## Endpoints

| Endpoint | POST | 
| -------- | ---- |
| [/warranty-claim](#warranty-claim) | Post new warranty claim
| [/contact](#contact) | Post new contact submission

---

### warranty-claim

Use to post a new warranty claim - will email appropriate addresses (defined in [email.config.js](src/email.config.js)) and send a claim to appropriate datastore (defined in [store.config.js](src/store.config.js)).

| POST variable | Description | Example |
| ------------- | ----------- | ------- |
| name-first | Customer's first name | `Jane` |
| name-last | Customer's last name | `Doe` |
| address | Customer's address | `817 Maxwell Ave` |
| city | Customer's city of residence | `Evansville` |
| state | Customer's state of residence (full state name) | `Indiana` |
| country | Customer's country of residence (full country name) | `United States` |
| email | Customer's contact email address | `example@gmail.com` |
| confirm | Confirmation of customer's contact email, should match `email` | `example@gmail.com` |
| daytime-phone | Customer's daytime contact phone number | `5025556789` |
| evening-phone | Customer's evening contact phone number | `5021234567` |
| preferred-contact-method | Customer's preferred contact method (phone or email) | `phone` or `email` |
| dealer-name | Dealer product was purchased from | `Dick's Sporting Goods` |
| dealer-city | Dealer's city of operation | `Louisville` |
| dealer-state | Dealer's state of operation (full state name) | `Kentucky` |
| dealer-zip | Dealer's zip code | `40203` |
| dealer-country | Dealer's country of operation (full country name) | `United States` |
| product-type | Type of product purchased (see [list of options currently accepted](#warranty-claim-product-types)) - case insensitive | `Basketball Hoop` |
| product-model | Purchased product's model | `DC72E1` |
| product-purchase-date | Date product was purchased | `10-10-2017` |
| product-problem | Description of problem with product | `Rim detached from hoop during normal use a few days after purchase` |
| file-receipt | Path to photo of customer's receipt (single photo only) | `https://cdn.filestackcontent.com/XE1QBZLSnuUtMq36rzLi` |
| file-model-number | Path to photo of product information sticker with model number and date code (single photo only) | `https://cdn.filestackcontent.com/XE1QBZLSnuUtMq36rzLi` |
| files-problem | Path to photo(s) of problem with product - up to 5 photos, separated by `,,` | `https://cdn.filestackcontent.com/cXYQa8xvTBCalrZLVHMI,,https://cdn.filestackcontent.com/ia1dj1z4TJCRYdrRz1Al,,https://cdn.filestackcontent.com/0ttoPTc1S0yrK1JyQgKw` |

#### Warranty Claim Product Types

The type of product selected will determine who is emailed and which datastore the claim will be filed in - each option is associated with a product category. New options can be associated with various categories by editing [`product-type-map.js`](src/product-type-map.js). To add new product categories, add them in [`product-type-map.js`](src/product-type-map.js) and associate them with email address(es) in [`email.config.js`](config/email.config.js) and a datastore in [`store.config.js`](config/store.config.js).

The following options are currently recognized - they are not case-sensitive.

| Option | Category |
| ------ | -------- |
| Air Hockey Table | air-hockey |
| Basketball Hoop | basketball |
| Training Equipment | basketball |
| Pool Table | billiards |
| Electronic Dartboard | darting |
| Foosball Table | foosball |
| Multi-game Table | multi-games |
| Outdoor Game | outdoor-games |
| Pickleball Paddle | pickleball |
| Table Tennis Table | table-tennis |
| select-or-other | other |

---

### contact

Use to post a new contact submission - will email appropriate addresses (defined in [email.config.js](src/email.config.js)).

| POST variable | Description | Example |
| ------------- | ----------- | ------- |
| name | Customer's name | `Jane Doe` |
| email | Customer's contact email address | `example@gmail.com` |
| confirm | Confirmation of customer's contact email, should match `email` | `example@gmail.com` |
| subject | Contact submission subject | `Need to request a product manual` |
| message | Contact submission message | `I checked your website and you do not have a product manual for the Goalrilla DC72E1 - could you send it to me?` |
| about | Type of product being inquired about (see [list of options currently accepted](#contact-product-types)) - case insensitive | `Basketball` |

#### Contact Product Types

The type of product selected will determine who is emailed - each option is associated with a product category. New options can be associated with various categories by editing [`product-type-map.js`](src/product-type-map.js). To add new product categories, add them in [`product-type-map.js`](src/product-type-map.js) and associate them with email address(es) in [`email.config.js`](config/email.config.js).

The following options are currently recognized - they are not case-sensitive.

| Option | Category |
| ------ | -------- |
| Air Hockey | air-hockey |
| Arcade | arcade |
| Archery | archery |
| Basketball | basketball |
| Billiards | billiards |
| Darting | darting |
| Fitness | fitness |
| Foosball | foosball |
| Multi Games | multi-games |
| Playsets | playsets |
| Table Tennis | table-tennis |
| Utility Weights | utility-weights |
| Other | other |