const functions = require('firebase-functions');
const firestore = require('@google-cloud/firestore');

const client = new firestore.v1.FirestoreAdminClient();

const now = new Date();
const bucket = `gs://leveler-8fcc7.appspot.com/firestore_backups/${now.toISOString()}`;

exports.scheduledFirestoreExport = functions.pubsub.schedule('every 24 hours').onRun((_ctx) => {
  const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
  const databaseName = client.databasePath(projectId, '(default)');

  return client.exportDocuments({
    name: databaseName,
    outputUriPrefix: bucket,
    collectionIds: []
  })
  .then(responses => {
    const response = responses[0];
    console.log(`Operation Name: ${response['name']}`);
    return response;
  })
  .catch(err => {
    console.error(err);
    throw new Error('Export operation failed');
  });
});
