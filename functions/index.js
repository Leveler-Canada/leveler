const functions = require('firebase-functions');
const firestoreExports = require('./firestore-exports');

// dump Firestore database to Google Cloud bucket once every 24 hours
exports.scheduledFirestoreExport = functions.pubsub.schedule('every 24 hours').onRun(firestoreExports.exportFirestoreToBucket);
