// register the interceptor as a service
angular.module("factory.interceptor", [

])
.factory('authHttpInterceptor', function($rootScope, $location, $q) {
    return {
        // optional method
        'request': function(config) {
            // do something on success
            $rootScope.$broadcast('API:loading:started', config);

            return config;
        },

        // optional method
        'requestError': function(rejection) {
            // do something on error
            $rootScope.$broadcast('API:loading:started', rejection);

            return $q.reject(rejection);
        },


        // optional method
        'response': function(response) {
            // do something on success
            $rootScope.$broadcast('API:loading:ended');

            return response;
        },

        // optional method
        'responseError': function(rejection) {
            // do something on error
            $rootScope.$broadcast('API:loading:ended');

            if(rejection.status === 401) { // Authorization Required
                $rootScope.$broadcast('response:authorized:error', rejection);
            }

            return $q.reject(rejection);
        }
    };
});