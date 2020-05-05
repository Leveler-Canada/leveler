const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp();

const db = admin.firestore();

const validateUniqueEmail = async (req, res) => {
    var query = await db.collectionGroup('private').where('email','==',req.query.email).get();
    for (const doc of query.docs){
        if (doc.exists){
            cors(req, res, () => {
                res.status(300).send(doc.data())
            });
        }
        return;
    }
    cors(req, res, () => {
        res.status(200).send(true);
    });
}

module.exports = validateUniqueEmail;