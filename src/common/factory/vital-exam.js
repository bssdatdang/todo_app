angular.module("factory.vital-exam", [

])
.factory('vitalExam', function() {
	return {
        // Define an array for the ryhthm's select box 
        rhythms: [
            {label: "Normal Sinus Rhythm", value: "NormalSinusRhythm"},
            {label: "No Pwave", value: "NoPwave"},
            {label: "Torsades", value: "Torsades"},
            {label: "Vfib", value: "Vfib"},
            {label: "Vtach", value: "Vtach"},
            {label: "Afib", value: "Afib"},
            {label: "Aflutter", value: "Aflutter"},
            {label: "Asystole", value: "Asystole"},
            {label: "Lbbb", value: "Lbbb"},
            {label: "Sinusoid", value: "Sinusoid"},
            {label: "Test", value: "Test"},
        ],
        scoreTypes: [ "Harmful", "Unnecessary", "Neutral", "Bonus", "Critical" ],
        // This object hold all vital's values, It use to handle on view and controller
        defaultVitals: {
            hr: {normal:{title: "HR", value: 0}, dynamic: {title: "HR", startValue: 0, endValue: 0, duration: 0}, isRange: false, isDynamic: false},
            sbp: {normal:{title: "SBP", value: 0}, dynamic: {title: "SBP", startValue: 0, endValue: 0, duration: 0}, isDynamic: false},
            bp: {normal:{title: "BP", value: 0}, dynamic: {title: "BP", startValue: 0, endValue: 0, duration: 0}, isRange: false, isDynamic: false},
            rr: {normal:{title: "RR", value: 0}, dynamic: {title: "RR", startValue: 0, endValue: 0, duration: 0}, isRange: false, isDynamic: false},
            o2: {normal:{title: "o2", value: 0}, dynamic: {title: "o2", startValue: 0, endValue: 0, duration: 0}, isRange: false, isDynamic: false},
            temp: {normal:{title: "Temp", value: 0}, dynamic: {title: "Temp", startValue: 0, endValue: 0, duration: 0}, isRange: false, isDynamic: false},
            rhythm: {title: "Rhythm", value: ""}
        },
        // Function parse Json was responsed from server to Object model to show on view
        handleLoadVital: function (vitalObject) {
            var mapObjectToArray = function (object) {
                var returnArray = [];
                var keys = _.keys(object);
                for (var i = 0; i < keys.length; i++) {
                    var tempObject = {};
                    switch (keys[i]) {
                        case "vitalHR":
                            tempObject.title = "HR";
                            tempObject.value = object.vitalHR;
                            break;
                        case "vitalSBP":
                            tempObject.title = "SBP";
                            tempObject.value = object.vitalSBP;
                            break;
                        case "vitalBP":
                            tempObject.title = "BP";
                            tempObject.value = object.vitalBP;
                            break;
                        case "vitalRR":
                            tempObject.title = "RR";
                            tempObject.value = object.vitalRR;
                            break;
                        case "vitalO2":
                            tempObject.title = "o2";
                            tempObject.value = object.vitalO2;
                            break;
                        case "vitalTemp":
                            tempObject.title = "Temp";
                            tempObject.value = object.vitalTemp;
                            break;
                        case "vitalRhythm":
                            tempObject.title = "Rhythm";
                            tempObject.value = object.vitalRhythm;
                            break;
                    }
                    returnArray.push(tempObject);
                }

                return returnArray;
            };

            // return object
            var defaultVitals = {
                hr: {normal:{title: "HR", value: 0}, dynamic: {title: "HR", startValue: 0, endValue: 0, duration: 0}, isRange: false, isDynamic: false},
                sbp:{normal:{title: "SBP", value: 0}, dynamic: {title: "SBP", startValue: 0, endValue: 0, duration: 0}, isRange: false, isDynamic: false},
                bp: {normal:{title: "BP", value: 0}, dynamic: {title: "BP", startValue: 0, endValue: 0, duration: 0}, isRange: false, isDynamic: false},
                rr: {normal:{title: "RR", value: 0}, dynamic: {title: "RR", startValue: 0, endValue: 0, duration: 0}, isRange: false, isDynamic: false},
                o2: {normal:{title: "o2", value: 0}, dynamic: {title: "o2", startValue: 0, endValue: 0, duration: 0}, isRange: false, isDynamic: false},
                temp: {normal:{title: "Temp", value: 0}, dynamic: {title: "Temp", startValue: 0, endValue: 0, duration: 0}, isRange: false, isDynamic: false},
                rhythm: {title: "Rhythm", value: ""}
            };

            var vitals = [];
            if ( vitalObject ) {
                // Get keys of vital object
                vitals = mapObjectToArray(vitalObject);
            }

            // Process sysn model object
            for (var i = 0; i < vitals.length; i++) {
                if (vitals[i].value) {
                    // is number
                    if (vitals[i].value.length < 10 ) {
                        switch (vitals[i].title) {
                            case "HR":
                                defaultVitals.hr.normal = vitals[i];
                                break;
                            case "SBP":
                                defaultVitals.sbp.normal = vitals[i];
                                break;
                            case "BP":
                                defaultVitals.bp.normal = vitals[i];
                                break;
                            case "RR":
                                defaultVitals.rr.normal = vitals[i];
                                break;
                            case "o2":
                                defaultVitals.o2.normal = vitals[i];
                                break;
                            case "Temp":
                                defaultVitals.temp.normal = vitals[i];
                                break;
                            case "Rhythm":
                                defaultVitals.rhythm = vitals[i];
                                break;
                        }
                    }
                    // is string
                    else {
                        var stringArray = vitals[i].value.split(" ");
                        if (stringArray[0] === "dynamic") {
                            // Typical string "dynamic between 12 and 33 after 55 s"
                            switch (vitals[i].title) {
                                case "HR":
                                    defaultVitals.hr.isRange            = true;
                                    defaultVitals.hr.isDynamic          = true;
                                    defaultVitals.hr.dynamic.startValue = stringArray[2];
                                    defaultVitals.hr.dynamic.endValue   = stringArray[4];
                                    if (stringArray[6]) {
                                        defaultVitals.hr.dynamic.duration = stringArray[6];
                                    }
                                    break;
                                case "SBP":
                                    defaultVitals.sbp.isRange            = true;
                                    defaultVitals.sbp.isDynamic          = true;
                                    defaultVitals.sbp.dynamic.startValue = stringArray[2];
                                    defaultVitals.sbp.dynamic.endValue   = stringArray[4];
                                    if (stringArray[6]) {
                                        defaultVitals.sbp.dynamic.duration = stringArray[6];
                                    }
                                    break;
                                case "BP":
                                    defaultVitals.bp.isRange            = true;
                                    defaultVitals.bp.isDynamic          = true;
                                    defaultVitals.bp.dynamic.startValue = stringArray[2];
                                    defaultVitals.bp.dynamic.endValue   = stringArray[4];
                                    if (stringArray[6]) {
                                        defaultVitals.bp.dynamic.duration = stringArray[6];
                                    }
                                    break;
                                case "RR":
                                    defaultVitals.rr.isRange            = true;
                                    defaultVitals.rr.isDynamic          = true;
                                    defaultVitals.rr.dynamic.startValue = stringArray[2];
                                    defaultVitals.rr.dynamic.endValue   = stringArray[4];
                                    if (stringArray[6]) {
                                        defaultVitals.rr.dynamic.duration = stringArray[6];
                                    }
                                    break;
                                case "o2":
                                    defaultVitals.o2.isRange            = true;
                                    defaultVitals.o2.isDynamic          = true;
                                    defaultVitals.o2.dynamic.startValue = stringArray[2];
                                    defaultVitals.o2.dynamic.endValue   = stringArray[4];
                                    if (stringArray[6]) {
                                        defaultVitals.o2.dynamic.duration = stringArray[6];
                                    }
                                    break;
                                case "Temp":
                                    defaultVitals.temp.isRange            = true;
                                    defaultVitals.temp.isDynamic          = true;
                                    defaultVitals.temp.dynamic.startValue = stringArray[2];
                                    defaultVitals.temp.dynamic.endValue   = stringArray[4];
                                    if (stringArray[6]) {
                                        defaultVitals.temp.dynamic.duration = stringArray[6];
                                    }
                                    break;
                            }
                        }
                        if (stringArray[0] === "between") {
                            // Typical string "between 12 and 33 after 55 s"
                            switch (vitals[i].title) {
                                case "HR":
                                    defaultVitals.hr.isRange            = true;
                                    defaultVitals.hr.isDynamic          = false;
                                    defaultVitals.hr.dynamic.startValue = stringArray[1];
                                    defaultVitals.hr.dynamic.endValue   = stringArray[3];
                                    if (stringArray[5]) {
                                        defaultVitals.hr.dynamic.duration = stringArray[5];
                                    }
                                    break;
                                case "SBP":
                                    defaultVitals.sbp.isRange            = true;
                                    defaultVitals.sbp.isDynamic          = false;
                                    defaultVitals.sbp.dynamic.startValue = stringArray[1];
                                    defaultVitals.sbp.dynamic.endValue   = stringArray[3];
                                    if (stringArray[5]) {
                                        defaultVitals.sbp.dynamic.duration = stringArray[5];
                                    }
                                    break;
                                case "BP":
                                    defaultVitals.bp.isRange            = true;
                                    defaultVitals.bp.isDynamic          = false;
                                    defaultVitals.bp.dynamic.startValue = stringArray[1];
                                    defaultVitals.bp.dynamic.endValue   = stringArray[3];
                                    if (stringArray[5]) {
                                        defaultVitals.bp.dynamic.duration = stringArray[5];
                                    }
                                    break;
                                case "RR":
                                    defaultVitals.rr.isRange            = true;
                                    defaultVitals.rr.isDynamic          = false;
                                    defaultVitals.rr.dynamic.startValue = stringArray[1];
                                    defaultVitals.rr.dynamic.endValue   = stringArray[3];
                                    if (stringArray[5]) {
                                        defaultVitals.rr.dynamic.duration = stringArray[5];
                                    }
                                    break;
                                case "o2":
                                    defaultVitals.o2.isRange            = true;
                                    defaultVitals.o2.isDynamic          = false;
                                    defaultVitals.o2.dynamic.startValue = stringArray[1];
                                    defaultVitals.o2.dynamic.endValue   = stringArray[3];
                                    if (stringArray[5]) {
                                        defaultVitals.o2.dynamic.duration = stringArray[5];
                                    }
                                    break;
                                case "Temp":
                                    defaultVitals.temp.isRange            = true;
                                    defaultVitals.temp.isDynamic          = false;
                                    defaultVitals.temp.dynamic.startValue = stringArray[1];
                                    defaultVitals.temp.dynamic.endValue   = stringArray[3];
                                    if (stringArray[5]) {
                                        defaultVitals.temp.dynamic.duration = stringArray[5];
                                    }
                                    break;
                            }
                        }
                        if (vitals[i].title === "Rhythm") {
                            defaultVitals.rhythm = vitals[i];
                        }
                    }
                }
            }

            return defaultVitals;
        },
        // map default object to standar object on API
        mapModelObject: function (array) {
            var modelObject = {
                editedBP: true,
                editedHR: true,
                editedO2: true,
                editedRR: true,
                editedRhythm: true,
                editedSBP: true,
                editedTemp: true,
                vitalHR: "",
                vitalSBP: "",
                vitalBP: "",
                vitalRR: "",
                vitalO2: "",
                vitalTemp: "",
                vitalRhythm: ""
            };

            for (var i = 0; i < array.length; i++) {
                switch (array[i].title) {
                    case "HR":
                        modelObject.vitalHR = array[i].value;
                        break;
                    case "SBP":
                        modelObject.vitalSBP = array[i].value;
                        break;
                    case "BP":
                        modelObject.vitalBP = array[i].value;
                        break;
                    case "RR":
                        modelObject.vitalRR = array[i].value;
                        break;
                    case "o2":
                        modelObject.vitalO2 = array[i].value;
                        break;
                    case "Temp":
                        modelObject.vitalTemp = array[i].value;
                        break;
                    case "Rhythm":
                        modelObject.vitalRhythm = array[i].value;
                        break;
                }
            }

            return modelObject;
        },
        // Function convert defaultObject on view/controller to object standard on server
        handleVitalModel: function (defaultObject) {
            // var mapModelObject = function (array) {
            //     var modelObject = {
            //         editedBP: true,
            //         editedHR: true,
            //         editedO2: true,
            //         editedRR: true,
            //         editedRhythm: true,
            //         editedSBP: true,
            //         editedTemp: true,
            //         vitalHR: "",
            //         vitalSBP: "",
            //         vitalBP: "",
            //         vitalRR: "",
            //         vitalO2: "",
            //         vitalTemp: "",
            //         vitalRhythm: ""
            //     };

            //     for (var i = 0; i < array.length; i++) {
            //         switch (array[i].title) {
            //             case "HR":
            //                 modelObject.vitalHR = array[i].value;
            //                 break;
            //             case "SBP":
            //                 modelObject.vitalSBP = array[i].value;
            //                 break;
            //             case "BP":
            //                 modelObject.vitalBP = array[i].value;
            //                 break;
            //             case "RR":
            //                 modelObject.vitalRR = array[i].value;
            //                 break;
            //             case "o2":
            //                 modelObject.vitalO2 = array[i].value;
            //                 break;
            //             case "Temp":
            //                 modelObject.vitalTemp = array[i].value;
            //                 break;
            //             case "Rhythm":
            //                 modelObject.vitalRhythm = array[i].value;
            //                 break;
            //         }
            //     }

            //     return modelObject;
            // };

            var modelArray = [];
            var modelObject = {};
            // Get keys array
            var objKeys = Object.keys(defaultObject);
            for (var i = 0; i < objKeys.length-1; i++) {
                // get object's value by key
                var objectParent = defaultObject[objKeys[i]];
                if (!objectParent.isRange) {
                    var objectNormal = objectParent.normal;
                    // push into modelArray
                    modelArray.push(objectNormal);
                }
                else {
                    var tempString = "";
                    var tempObj = {title: "", value: ""};
                    var objectDynamic = objectParent.dynamic;
                    // is dynamic
                    if (objectParent.isDynamic) {
                        if ( objectDynamic.duration && objectDynamic.duration > 0 ) {
                            tempString = "dynamic between " + objectDynamic.startValue + " and " + objectDynamic.endValue + " after " + objectDynamic.duration + " s";
                        }
                        else {
                            tempString = "dynamic between " + objectDynamic.startValue + " and " + objectDynamic.endValue;
                        }
                    }
                    else {
                        if ( objectDynamic.duration && objectDynamic.duration > 0 ) {
                            tempString = "between " + objectDynamic.startValue + " and " + objectDynamic.endValue + " after " + objectDynamic.duration + " s";
                        }
                        else {
                            tempString = "between " + objectDynamic.startValue + " and " + objectDynamic.endValue;
                        }
                    }
                    tempObj.title = objectDynamic.title;
                    tempObj.value = tempString;
                    // push into modelArray
                    modelArray.push(tempObj);
                }
            }

            // Handle rhythms to string array
            var rhythmTemp = {};
            rhythmTemp.title = defaultObject.rhythm.title;
            rhythmTemp.value = defaultObject.rhythm.value;

            // push into modelArray
            modelArray.push(rhythmTemp);

            // Map model array to model object
            modelObject = this.mapModelObject(modelArray);
            console.log("vitalExam", modelObject);

            return modelObject;
        }
	};
});