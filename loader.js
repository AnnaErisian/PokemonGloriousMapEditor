// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '136020743411-cpk58qfpcepspp8h2c7oclktd4n8uani.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  console.log("checkAuth call");
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    authorizeDiv.style.display = 'none';
    loadSheetsApi();
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    authorizeDiv.style.display = 'inline';
  }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
 * Load Sheets API client library.
 */
function loadSheetsApi() {
  console.log("call loadSheetsApi");
  var discoveryUrl =
      'https://sheets.googleapis.com/$discovery/rest?version=v4';
  gapi.client.load(discoveryUrl).then(prepareApplication);
}

/**
 * Prepare the application from modules located in the other js files
 * Document is dependent on what is loaded 
 */
function prepareApplication() {
  console.log("call prepareApplication");
  
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: getParameterByName('ssid'),
    range: 'Sheet1',
    majorDimension: 'COLUMNS'
  }).then(function(response) {
    var res = response.result;
    var data = res.values;
    
    //if data doesn't exist, add defaults and push back
    if(!data) {
      data = [];
      var tilesheetURIs = makeTilesheets(data);
      var iconURIs = makeIcons(data);
      pushbackFullSheet(data);
    }
    
    //Remove tilesheet URIs from result
    var tilesheetURIs = data.splice(0,1)[0];
    var iconURIs = data.splice(0,1)[0];

    //send URI column to PaletteModule
    paletteModule.setTilesets(tilesheetURIs, iconURIs);
    
    //send map data to MapModule
    mapModule.createModule(data);
    paletteModule.createModule(data);
    
    //render page
    mapModule.render();
    paletteModule.render();
//    layerModule.render();
//    managementModule.render();
    
  }, function(response) {
    console.log('Error: ' + response.result.error.message);
  });
}

/**
 * Get a query parameter by name
 * http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 */
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * Adds default tilesheets to the data
 * Should be called before data is spliced into parts
 */
function makeTilesheets(data) {
  data.push([1,2,3,4]);
  data[0][0] = "img/caves.png";
  data[0][1] = "img/gyms.png";
  data[0][2] = "img/inside.png";
  data[0][3] = "img/outside.png";
}

/**
 * Adds default tilesheet icons to the data
 * Should be called before data is spliced into parts
 */
function makeIcons(data) {
  data.push([1,2,3,4]);
  data[1][0] = "img/cavesIcon.png";
  data[1][1] = "img/gymsIcon.png";
  data[1][2] = "img/insideIcon.png";
  data[1][3] = "img/outsideIcon.png";
}

/**
 * Pushes the full sheet back to the google document
 */
function pushbackFullSheet(data) {  
  gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: getParameterByName("ssid"),
    range: 'Sheet1',
    valueInputOption: 'RAW',
    majorDimension: 'COLUMNS',
    values: data
  }).then(function(response) {}, function(response) {
    console.log('Error: ' + response.result.error.message);
  });
}

$(document).ready(checkAuth);
