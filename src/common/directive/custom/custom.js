angular.module('directive.custom', [])

    .directive('fullHeight', function ($window) {
        return {
            restrick: 'A',
            link: function (scope, element) {
                var headerAndFooter = 50;
                scope.initializeWindowSize = function () {
                    $(element).css('min-height', $window.innerHeight - headerAndFooter);
                };
                scope.initializeWindowSize();
                angular.element($window).bind('resize', function () {
                    scope.initializeWindowSize();
                });
            }
        };
    })

    .directive('loadingContainer', function () {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs) {
                var loadingLayer = angular.element('<div class="loading"></div>');
                element.append(loadingLayer);
                element.addClass('loading-container');
                scope.$watch(attrs.loadingContainer, function (value) {
                    loadingLayer.toggleClass('ng-hide', !value);
                });
            }
        };
    })

    .directive('validates', function () {
        var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return {
            require: 'ngModel',
            restrict: '',
            link: function (scope, elm, attrs, ctrl) {
                // only apply the validator if ngModel is present and Angular has added the email validator
                if (ctrl && ctrl.$validators.email) {
                    // this will overwrite the default Angular email validator
                    ctrl.$validators.email = function (modelValue) {
                        return (!ctrl.$isEmpty(modelValue) && EMAIL_REGEXP.test(modelValue)) || ctrl.$isEmpty(modelValue);
                    };
                }
            }
        };
    })

    .directive('pwcheck', function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                $(elem).add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        if (elem.val()) {
                            var v = elem.val() === $(firstPassword).val() && $(firstPassword).val();
                            ctrl.$setValidity('pwcheck', v);
                        } else {
                            ctrl.$setValidity('pwcheck', true);
                        }
                    });
                });
            }
        };
    })
    .directive('compareTo', function () {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function (scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function (modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function () {
                    ngModel.$validate();
                });
            }
        };
    })
    .directive('backButton', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    })
    .directive('googlePlace', function () {
        return {
            require: 'ngModel',
            scope: {
                ngModel: '=',
                details: '=?'
            },
            link: function (scope, element, attrs, model) {
                var options = {
                    types: [],
                    componentRestrictions: {}
                };
                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

                google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                    scope.$apply(function () {
                        scope.details = scope.gPlace.getPlace();
                        model.$setViewValue(element.val());
                        $rootScope.$broadcast('place_changed', scope.details);
                    });
                });
            }
        };
    })
    .directive('displaySpan', function () {
        return {
            require: 'ngModel',
            link: function (scope, elem) {
                $(elem).on('click', function () {
                    $(elem).css("text-align", "left");
                });
                //blur input
                $(elem).on('blur', function () {
                    scope.$apply(function () {
                        $(elem).css("text-align", "right");
                    });
                });
                //focus input
                $(elem).on('focus', function () {
                    scope.$apply(function () {
                        $(elem).css("text-align", "right");
                    });
                });

                //key change input
                $(elem).on('keyup', function () {
                    scope.$apply(function () {
                        $(elem).css("text-align", "left");
                    });
                });

                //click label
                $('.label-input').on('click', function () {
                    scope.$apply(function () {
                        $(elem).css("text-align", "left");
                    });
                });
            }
        };
    })
;