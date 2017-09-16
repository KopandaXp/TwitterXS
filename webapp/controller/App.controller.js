sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(
	Controller,
	MessageBox
){
	"use strict";

	return Controller.extend("sapTwitter.view.App", {
		
		onInit: function() {
			var oController = this,
				oView = oController.getView(),
				oComponent = oController.getOwnerComponent(),
				oResourceBundle = oComponent.getModel("i18n").getResourceBundle();
			
			oView.setBusyIndicatorDelay(0);
			oView.setBusy(true);
			
			//обработка получения стартовой информации
			oComponent.initDefer.done(function() {
				oView.setBusy(false);
			}).fail(function() {
				oView.setBusy(false);
				oComponent.getRouter().getTargets().display("notFound");
				MessageBox.error(oResourceBundle.getText("dialog.error.userIdentify"));
			});
		}
	});
});