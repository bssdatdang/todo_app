angular.module("app.todo.services", [])
    .factory("todoServices", function ($http, APP_CONFIG) {
        var urlListCategory = "api/category";
        var urlAddCategory = 'api/category/create';
        var urlUpdateCategory = 'api/category/update/';
        var urlDeleteCategory = 'api/category/delete/';

        var urlListTodo = "api/todo";
        var urlAddTodo = 'api/todo/create';
        var urlUpdateTodo = 'api/todo/update/';
        var urlDeleteTodo = 'api/todo/delete/';
        return {
            getListCategory: function () {
                return $http.get(APP_CONFIG.BASE_URL + urlListCategory);
            },
            getListTodo: function () {
                return $http.get(APP_CONFIG.BASE_URL + urlListTodo);
            },
            createTodo: function (param) {
                return $http.post(APP_CONFIG.BASE_URL + urlAddTodo, param);
            },
            createCategory: function (param) {
                return $http.post(APP_CONFIG.BASE_URL + urlAddCategory, param);
            },
            updateTodo: function (id, param) {
                return $http.put(APP_CONFIG.BASE_URL + urlUpdateTodo + id, param);
            },
            updateCategory: function (id, param) {
                return $http.put(APP_CONFIG.BASE_URL + urlUpdateCategory + id, param);
            },
            deleteTodo: function (id) {
                return $http.delete(APP_CONFIG.BASE_URL + urlDeleteTodo + id);
            },
            deleteCategory: function (id) {
                return $http.delete(APP_CONFIG.BASE_URL + urlDeleteCategory + id);
            }
        };
    });