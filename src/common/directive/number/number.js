angular.module('directive.numbersOnly', [])
    .directive('numbersOnly', function() {
      var NUMBER_REGEXP0 = /^\s*(\-|\+)?(\d+|(\d*))\s*$/;

      function link(scope, el, attrs, ngModelCtrl) {
        var min = parseFloat(attrs.min || 0);
        var precision = parseFloat(attrs.precision || 2);
        var lastValidValue;

        function round(num) {
          var d = Math.pow(10, precision);
          return Math.round(num * d) / d;
        }

        function formatPrecision(value) {
          return value;
        }

        function formatViewValue(value) {
          return ngModelCtrl.$isEmpty(value) ? '' : '' + value;
        }


        ngModelCtrl.$parsers.push(function (value) {
          if (angular.isUndefined(value)) {
            value = '';
          }

          // Handle leading decimal point, like ".5"
          if (value.indexOf('.') === 0) {
            value = '0' + value;
          }

          // Allow "-" inputs only when min < 0
          if (value.indexOf('-') === 0) {
            if (min >= 0) {
              value = null;
              ngModelCtrl.$setViewValue('');
              ngModelCtrl.$render();
            } else if (value === '-') {
              value = '';
            }
          }

          var empty = ngModelCtrl.$isEmpty(value);
          if (empty || NUMBER_REGEXP0.test(value)) {
            lastValidValue = (value === '') ? null : (empty ? value : value);
          } else {
            // Render the last valid input in the field
            ngModelCtrl.$setViewValue(formatViewValue(lastValidValue));
            ngModelCtrl.$render();
          }

          ngModelCtrl.$setValidity('number', true);
          return lastValidValue;
        });
        ngModelCtrl.$formatters.push(formatViewValue);

        var minValidator = function (value) {
          return value;
        };
        ngModelCtrl.$parsers.push(minValidator);
        ngModelCtrl.$formatters.push(minValidator);

        if (attrs.max) {
          var max = parseFloat(attrs.max);
          var maxValidator = function (value) {
            return value;
          };

          ngModelCtrl.$parsers.push(maxValidator);
          ngModelCtrl.$formatters.push(maxValidator);
        }

        // Round off
        if (precision > -1) {
          ngModelCtrl.$parsers.push(function (value) {
            return value ? round(value) : value;
          });
          ngModelCtrl.$formatters.push(function (value) {
            return value ? formatPrecision(value) : value;
          });
        }

        el.bind('blur', function () {
          var value = ngModelCtrl.$modelValue;
          if (value) {
            ngModelCtrl.$viewValue = formatPrecision(value);
            ngModelCtrl.$render();
          }
        });
      }

      return {
        restrict: 'A',
        require: 'ngModel',
        link: link
      };
    });