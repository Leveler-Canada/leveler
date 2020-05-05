// BELOW IS USED FOR GOOGLE SHEETS LINK, REST FOR REACT ROUTER
export const SHEET_DB = 'https://docs.google.com/spreadsheets/d/1FIwWOdiLQh4nLsYaRR7PL-rtEwaARtOW1b0ubPE5Wp4/edit#gid=1582799893&range=';
// REACT ROUTER BELOW
export const HOME = '/';
export const SIGNUP = '/signup';
export const CONTRIBUTE = '/contribute';
export const DISTRIBUTE = '/distribute';
export const SUCCESS = '/success'; // signup success page
export const ABOUT = '/about';
export const RESOURCES = '/resources';
// NON-FIREBASE CONFIG ENV VARIABLES
const { REACT_APP_prod_functionsURL, REACT_APP_dev_functionsURL } = process.env;
export const FUNCTIONS_URL = process.env.NODE_ENV === 'production' ? REACT_APP_prod_functionsURL : REACT_APP_dev_functionsURL;
