angular.module("factory.actions", [

])
.factory('commonActions', function(){
	return {
        defaultAction: {
            dynamic: {
                isDynamic: false,
                startValue: "",
                endValue: ""
            },
            alert: false,
            highlight: false,
            displayName: "",
            imageDescription: null,
            imageFilename: null,
            imageSourceText: null,
            intConversion: 0,
            intDisplayName: null,
            intNumDecimalPlaces: 0,
            intNumberType: "Number",
            intUnits: null,
            // nameAndDeriveFrom: "usbedsideaaa",
            number: null,
            numberType: "Number",
            text: "",
            type: "Number",
            units: null,
            waveForm: "NormalSinusRhythm"
        },
        enumTypes: {
            type: ["Text", "Number"],
            actionType: ["Regular", "Exam", "History", "IvPole", "Iv", "Oxygen"],
            applyOnlyToGender: ["Male", "Female", "Both"],
            repeatType: [{label: "Once", value: "Once"}, {label: "Repeatable", value: "Any"}, {label: "Not repeatable", value: "OncePerPhase"}],
            animationName: [
                {
                    label: "Monitor",
                    value: "showMonitor"
                }, {
                    label: "Nasal Cannula Oxygen",
                    value: "nasalCannulaOxygen"
                }, {
                    label: "High Flow Oxygen",
                    value: "highFlowOxygen"
                }, {
                    label: "Intubate",
                    value: "intubate"
                }, {
                    label: "Cricothyrotomy",
                    value: "cricothyrotomy"
                }, {
                    label: "Intubate",
                    value: "intubate"
                }, {
                    label: "Syringe",
                    value: "syringe"
                }, {
                    label: "Blood",
                    value: "showBlood"
                }, {
                    label: "Fluid",
                    value: "showFluid"
                }, {
                    label: "Nasogastric",
                    value: "showNasogastric"
                }, {
                    label: "Cervical Collar",
                    value: "showCCollar"
                }, {
                    label: "Left Chest Tube",
                    value: "leftChestTube"
                }, {
                    label: "Right Chest Tube",
                    value: "rightChestTube"
                }, {
                    label: "Backboard",
                    value: "showBackboard"
                }
            ],
            waveForm: [
                {
                    label: "Normal Sinus Rhythm",
                    value: "NormalSinusRhythm"
                }, {
                    label: "No Pwave",
                    value: "NoPwave"
                }, {
                    label: "Torsades",
                    value: "Torsades"
                }, {
                    label: "Vfib",
                    value: "Vfib"
                }, {
                    label: "Vtach",
                    value: "Vtach"
                }, {
                    label: "Afib",
                    value: "Afib"
                }, {
                    label: "Aflutter",
                    value: "Aflutter"
                }, {
                    label: "Asystole",
                    value: "Asystole"
                }, {
                    label: "Lbbb",
                    value: "Lbbb"
                }, {
                    label: "Sinusoid",
                    value: "Sinusoid"
                }, {
                    label: "Test",
                    value: "Test"
                }
            ],
            numberType: ["Percent", "Number"],
        },
		getActionCategories: function (categories) {
            var actionCategories = [];
            for (var i = 0; i < categories.length; i++) {
                var category = {};
                category.id = categories[i].id;
                category.displayName = categories[i].displayName;
                actionCategories.push(category);
                if (categories[i].subcategories.length > 0) {
                    temp = this.getActionCategories(categories[i].subcategories);
                    actionCategories = actionCategories.concat(temp);
                }
            }

            return actionCategories;
        },
        deletePropertyOnReveal: function (item) {
            if (item.revealValues) {
                for (var i = 0; i < item.revealValues.length; i++) {
                    // delete dynamic property on item
                    if (item.revealValues[i].dynamic) {
                        delete item.revealValues[i].dynamic;
                    }
                    // delete isHasImage
                    // delete item.revealValues[i].isHasImage;
                    // delete SI
                    delete item.revealValues[i].isHasInterUnits;
                }
            }
        },
        onChangeType: function (type, objectModel) {
            // If text delete property numbers
            if (type === "Text") {
                objectModel.number = "";
                objectModel.intDisplayName = "";
                objectModel.intUnits = "";
                objectModel.intConversion = 0;
                objectModel.intNumberType = "Number";
                objectModel.intNumDecimalPlaces = 0;
                objectModel.numberType = "Number";
                objectModel.units = "";
            }
            else {
                objectModel.text = "";
            }
        },
        handleRevealValues: function (item) {
            if (item.revealValues) {
                for (var i = 0; i < item.revealValues.length; i++) {
                    // Handle dynamic number
                    if (item.revealValues[i].number) {
                        var strings = item.revealValues[i].number.split(" ");
                        if ( item.revealValues[i].number.match('dynamic') ) {
                            item.revealValues[i].dynamic = {};
                            item.revealValues[i].dynamic.isDynamic  = true;
                            item.revealValues[i].dynamic.startValue = strings[2];
                            item.revealValues[i].dynamic.endValue   = strings[4];
                            console.log(strings);
                        }
                        if ( item.revealValues[i].number.match('between') ) {
                            item.revealValues[i].dynamic = {};
                            item.revealValues[i].dynamic.isDynamic  = true;
                            item.revealValues[i].dynamic.startValue = strings[1];
                            item.revealValues[i].dynamic.endValue   = strings[3];
                            console.log(strings);
                        }
                    }
                    // Check is has image
                    if ( item.revealValues[i].imageFilename || item.revealValues[i].imageSourceText || item.revealValues[i].imageDescription ) {
                        item.revealValues[i].isHasImage = true;
                    }
                    // Check is has international units
                    if ( item.revealValues[i].intDisplayName && item.revealValues[i].intUnits ) {
                        item.revealValues[i].isHasInterUnits = true;
                    }
                    else {
                        item.revealValues[i].isHasInterUnits = false;
                    }
                }
            }
        },
        getDefaultRevealValueItem: function (item) {
            var defaultValue = angular.copy(item);
            if (defaultValue.type === "Number") {
                if (defaultValue.number.match('between')) {
                    var strings = item.number.split(" ");
                    defaultValue.dynamic = {};
                    defaultValue.dynamic.isDynamic  = true;
                    defaultValue.dynamic.startValue = strings[1];
                    defaultValue.dynamic.endValue   = strings[3];
                }
            }

            return defaultValue;
        },
        saveDynamic: function (item) {
            if (item.revealValues) {
                for (var i = 0; i < item.revealValues.length; i++) {   
                    if (item.revealValues[i].dynamic) {
                        if (item.revealValues[i].dynamic.isDynamic) {
                            item.revealValues[i].number = "between " + item.revealValues[i].dynamic.startValue + " and " + item.revealValues[i].dynamic.endValue;
                        }
                    }
                }
            }
        },
        getDynamicValues: function (item) {
            if ( item.number.match('between') ) {
                var strings = item.number.split(" ");
                var returnValue = {};
                returnValue.startValue = strings[1];
                returnValue.endValue   = strings[3];
                return returnValue;
            }
            else {
                return false;
            }
        },
        onChangeIsInterUnits: function (item) {
            if (!item.isHasInterUnits) {
                item.intDisplayName = null;
                item.intUnits = null;
            }
        },
	};
});