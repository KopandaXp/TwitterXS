sap.ui.define([
	"util/BaseController"
], function(
	Controller
) {
"use strict";
var oController = Controller.extend("sapTwitter.view.HeaderOverview", {
	onInit: function () {
		window.goController.HeaderOverview = this;
		// this.getOwnerComponent().getRouter().getRoute("lastMonth").attachMatched(this.onRouteMatched, this);
		// this.getOwnerComponent().getRouter().attachRouteMatched(this.onAnyRouteMatched, this);
	},
	// onRouteMatched: function (oEvent) {
	// 	var oComponent = this.getOwnerComponent();
	// 	var oModel = oComponent.getModel("globalModel");
	// 	var oController = this;
	// 	this.oUrlParameters = $.extend(true, {}, oEvent.getParameter("arguments")) || {};
	// },
	onAnyRouteMatched: function (oEvent) {
		
	}
});
return oController;
});