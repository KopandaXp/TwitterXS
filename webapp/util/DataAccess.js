sap.ui.define([
	"/sap/ui/model/Filter",
	// "/sap/ui/model/Sorter",
	"sapTwitter/util/Formatter"
	// "ovtLib/formatter/Formatter"
], function(
	Filter,
	// Sorter,
	Formatter
) {
"use strict";
	return {
		convertDayForRequest: function (dDate) {
			// Компенсируем разницу с нулевой временнОй зоной;
			dDate = sapTwitter.util.DataAccess.fixTimezone(dDate);
			var aDate = dDate.toISOString().split("T")[0].split("-");
			return aDate[0] + aDate[1] + aDate[2];
		},
		convertMonthForRequest: function (dDate) {
			// Компенсируем разницу с нулевой временнОй зоной;
			dDate = sapTwitter.util.DataAccess.fixTimezone(dDate);
			var aDate = dDate.toISOString().split("T")[0].split("-");
			return aDate[0] + aDate[1];
		},
		convertDateForKey: function (dDate) {
			dDate = sapTwitter.util.DataAccess.fixTimezone(dDate);
			return "datetime'" + dDate.toISOString().split("T")[0] + "T00%3A00%3A00'";
		},
		convertDateForFilter: function (dDate) {
			dDate = sapTwitter.util.DataAccess.fixTimezone(dDate);
			return "datetime'" + dDate.toISOString().split("T")[0] + "T00:00:00'";
		},
		fixTimezone: function (dDate) {
			// Компенсируем разницу с нулевой временнОй зоной;
			return new Date(dDate.valueOf() - dDate.getTimezoneOffset() * 60000);
		},
		setDayToLast: function (dDate) {
			dDate.setMonth(dDate.getMonth() + 1);
			dDate.setDate(0);
			return dDate;
		},
		readSet: function (oDeferred, oDataModel, sRequest, fnSuccess, fnError, aFilters, aSorters, oUrlParameters) {
			var oComponent = this.getOwnerComponent();
			var oRootControl = oComponent.getRootControl();
			oDeferred = oDeferred || $.Deferred();
			oRootControl.setBusyIndicatorDelay(0);
			oRootControl.setBusy(true);
			var oRead = {
				success: function (oData) {
					console.log("oData read success. oData: ", oData, ", request: " + sRequest, ", filters: ", aFilters);
					oRootControl.setBusy(false);
					if (typeof fnSuccess == "function") fnSuccess(oData);
					oDeferred.resolve(oData);
				},
				error: function (oData, oMsg) {
					console.log("oData read error. oData: ", oData, "oMsg: ", oMsg, ", request: " + sRequest, ", filters: ", aFilters);
					oRootControl.setBusy(false);
					if (typeof fnError == "function") fnError(oData, oMsg);
					oDeferred.reject(oData, oMsg);
				}
			};

			if (aFilters) oRead.filters = aFilters;
			if (aSorters) oRead.sorters = aSorters;
			if (oUrlParameters) oRead.urlParameters = oUrlParameters;

			oDataModel.read(sRequest, oRead);
			return oDeferred;
		},
		readGoalsData: function (sYear/*, sPernr*/) {
			var oController = this;
			var oComponent = this.getOwnerComponent();
			var oModel = oComponent.getModel("globalModel");
			var oDataModelGoals = oComponent.getModel("oDataModelGoals");
			var sGoalsRequest = "/ExTTargetsSet";
			var oDeferred = sapTwitter.util.DataAccess.readSet.call(oController, null, oDataModelGoals, sGoalsRequest,
				function (oData) {
					oModel.setProperty("/Goals/TableInd/Rows", oData.results);
				},
				function (oData, oMsg) {
					// ERROR
				},
				[
					// new Filter("Code", "EQ", sPernr),
					new Filter("Year", "EQ", sYear)
				]
			);
			return oDeferred;
		}
	}
}, true);