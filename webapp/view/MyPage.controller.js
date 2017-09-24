sap.ui.define([
	"util/BaseController",
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
			
		}
	});
return oController;
});