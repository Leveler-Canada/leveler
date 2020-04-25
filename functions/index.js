const functions = require('firebase-functions');
const validateUniqueEmail = require('./validateUniqueEmail');

exports.validateUniqueEmail = functions.https.onRequest(validateUniqueEmail);