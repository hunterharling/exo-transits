/** 
 * Main urls 
 * 
 */

export const CURRENT_PATH = window.location.href;
export const MOBILE_DEBUG_URL = 'http://192.168.1.232:8085';
export const LOCALHOST = 'http://127.0.0.1:8000';
const SERVER = 'https://www.exotransits.com';
export const BASE_URL = (
  CURRENT_PATH.includes("localhost" || CURRENT_PATH.includes("127.0.0"))
    ? LOCALHOST
    : SERVER
);
/** Frontend */

// auth / home
export const HOME = '/';
export const LOGIN = '/login';
export const LOGOUT = '/logout';
export const SIGNUP = '/signup';
export const RESET_PASSWORD = '/reset-password';
export const CHANGE_PASSWORD = '/change-password';

// components
export const SEARCH = '/search';
export const ABOUT = '/about';
export const SETTINGS = '/settings';
export const DATA_SOURCES = '/data-sources';
export const EXOPLANET = '/exoplanet';
export const TRANSITS = '/transits';
export const TRANSIT_FULL = '/transit/full';
export const PLANNER = '/planner';

/** API */

// auth
export const USER_DATA = BASE_URL + '/api/auth/';
export const SIGNUP_API = BASE_URL + '/rest-auth/registration/';
export const LOGIN_API = BASE_URL + '/rest-auth/login/';
export const LOGOUT_API = BASE_URL + '/rest-auth/logout/';
export const CHANGE_PASSWORD_API = BASE_URL + '/api/change_password/';
export const RESET_PASSWORD_API = BASE_URL + '/api/reset_password/';
export const UPDATESW = BASE_URL + "/api/updatesw/";
export const PASSWORD_RESET_CONFIRM_API = BASE_URL + '/rest-auth/password/reset/confirm/';
export const UPDATE_USERPROFILE = BASE_URL + '/api/update_userprofile/';
// objects
export const SETTINGS_API = BASE_URL + '/api/settings/';
export const UPCOMING_TRANSIT_API = BASE_URL + '/api/get_upcoming_transits/';
export const CREATE_UPCOMING_API = BASE_URL + '/api/create_upcoming_transit/';
export const DELETE_UPCOMING = BASE_URL + '/api/delete_upcoming_transit/';
// astro
export const TRANSITS_API = BASE_URL + '/api/scrape_transits/';
export const TRANSITS_API1 = BASE_URL + '/api/cache_transits/';
export const STAR_API = BASE_URL + '/api/star_data/';
// contact
export const CONTACT_API = BASE_URL + "/api/contact/";
