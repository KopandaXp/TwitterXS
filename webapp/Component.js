var oParam = {};
var oHeader = {};

function to_rfc3986(s) {
	var tmp = encodeURIComponent(s);
	tmp = tmp.replace(/!/g, '%21');
	tmp = tmp.replace(/\*/g, '%2A');
	tmp = tmp.replace(/\(/g, '%28');
	tmp = tmp.replace(/\)/g, '%29');
	tmp = tmp.replace(/\'/g, '%27');
	return tmp;
}

// accepts object with additional parameters.
// sURLPrefix 
// function makeAuthorizationString (sURLPrefix, sURLParameters, Parameters) {
//     var oAPIData = {
// 		status: "Hello World"
// 	};
// 	var sMethod = "POST",
// 		sOrigin = oHeader.clientprotocol + "://" + oHeader["~server_name"],
// 		sBaseURL = sOrigin + sURLPrefix, // "/twitter/1.1/statuses/update.json",
// 		// sURLParameters = "?include_entities=true",
// 		sURL = sBaseURL + sURLParameters,
// 		// sStatus = "Hello world",
// 		// sIncludeEntities = "true",
// 		sOAuthConsumerKey = "mjpp4cUeysMM0ruMjjPCjJMZc",
// 		sOAuthNonce = btoa(Math.random() + "" + Math.random() + Math.random() + Math.random()).replace(/[^a-zA-Z0-9]/g, ""),
// 		sOAuthSignatureMethod = "HMAC-SHA1",
// 		sOAuthTimestamp = Math.floor(Date.now() / 1000) + "",
// 		sOAuthToken = "",
// 		sOAuthVersion = "1.0";
// 		// oauth_callback="http%3A%2F%2Flocalhost%2Fsign-in-with-twitter%2F",
// 		// oauth_consumer_key="cChZNFj6T5R0TigYB9yd1w",
// 		// oauth_nonce="ea9ec8429b68d6b77cd5600adbbb0456",
// 		// oauth_signature="F1Li3tvehgcraF8DMJ7OyxO4w9Y%3D",
// 		// oauth_signature_method="HMAC-SHA1",
// 		// oauth_timestamp="1318467427",
// 		// oauth_version="1.0"
// 	var oOAuthKeys = {
// 		status: sStatus,
// 		include_entities: sIncludeEntities,
// 		oauth_consumer_key: sOAuthConsumerKey,
// 		oauth_nonce: sOAuthNonce,
// 		oauth_signature_method: sOAuthSignatureMethod,
// 		oauth_timestamp: sOAuthTimestamp,
// 		oauth_token: sOAuthToken,
// 		oauth_version: sOAuthVersion
// 	};
// 	var aOAuthKeys = [];
// 	for (var i in oOAuthKeys) {
// 		aOAuthKeys.push(to_rfc3986(i) + "=" + to_rfc3986(oOAuthKeys[i]));
// 	}
// 	aOAuthKeys.sort(function (a, b) {return a > b;});
// 	var sOAuthKeys = aOAuthKeys.join("&");
// 	var sOAuthSignatureBaseString =
// 		sMethod + "&" +
// 		to_rfc3986(sBaseURL) + "&" +
// 		to_rfc3986(sOAuthKeys);
	
// }

function reveal (oTarget) {
	var oRevealed = {};
	for (var i in oTarget) {
		// if (oTarget.hasOwnProperty(i) ||
		// 	oTarget.__proto__.hasOwnProperty(i)) {
			try {
				oRevealed[i] = oTarget[i];
				
			} catch (e) {
				oRevealed[i] = e.message;
			}
		// }
	}
	return {result: oRevealed, target: oTarget};
}
//Implementation of GET call
function handleGet() {
	// Retrieve data here and return results in JSON/other format 
	$.response.status = $.net.http.OK;
	return {"myResult": "GET success"};
}
//Implementation of POST call
function handlePost() {
	var bodyStr = $.request.body ? $.request.body.asString() : undefined;
	if (bodyStr === undefined) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		return {"myResult": "Missing BODY"};
	}
	// Extract body insert data to DB and return results in JSON/other format
	$.response.status = $.net.http.CREATED;
	return {"myResult": "POST success"};
}
// Check Content type headers and parameters
function validateInput() {
	var i, j;
	var paramName, paramValue;
	var headerName, headerValue;
	// var contentType;

	// Check content-type is application/json
	// contentType = $.request.contentType;
	// if (contentType === null || contentType.startsWith("application/json") === false) {
	// 	 $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	// 	 $.response.setBody("Wrong content type request use application/json");
	// 	return false;
	// }
	// Extract parameters and process them 
	for (i = 0; i < $.request.parameters.length; ++i) {
		paramName = $.request.parameters[i].name;
		paramValue = $.request.parameters[i].value;
		oParam[paramName] = paramValue;
	}
	// Extract headers and process them 
	for (j = 0; j < $.request.headers.length; ++j) {
		headerName = $.request.headers[j].name;
		headerValue = $.request.headers[j].value;
		oHeader[headerName] = headerValue;
	}
	return true;
}
// Request process 
function processRequest() {
	if (validateInput()) {
		try {
			switch ($.request.method) {
				//Handle your GET calls here
				case $.net.http.GET:
				// 	$.response.setBody(JSON.stringify(handleGet()));
					
				break;

				//Handle your POST calls here
				case $.net.http.POST:
				// 	$.response.setBody(JSON.stringify(handlePost()));
					
				break;

				//Handle your other methods: PUT, DELETE
				default:
					$.response.status = $.net.http.METHOD_NOT_ALLOWED;
				// 	$.response.setBody("Wrong request method");
					throw new Error("Wrong request method");
			}
			$.response.contentType = "application/json";
			
			var oAPIData = {
				status: "Hello World"
			};
			var sMethod = "POST",
				sOrigin = oHeader.clientprotocol + "://" + oHeader["~server_name"],
				sBaseURL = sOrigin + "/twitter/1.1/statuses/update.json",
				sURLParameters = "?include_entities=true",
				sURL = sBaseURL + sURLParameters,
				sStatus = "Hello world",
				sIncludeEntities = "true",
				sOAuthConsumerKey = "mjpp4cUeysMM0ruMjjPCjJMZc",
				sOAuthNonce = btoa(Math.random() + "" + Math.random() + Math.random() + Math.random()).replace(/[^a-zA-Z0-9]/g, ""),
				sOAuthSignatureMethod = "HMAC-SHA1",
				sOAuthTimestamp = Math.floor(Date.now() / 1000) + "",
				sOAuthToken = "",
				sOAuthVersion = "1.0";
				
			var oOAuthKeys = {
				status: sStatus,
				include_entities: sIncludeEntities,
				oauth_consumer_key: sOAuthConsumerKey,
				oauth_nonce: sOAuthNonce,
				oauth_signature_method: sOAuthSignatureMethod,
				oauth_timestamp: sOAuthTimestamp,
				oauth_token: sOAuthToken,
				oauth_version: sOAuthVersion
			};
			var aOAuthKeys = [];
			for (var i in oOAuthKeys) {
				aOAuthKeys.push(to_rfc3986(i) + "=" + to_rfc3986(oOAuthKeys[i]));
			}
			aOAuthKeys.sort(function (a, b) {return a > b;});
			var sOAuthKeys = aOAuthKeys.join("&");
			var sOAuthSignatureBaseString =
				sMethod + "&" +
				to_rfc3986(sBaseURL) + "&" +
				to_rfc3986(sOAuthKeys);
			
			var dest = $.net.http.readDestination("TwitterXS.webapp.xsjs", "dst_twitter_api");
			var client = new $.net.http.Client();
			client.setTimeout(5); // timeout in seconds;
			var req = new $.web.WebRequest($.net.http.POST, sURLParameters);
// 			var req = new $.net.http.Request($.net.http.POST, JSON.stringify(oAPIData));
			req.setBody(JSON.stringify(oAPIData));
			client.request(req, dest);

			var response = client.getResponse();
			$.response.setBody("Status: " + response.status);
		} catch (e) {
			$.response.setBody("Failed to execute action: " + typeof e === "string" ? e : e.toString());
		}
	}
}
// Call request processing
processRequest();