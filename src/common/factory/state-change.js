angular.module("factory.state-change", [

])
.factory('stateChange', function(){
	return {
		configObject: {
            // Add a attribute called style for object to use to prevent drag drop on ui tree
            addStyle: function (array, styleName) {
                for (var i = 0; i < array.length; i++) {
                    array[i].style = styleName;
                }
            },
            // Remove style attribute on object
            deleteStyle: function (array) {
                for (var i = 0; i < array.length; i++) {
                    delete array[i].style;
                }
            },
            // Reload items on right trees
            reloadModels: function (arrayUsed, arrayDefault) {
              var arrayDefaultCloned = angular.copy(arrayDefault);
              for (var i = 0; i < arrayDefault.length; i++) {
                for (var j = 0; j < arrayUsed.length; j++) {
                  if ( arrayUsed[j].id === arrayDefault[i].id ) {
                    delete arrayDefaultCloned[i];
                    break;
                  }
                }
              }
              var returnArray = [];
              for (var k = 0; k < arrayDefaultCloned.length; k++) {
                  if ( arrayDefaultCloned[k] ) {
                      returnArray.push( arrayDefaultCloned[k] );
                  }
              }
              return returnArray;
            },
        },
        optionsDefault: {
            accept: function(sourceNodeScope, destNodesScope, destIndex) {
                return false;
            }
        },
        optionsTriggerOnActions: {
            detailExams: {
                accept: function(sourceNodeScope, destNodesScope, destIndex) {
                    var sourceValue = sourceNodeScope.$modelValue;
                    var destValue   = destNodesScope.$modelValue;
                    if ( sourceValue.style === "TriggerModel_DetailExam" ) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            },
            actions: {
                accept: function(sourceNodeScope, destNodesScope, destIndex) {
                    var sourceValue = sourceNodeScope.$modelValue;
                    var destValue   = destNodesScope.$modelValue;
                    if ( sourceValue.style === "TriggerModel_Actions" ) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            },
            otherResults: {
                accept: function(sourceNodeScope, destNodesScope, destIndex) {
                    var sourceValue = sourceNodeScope.$modelValue;
                    var destValue   = destNodesScope.$modelValue;
                    if ( sourceValue.style === "TriggerModel_OtherResults" ) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            },
            actionCategories: {
                accept: function(sourceNodeScope, destNodesScope, destIndex) {
                    var sourceValue = sourceNodeScope.$modelValue;
                    var destValue   = destNodesScope.$modelValue;
                    if ( sourceValue.style === "TriggerModel_ActionCategories" ) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
        },
        optionsStateChange: {
            basicExams: {
                accept: function(sourceNodeScope, destNodesScope, destIndex) {
                    var sourceValue = sourceNodeScope.$modelValue;
                    var destValue   = destNodesScope.$modelValue;
                    if ( sourceValue.style === "StateChange_BasicExam" ) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            },
            detailExams: {
                accept: function(sourceNodeScope, destNodesScope, destIndex) {
                    var sourceValue = sourceNodeScope.$modelValue;
                    var destValue   = destNodesScope.$modelValue;
                    if ( sourceValue.style === "StateChange_DetailExam" ) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            },
            actions: {
                accept: function(sourceNodeScope, destNodesScope, destIndex) {
                    var sourceValue = sourceNodeScope.$modelValue;
                    var destValue   = destNodesScope.$modelValue;
                    if ( sourceValue.style === "StateChange_Actions" ) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            },
        },
        eventsTriggerOnActions: {
            deleteExam: function (node, item, model) {
                node.remove();
                item.style = "TriggerModel_DetailExam";
                model.detailExams.push(item);
            },
            deleteAction: function (node, item, model) {
                node.remove();
                item.style = "TriggerModel_Actions";
                model.actions.push(item);
            },
            deleteOtherResults: function (node, item, model) {
                node.remove();
                item.style = "TriggerModel_OtherResults";
                model.otherResults.push(item);
            },
            deleteActionCategories: function (node, item, model) {
                node.remove();
                item.style = "TriggerModel_ActionCategories";
                model.actionCategories.push(item);
            },
        },
        eventsStateChange: {
            deleteBasicExam: function (node, item) {
                node.remove();
                item.style = "StateChange_BasicExam";
                $scope.stateChangeModels.basicExams.push(item);
            },
            deleteDetailExam: function (node, item) {
                node.remove();
                item.style = "StateChange_DetailExam";
                $scope.stateChangeModels.detailExams.push(item);
            },
            deleteAction: function (node, item) {
                node.remove();
                item.style = "StateChange_Actions";
                $scope.stateChangeModels.actions.push(item);
            },
            editAction: function (node, item) {
                var modalInstance = $modal.open({
                    templateUrl: 'home/case/state/edit/edit-action.tpl.html',
                    controller: 'EditActionStateChangeController',
                    backdrop: true,
                    size: 'lg',
                    resolve: {
                        item: function() {
                            return item;
                        },
                        scope: function() {
                            return $scope;
                        }
                    }
                });
            },
        },

	};
});