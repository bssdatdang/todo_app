angular.module('directive.babylonMatch', [
]).directive('babylonMatch', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      scope: {
        babylonMatch: '='
      },
      link: function (scope, elem, attrs, ctrl) {
        scope.$watch(function () {
          return (ctrl.$pristine && angular.isUndefined(ctrl.$modelValue)) || scope.babylonMatch === ctrl.$modelValue;
        }, function (currentValue) {
          ctrl.$setValidity('babylonMatch', currentValue);
        });
      }
    };
  });