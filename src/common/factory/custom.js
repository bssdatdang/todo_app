angular.module("factory.custom", [

	])
	.factory('commonFunction', function() {
		return {
			// Get all item from categories
			getItemFromCategory: function(category) {
				var listDiagnoses = [];
				for (var i = 0; i < category.length; i++) {
					listDiagnoses = listDiagnoses.concat(category[i].diagnoses);
				}

				return listDiagnoses;
			},

			// Get diagnose is not used
			getItemNotUsed: function(parentItems, childItems) {
				var incorrectDiagnose = angular.copy(parentItems);
				for (var i = 0; i < parentItems.length; i++) {
					for (var j = 0; j < childItems.length; j++) {
						if (parentItems[i].id === childItems[j].id) {
							delete incorrectDiagnose[i];
							break;
						}
					}
				}
				var returnArray = [];
				for (var k = 0; k < incorrectDiagnose.length; k++) {
					if (incorrectDiagnose[k]) {
						returnArray.push(incorrectDiagnose[k]);
					}
				}
				return returnArray;
			},
			// convert input parameter from array object to array string
			mapArrayNgTagInput: function(array) {
				var cloneArray = angular.copy(array);
				return cloneArray.map(function(value) {
					return value.text;
				});
			},
			// convert input parameter from array string to array object
			mapObjectNgTagInput: function(array) {
				var returnArray = [];
				for (var i = 0; i < array.length; i++) {
					var object = {};
					object.text = array[i];
					returnArray.push(object);
				}
				return returnArray;
			},
			// compare id and return item's index equal id
			getIndexByID: function(array, id) {
				for (var i = 0; i < array.length; i++) {
					if (array[i].id === id) {
						return i;
					}
				}
			},
			// generate uid
			getUID: function () {
				return '_' + Math.random().toString(36).substr(2, 9);
			}
		};
	});