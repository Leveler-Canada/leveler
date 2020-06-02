import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/functions';

const {
  REACT_APP_prod_apiKey,
  REACT_APP_prod_authDomain,
  REACT_APP_prod_databaseURL,
  REACT_APP_prod_projectId,
  REACT_APP_prod_storageBucket,
  REACT_APP_prod_messagingSenderId,
  REACT_APP_prod_appId,
  REACT_APP_prod_measurementId,
} = process.env;

const {
  REACT_APP_dev_apiKey,
  REACT_APP_dev_authDomain,
  REACT_APP_dev_databaseURL,
  REACT_APP_dev_projectId,
  REACT_APP_dev_storageBucket,
  REACT_APP_dev_messagingSenderId,
  REACT_APP_dev_appId,
  REACT_APP_dev_measurementId,
} = process.env;

const prodConfig = {
  apiKey: REACT_APP_prod_apiKey,
  authDomain: REACT_APP_prod_authDomain,
  databaseURL: REACT_APP_prod_databaseURL,
  projectId: REACT_APP_prod_projectId,
  storageBucket: REACT_APP_prod_storageBucket,
  messagingSenderId: REACT_APP_prod_messagingSenderId,
  appId: REACT_APP_prod_appId,
  measurementId: REACT_APP_prod_measurementId,
};

const devConfig = {
  apiKey: REACT_APP_dev_apiKey,
  authDomain: REACT_APP_dev_authDomain,
  databaseURL: REACT_APP_dev_databaseURL,
  projectId: REACT_APP_dev_projectId,
  storageBucket: REACT_APP_dev_storageBucket,
  messagingSenderId: REACT_APP_dev_messagingSenderId,
  appId: REACT_APP_dev_appId,
  measurementId: REACT_APP_dev_measurementId,
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
const group = process.env.REACT_APP_LEVELER_GROUP;

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.dbFs = app.firestore();
    this.auth = app.auth();
    this.fieldValue = app.firestore.FieldValue;
    this.analytics = app.analytics();
    this.logEvent = (name, ...args) => app.analytics().logEvent(`${group}_${name}`, ...args);
    this.functions = app.functions();
    this.userCollection = this.dbFs.collection('users');
    this.entriesCollection = this.dbFs.collection('entries');
    this.resourcesCollection = this.dbFs.collection('resources');
    this.commentsCollection = this.dbFs.collectionGroup('comments');
    this.miscCollection = this.dbFs.collection('misc');
  }
  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  
  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}
export default Firebase;
