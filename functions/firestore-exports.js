const firestore = require('@google-cloud/firestore');

// export Firestore database to a Google Cloud bucket
const exportFirestoreToBucket = (_ctx) => {
  // create Firestore Admin client
  const client = new firestore.v1.FirestoreAdminClient();

  // get current Firebase project ID
  const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;

  // use the current datetime as part of the path name for the dump
  const now = new Date();
  const bucket = `gs://${projectId}.appspot.com/firestore_backups/${now.toISOString()}`;

  // connect to Firestore
  const databaseName = client.databasePath(projectId, '(default)');

  // copy Firestore database to folder in bucket
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
};

module.exports.exportFirestoreToBucket = exportFirestoreToBucket;
