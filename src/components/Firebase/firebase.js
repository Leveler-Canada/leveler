import app from "firebase/app";
import "firebase/database";

const {
  REACT_APP_prod_apiKey,
  REACT_APP_prod_authDomain,
  REACT_APP_prod_databaseURL,
  REACT_APP_prod_projectId,
  REACT_APP_prod_storageBucket,
  REACT_APP_prod_messagingSenderId,
  REACT_APP_prod_appId,
  REACT_APP_prod_measurementId
} = process.env;

const {
  REACT_APP_dev_apiKey,
  REACT_APP_dev_authDomain,
  REACT_APP_dev_databaseURL,
  REACT_APP_dev_projectId,
  REACT_APP_dev_storageBucket,
  REACT_APP_dev_messagingSenderId,
  REACT_APP_dev_appId,
  REACT_APP_dev_measurementId
} = process.env;

const prodConfig = {
  //kindly delete the comments

  // apiKey: "AIzaSyDfJauxeV4jpjItYgKmtw7XIqv2Li_NIIg",
  // authDomain: "leveler-8fcc7.firebaseapp.com",
  // databaseURL: "https://leveler-8fcc7.firebaseio.com",
  // projectId: "leveler-8fcc7",
  // storageBucket: "leveler-8fcc7.appspot.com",
  // messagingSenderId: "578246253226",
  // appId: "1:578246253226:web:a06ab4f67d0403bf038ed3",
  // measurementId: "G-3VQQX34FXV"

  apiKey: REACT_APP_prod_apiKey,
  authDomain: REACT_APP_prod_authDomain,
  databaseURL: REACT_APP_prod_databaseURL,
  projectId: REACT_APP_prod_projectId,
  storageBucket: REACT_APP_prod_storageBucket,
  messagingSenderId: REACT_APP_prod_messagingSenderId,
  appId: REACT_APP_prod_appId,
  measurementId: REACT_APP_prod_measurementId
};

const devConfig = {
  //kindly delete the comments

  // apiKey: "AIzaSyBB5H3JQ-iTItJ2TnNSk68bFjmpBFnfPtk",
  // authDomain: "leveler-test.firebaseapp.com",
  // databaseURL: "https://leveler-test.firebaseio.com",
  // projectId: "leveler-test",
  // storageBucket: "leveler-test.appspot.com",
  // messagingSenderId: "457958280285",
  // appId: "1:457958280285:web:3f42a1be1ecd53f24591b4",
  // measurementId: "G-DT7LVBRZ68"

  apiKey: REACT_APP_dev_apiKey,
  authDomain: REACT_APP_dev_authDomain,
  databaseURL: REACT_APP_dev_databaseURL,
  projectId: REACT_APP_dev_projectId,
  storageBucket: REACT_APP_dev_storageBucket,
  messagingSenderId: REACT_APP_dev_messagingSenderId,
  appId: REACT_APP_dev_appId,
  measurementId: REACT_APP_dev_measurementId
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.database();
  }
  currentGroupCount = () => this.db.ref("currentGroup");
  maxGroupCount = () => this.db.ref("maxGroup");
}
export default Firebase;
