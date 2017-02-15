angular.module('factory.security', [])

    .factory('security',
        function ($rootScope, $http, $q, $window, APP_CONFIG) {

            var url = "admin/auth/signin";

            var TOKEN_KEY = 'accessToken';
            var accessUser = 'accessUser';
            var userLogined = 'userLogined';

            var service = {
                currentUser: undefined,

                getToken: function () { //TODO : output is json token or null
                    var token = $window.localStorage.getItem(TOKEN_KEY);
                    return token;
                },

                storeToken: function (accessToken) {
                    // store the authentication token on local use for mobile device
                    $window.localStorage.setItem(TOKEN_KEY, accessToken);

                    if (accessToken) {
                        $http.defaults.headers.common.Authorization = accessToken;
                    }
                },

                setUserIsAdmin: function () {
                    $window.localStorage.setItem(accessUser, 'Admin');
                },

                getAccessUser: function () {
                    var au = $window.localStorage.getItem(accessUser);
                    return au;
                },

                destroyToken: function () {
                    $window.localStorage.removeItem(TOKEN_KEY);
                    $window.localStorage.removeItem(accessUser);
                    $window.localStorage.removeItem(userLogined);
                    $http.defaults.headers.common.Authorization = undefined;
                },

                setCurrentUserFromResponse: function (response) {
                    var accessToken = response.token;

                    // store the authentication token on local use for mobile device
                    $window.localStorage.setItem(TOKEN_KEY, accessToken);

                    // If successful, set current user object
                    service.currentUser = response.data;

                    return service.currentUser;
                },

                // Server Login (email/password)
                login: function (params) {
                    return $http.post(APP_CONFIG.BASE_URL + url, params);
                },

                logout: function (params) {
                    service.destroyToken();
                },
                setUserLogined: function (params) {
                    /*$window.localStorage.setItem(userLogined, params);*/
                    window.localStorage.setItem(userLogined, JSON.stringify(params));
                },
                getUserLogined: function () {
                    /*return $window.localStorage.getItem(userLogined);*/
                    return JSON.parse(window.localStorage.getItem(userLogined));
                }

            };

            return service;
        }
    );
