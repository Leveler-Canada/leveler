const functions = require('firebase-functions');
const {Firestore, FieldValue} = require('@google-cloud/firestore');

const db = new Firestore();

const entriesCounter = db.doc('misc/entriesCounter');

exports.onEntryCreate = functions.firestore
  .document('entries/{entryId}')
  .onCreate((_snap, _context) => {
    entriesCounter
      .update({
        size: FieldValue.increment(1),
      })
      .catch(err => console.error(err));
  })


exports.onEntryDelete = functions.firestore
  .document('entries/{entryId}')
  .onDelete((_snap, _context) => {
    entriesCounter
      .update({
        size: FieldValue.increment(-1),
      })
      .catch(err => console.error(err));
  })
