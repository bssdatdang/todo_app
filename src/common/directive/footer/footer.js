angular.module('directive.babylonFooter', [
  ])
  .controller('FooterCtrl', function FooterCtrl($scope,$window) {
    //open external link
    $scope.toExternalLink = function (link) {
      if(link){
        window.open(link, '');
      }else{
        window.open('', '');
      }
    };
  })
  .directive('babylonFooter', ['$compile', '$http', '$templateCache',
    function ($compile, $http, $templateCache) {
      return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
        },
        compile: function (tElement, tAttrs) {
          var tplURL = "directive/footer/footer.tpl.html";
          var templateLoader;
          templateLoader = $http.get(tplURL, {cache: $templateCache})
            .success(function (html) {
              tElement.html(html);
            });

          return function (scope, element, attrs) {
            templateLoader.then(function (/*templateText*/) {
              element.html($compile(tElement.html())(scope));
            });
          };
        },
        controller: 'FooterCtrl'
      };
    }]);