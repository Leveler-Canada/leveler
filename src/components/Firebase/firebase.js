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
  apiKey: "AIzaSyDfJauxeV4jpjItYgKmtw7XIqv2Li_NIIg",
  authDomain: "leveler-8fcc7.firebaseapp.com",
  databaseURL: "https://leveler-8fcc7.firebaseio.com",
  projectId: "leveler-8fcc7",
  storageBucket: "leveler-8fcc7.appspot.com",
  messagingSenderId: "578246253226",
  appId: "1:578246253226:web:b0572eabba5ecb2c038ed3",
	measurementId: "G-J1ZFGCXWZR",
	
	// apiKey: "AIzaSyDfJauxeV4jpjItYgKmtw7XIqv2Li_NIIg",
  // authDomain: "leveler-8fcc7.firebaseapp.com",
  // databaseURL: "https://leveler-8fcc7.firebaseio.com",
  // projectId: "leveler-8fcc7",
  // storageBucket: "leveler-8fcc7.appspot.com",
  // messagingSenderId: "578246253226",
  // appId: "1:578246253226:web:b0572eabba5ecb2c038ed3",
  // measurementId: "G-J1ZFGCXWZR"

};

const config =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

class Firebase {
  constructor() {
		app.initializeApp(prodConfig);
		this.db = app.database();
	}
	currentGroupCount = () => this.db.ref('currentGroup')
	maxGroupCount = () => this.db.ref('maxGroup');
}
console.log(Firebase)
export default Firebase;