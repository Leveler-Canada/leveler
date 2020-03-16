import app from 'firebase/app';
import 'firebase/database';

const prodConfig = {
	apiKey: "AIzaSyDfJauxeV4jpjItYgKmtw7XIqv2Li_NIIg",
  authDomain: "leveler-8fcc7.firebaseapp.com",
  databaseURL: "https://leveler-8fcc7.firebaseio.com",
  projectId: "leveler-8fcc7",
  storageBucket: "leveler-8fcc7.appspot.com",
  messagingSenderId: "578246253226",
  appId: "1:578246253226:web:a06ab4f67d0403bf038ed3",
  measurementId: "G-3VQQX34FXV"
};

const devConfig = {
  apiKey: "AIzaSyBB5H3JQ-iTItJ2TnNSk68bFjmpBFnfPtk",
  authDomain: "leveler-test.firebaseapp.com",
  databaseURL: "https://leveler-test.firebaseio.com",
  projectId: "leveler-test",
  storageBucket: "leveler-test.appspot.com",
  messagingSenderId: "457958280285",
  appId: "1:457958280285:web:3f42a1be1ecd53f24591b4",
  measurementId: "G-DT7LVBRZ68"
};

const config =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

class Firebase {
  constructor() {
		app.initializeApp(config);
		this.db = app.database();
	}
	currentGroupCount = () => this.db.ref('currentGroup')
	maxGroupCount = () => this.db.ref('maxGroup');
}
export default Firebase;