sap.ui.define([

], function(

) {
"use strict";
	return {
		fRubles: function (iAmount) {
			// добавляет пробелы между каждыми 3 символами.
			return (typeof iAmount == "number" || typeof iAmount == "string") ?
				(+iAmount).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ') : "0";
		},
		fPercent: function (iAmount) {
			// добавляет пробелы между каждыми 3 символами.
			return (typeof iAmount == "number" || typeof iAmount == "string") ?
				(+iAmount).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ') : "0";
		},
		fRublesKeepBlanks: function (iAmount) {
			// добавляет пробелы между каждыми 3 символами. Не заменяет пустые строчки на нули.
			if (iAmount === "") return "";
			return (typeof iAmount == "number" || typeof iAmount == "string") ?
				(+iAmount).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ') : "0";
		},
		fRublesPostfix: function (iAmount, sRubShortLowerCase) {
			// добавляет пробелы между каждыми 3 символами и ставит значек Р в конце.
			return ((typeof iAmount == "number" || typeof iAmount == "string") ?
				(+iAmount).toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ') : "0") + " " + sRubShortLowerCase;
		},
		fToNumber: function (iNumber) {
			return +iNumber || 0;
		},
		fShopName: function (sPlant, sShop) {
			return sShop + " " + (sPlant ? sPlant.replace("S", "№") : "");
		}
	}
}, true);