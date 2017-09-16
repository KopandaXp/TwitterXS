sap.ui.define([
	"sapTwitter/view/BaseController"
], function(
	Controller
) {
"use strict";
var oController = Controller.extend("sapTwitter.view.AppHeader", {
	onInit: function () {
		window.goController.AppHeader = this;
		// this.getOwnerComponent().getRouter().getRoute("currentMonth").attachMatched(this.onRouteMatched, this);
		this.getOwnerComponent().getRouter().attachRouteMatched(this.onAnyRouteMatched, this);
	},
	onRouteMatched: function (oEvent) {
	},
	onAnyRouteMatched: function (oEvent) {
		var oComponent = this.getOwnerComponent();
		var oModel = oComponent.getModel("globalModel");
		var oController = this;
		oComponent.oUrlParameters = $.extend(true, {}, oEvent.getParameter("arguments")) || {};
		// if (oEvent.getParameter("name") == "home") oComponent.getRouter().navTo("goals");
	}
});
return oController;
});