(function (app) {
    app.constant('APP_CONFIG', {
        //dev
        "HOST": "http://localhost/todo_app/public/",
        "BASE_URL": "http://localhost/todo_app/public/",
        "TOKEN_STORAGE_ID": "TOKEN_STORAGE_ID"
    });

    app.constant('DIALOG_TEXT', {
        "WARNING_SAVE_CHANGE": "Please save changes before leave the current page or click 'Cancel' to go to next page without saving."
    });

    app.config(function ($stateProvider, $urlRouterProvider, $httpProvider, laddaProvider) {
        $urlRouterProvider.otherwise('/todo');
        // $urlRouterProvider.otherwise('/home/module/list');

        laddaProvider.setOption({
            style: 'zoom-out'
        });

        $httpProvider.interceptors.push('authHttpInterceptor');
    });

    app.run(function (editableOptions, editableThemes, $rootScope, $location, security, caseInfo) {

        // Redirect to the given url (defaults to '/')
        function redirect(url) {
            url = url || '/';
            $location.path(url);
        }

        var token = security.getToken();
        if (token) {
            security.storeToken(token);
        }

        // Get case info
        $rootScope.caseInfo = caseInfo.getCaseInfo();
        window.caseInfo = $rootScope.caseInfo;

        editableOptions.theme = 'bs3';
        // overwrite submit button template
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary"><i class="fa fa-check"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" class="btn btn-default" ng-click="$form.$cancel()"><i class="fa fa-times"></i></button>';
    });
    app.controller('AppController', function ($rootScope, $location, $scope) {
        // Redirect to the given url (defaults to '/')
        function redirect(url) {
            url = url || '/';
            $location.path(url);
        }

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, formParams) {
            console.log("from", fromState);
            console.log("to", toState);
        });

        // Authorization Required
        $scope.$on('response:authorized:error', function (event, rejection) {

        });
    });
}(angular.module("app", [
    'templates-app',
    'templates-common',
    //service
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'ngAnimate',
    'toastr',
    // 'ngCookies',
    // 'nsPopover',
    'ngTable',
    'monospaced.elastic',
    'xeditable',
    'ui.select',
    'ui.tree',
    'textAngular',
    'angular-ladda',
    'ngTagsInput',
    'ngBootbox',

    'factory.security',

    //factory
    'factory.custom',
    'factory.module-info',
    'factory.case-info',
    'factory.vital-exam',
    'factory.state-change',
    'factory.disposition',
    'factory.actions',
    'factory.interceptor',
    //end factory

    //directive
    'directive.custom',
    //end directive

    //filter
    'filter.custom',

    'app.todo',
    'gm'
])));