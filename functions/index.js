const functions = require('firebase-functions');
const validateUniqueEmail = require('./validateUniqueEmail');
const firestoreExports = require('./firestore-exports');
const entriesCounter = require('./entries-counter')

// validate that email is not already in firestore
exports.validateUniqueEmail = functions.https.onRequest(validateUniqueEmail);

// dump Firestore database to Google Cloud bucket once every 24 hours
exports.scheduledFirestoreExport = functions.pubsub.schedule('every 24 hours').onRun(firestoreExports.exportFirestoreToBucket);

// increment counter if document is added to entries, decrement if document is deleted
exports.onEntryCreate = functions.firestore.document('entries/{entryId}').onCreate(entriesCounter.incrementCounter);
exports.onEntryDelete = functions.firestore.document('entries/{entryId}').onDelete(entriesCounter.decrementCounter);
