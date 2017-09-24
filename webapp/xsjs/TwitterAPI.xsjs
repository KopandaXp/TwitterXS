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
function btoa (s) {return $.util.codec.encodeBase64(s);}
// accepts object with additional parameters.
// sURLPrefix 
function makeAuthorizationString (sBaseURL, sURLParameters, sUserSecret, oParameters) {
	var oAPIData = {
		status: "Hello World"
	};
	var sMethod = "POST",
		// sOrigin = oHeader.clientprotocol + "://" + oHeader["~server_name"],
		// sBaseURL = sOrigin + "/twitter/1.1/statuses/update.json",
// 		sBaseURL = dest.baseUrl,
// 		sURLParameters = "?include_entities=true",
		sURL = sBaseURL + sURLParameters,
		sStatus = "Hello world",
		sIncludeEntities = "true",
		sConsumerKey = "mjpp4cUeysMM0ruMjjPCjJMZc",
		sNonce = randomString(32),
		sSignatureMethod = "HMAC-SHA1",
		sTimestamp = Math.floor(Date.now() / 1000) + "",
		sToken = "",
		sOAuthVersion = "1.0",
		sConsumerSecret = "BZNucwCwizaARqNEZ1evQfgERP3tuBfqXGVI1nLz8CkaneMKmg",
		sOAuthTokenSecret = sUserSecret || "";
		
	var oOAuthKeys = {
		status: sStatus,
		include_entities: sIncludeEntities,
		oauth_consumer_key: sConsumerKey,
		oauth_nonce: sNonce,
		oauth_signature_method: sSignatureMethod,
		oauth_timestamp: sTimestamp,
		oauth_token: sToken,
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
	var sSigningKey = btoa(sConsumerSecret) + "&" + btoa(sOAuthTokenSecret);
	return $.security.crypto.sha1(sOAuthSignatureBaseString, sSigningKey);
}
function randomString (length) {
	var textr = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < length; i++) {
		textr += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return textr;
};
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
			
// 			var sMethod = "POST";
// 			var dest = $.net.http.readDestination("TwitterXS.webapp.xsjs", "dst_twitter_api");
// 			var client = new $.net.http.Client();
// 			var sURLParameters = "?include_entities=true";
// 			var sMyAccessToken = "93694674-6XMAC1qmlcGbRX1CSVFPiAeaFTZlcrN7vuCgfds5i";
// 			var sMySecret = "F5KwkXWyjiJ0cMJ0B1kW2cirwqQJduC5PLLmRkbOkFYyf";
// 			var sAuthorization = makeAuthorizationString(
// 			    dest.baseUrl,
// 			    sURLParameters, 
// 			    sMySecret, {
				
// 			});
// 			var req = new $.web.WebRequest($.net.http.POST, sURLParameters);
// 			client.request(req, dest);
// 			var response = client.getResponse();
			
		var destination_package = "TwitterXS.webapp.xsjs";
		var destination_name = "dst_twitter_api";
		
		var text = encodeURIComponent('test test test');
		var epn1 = new Date().getTime();
		var ep2 = epn1.toString();
		var epn = ep2.substring(0, 10);

		var nonsense = randomString(6);
		//		text = encodeURIComponent('Q:' + epn);
		text = encodeURIComponent(text);

		var call = '/1.1/statuses/update.json?status=' + text;

		var dest = $.net.http.readDestination(destination_package, destination_name);
		var client = new $.net.http.Client();
		var req = new $.web.WebRequest($.net.http.POST, call);
		//        var consumekey = "CONSUMERKEY";
		var consumekey = "mjpp4cUeysMM0ruMjjPCjJMZc";
		//        var consumesec = "CONSUMERSECURITY";
		var consumesec = "BZNucwCwizaARqNEZ1evQfgERP3tuBfqXGVI1nLz8CkaneMKmg";
		//        var accesstok = "ACCESSTOKEN";
		var accesstok = "93694674-6XMAC1qmlcGbRX1CSVFPiAeaFTZlcrN7vuCgfds5i";
		//        var accesssec = "ACCESSSECURITY";        
		var accesssec = "F5KwkXWyjiJ0cMJ0B1kW2cirwqQJduC5PLLmRkbOkFYyf";

		var t2 = 'oauth_consumer_key=' + consumekey;
		var t3 = '&oauth_nonce=' + nonsense;
		var t4 = '&oauth_signature_method=HMAC-SHA1';
		var t5 = '&oauth_timestamp=' + epn;
		var t6 = '&oauth_token=' + accesstok;
		var t7 = '&oauth_version=1.0';
		var t8 = '&status=' + text;

		var tall = t2 + t3 + t4 + t5 + t6 + t7 + t8;
		var tper = encodeURIComponent(tall);

		var s1 = 'POST&https%3A%2F%2Fapi.twitter.com%2F1.1%2Fstatuses%2Fupdate.json&';
		var out = s1 + tper;

		var sk1 = encodeURIComponent(consumesec);
		var sk2 = encodeURIComponent(accesssec);
		var skey = sk1 + '&' + sk2;

		var skeyhmac = $.security.crypto.sha1(out, skey);
		var tsignature = encodeURIComponent($.util.codec.encodeBase64(skeyhmac));

		var h1 = 'OAuth oauth_consumer_key="' + consumekey + '"';
		var h2 = ',oauth_token="' + accesstok + '"';
		var h3 = ',oauth_signature_method="HMAC-SHA1"';
		var h4 = ',oauth_timestamp="' + epn + '"';
		var h5 = ',oauth_nonce="' + nonsense + '"';
		var h6 = ',oauth_version="1.0"';
		var h7 = ',oauth_signature="' + tsignature + '"';

		var twithead = h1 + h2 + h3 + h4 + h5 + h6 + h7;

		req.headers.set('Authorization', twithead);
		client.request(req, dest);
		var response = client.getResponse();
			
			$.response.setBody("Status: " + response.status + ", reason: " + response.headers.get("~status_reason") + ", body: " + response.body.asString());
		} catch (e) {
			$.response.setBody("Failed to execute action: " + typeof e === "string" ? e : e.toString());
		}
	}
}
// Call request processing
processRequest();