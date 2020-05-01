const functions = require('firebase-functions');
const entriesCounter = require('./entries-counter')

// increment counter if document is added to entries, decrement if document is deleted
exports.onEntryCreate = functions.firestore.document('entries/{entryId}').onCreate(entriesCounter.incrementCounter);
exports.onEntryDelete = functions.firestore.document('entries/{entryId}').onDelete(entriesCounter.decrementCounter);
