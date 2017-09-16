sap.ui.define([
	"sapTwitter/view/BaseController",
	"sapTwitter/util/DataAccess",
	"sap/m/MessageBox"
], function(
	Controller,
	DataAccess,
	MessageBox
) {
	"use strict";
	var oController = Controller.extend("sapTwitter.view.MyPage", {
		onInit: function () {
			window.goController.MyPage = this;
			this.getOwnerComponent().getRouter().getRoute("home").attachMatched(this.onRouteMatched, this);
		},
		onRouteMatched: function (oEvent) {
			var oComponent = this.getOwnerComponent();
			var oModel = oComponent.getModel("globalModel");
			var oController = this;
			this.oUrlParameters = $.extend(true, {}, oEvent.getParameter("arguments")) || {};
		},
		onAnyRouteMatched: function (oEvent) {
			
		},
		onPress: function (oEvent) {
			var oAPIData = {
				status: "Hello World"
			};
			var sMethod = "POST",
				sBaseURL = window.location.origin + "/twitter/1.1/statuses/update.json",
				sURLParameters = "?include_entities=true",
				sURL = sBaseURL + sURLParameters,
				sStatus = "Hello world",
				sIncludeEntities = "true",
				sOAuthConsumerKey = "",
				sOAuthNonce = "",
				sOAuthSignatureMethod = "",
				sOAuthTimestamp = "",
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
				aOAuthKeys.push(i.to_rfc3986() + "=" + oOAuthKeys[i].to_rfc3986());
			}
			aOAuthKeys.sort(function (a, b) {return a > b;});
			var sOAuthKeys = aOAuthKeys.join("&");
			var sOAuthSignature = 
				sMethod + "&" +
				sBaseURL.to_rfc3986() + "&" +
				sOAuthKeys.to_rfc3986();
			
			console.log("aOAuthKeys", aOAuthKeys);
			$.ajax({
				method: sMethod,
				url: sURL,
				async: false,
				 beforeSend: function(req) {
				 	req.setRequestHeader("Accept", "*/*");
				 	// req.setRequestHeader("Connection", "close");
				 	// req.setRequestHeader("User-Agent", "OAuth gem v0.4.4");
				 	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				 	// req.setRequestHeader("Content-Length", "76");
				 	// req.setRequestHeader("Host", "api.twitter.com");
				 	req.setRequestHeader("status", "Hello world");
				 	req.setRequestHeader("Authorization", 
					 	'OAuth ' +
						'oauth_consumer_key="",' +
						'oauth_nonce="' + btoa(Math.random()) + '",' +
						'oauth_signature="' + sOAuthSignature + '",' +
						'oauth_signature_method="HMAC-SHA1",' +
						'oauth_timestamp="1318622958",' +
						'oauth_token="370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",' +
						'oauth_version="1.0"'
					);
				 }/*,
				data: oAPIData*/
			}).done(function () {
				console.log("success", arguments);
			}).fail(function () {
				console.log("error", arguments);
			});
		}
	});
return oController;
});