angular.module('directive.babylonHeader', [
  ])
  .controller('HeaderCtrl', function HeaderCtrl($rootScope, $scope, $timeout, $modal, $stateParams, $location, $log, $state, $filter, $window, manageToken, configBabylon) {

    $scope.header = {};

    //control navigation
    $scope.navContainers = [
      {
        'class' : 'fa fa-dashboard',
        'title' : 'Dashboard',
        'route' : '#/dashboard'
      },
      {
        'class' : 'fa fa-users',
        'title' : 'Users',
        'route' : '#/dashboard/user'
      },
      {
        'class' : 'fa fa-user',
        'title' : 'Sites',
        'route' : '#/dashboard/site'
      },
      {
        'class' : 'fa fa-tablet',
        'title' : 'Categories',
        'route' : '#/dashboard/category'
      },
      {
        'class' : 'fa fa-tablet',
        'title' : 'Conditions',
        'route' : '#/dashboard/condition'
      },
      {
        'class' : 'fa fa-tablet',
        'title' : 'Searches',
        'route' : '#/dashboard/search'
      } ,
      {
        'class' : 'fa fa-tablet',
        'title' : 'Products',
        'route' : '#/dashboard/product'
      }
    ];

    $scope.$watch('header', function (newHeader) {
      if (angular.isDefined(newHeader)) {
        $scope.header = newHeader;
      }
    }, true);


    /*TODO : check logging*/
    //1)catch broadcast
    $rootScope.$on('currentUser', function (evt, res) {
      $scope.header.currentUser = res;
    });

    //2)watch currentUser
    $scope.currentUser = manageToken.getToken();
    $scope.$watch('currentUser', function (newCurrentUser) {
      if (angular.isDefined(newCurrentUser)) {
        $scope.header.currentUser = newCurrentUser;
      }
    }, true);

    //logout
    $scope.logOut = function () {
      manageToken.destroyToken();
      $state.transitionTo("authentication.login");

    };
  })
  .directive('babylonHeader', ['$compile', '$http', '$templateCache',
    function ($compile, $http, $templateCache) {
      var templateLoader,
        baseURL = 'directive/header/header.tpl.html';
      return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
          type: '='
        },
        compile: function (tElement) {
          var tplURL = baseURL;
          templateLoader = $http.get(tplURL, {cache: $templateCache})
            .success(function (html) {
              tElement.html(html);
            });
          return function (scope, element) {
            templateLoader.then(function (templateText) {
              var data = $compile(templateText.data)(scope);
              element.after(data);
            });
          };
        },
        controller: 'HeaderCtrl'
      };
    }]);