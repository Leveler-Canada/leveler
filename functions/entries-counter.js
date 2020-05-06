const {Firestore, FieldValue} = require('@google-cloud/firestore');

const db = new Firestore();

const entriesMeta = db.doc('misc/entriesMeta');

// increment collection size
module.exports.incrementCounter = (_snap, _context) => {
  entriesMeta
    .update({
      size: FieldValue.increment(1),
    })
    .catch(err => console.error(err));
};

// decrement collection size
module.exports.decrementCounter = (_snap, _context) => {
  entriesMeta
    .update({
      size: FieldValue.increment(-1),
    })
    .catch(err => console.error(err));
};
