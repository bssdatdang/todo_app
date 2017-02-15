/**
 * Created by Dat Dang on 2/15/2017.
 */
angular.module("app.todo", [
    'app.todo.services'
]).config(function config($stateProvider) {
    $stateProvider.state('todo', {
        url: '/todo',
        views: {
            "root": {
                controller: 'TodoControllerCtrl',
                templateUrl: 'todo/todo.tpl.html'
            }
        },
        data: {pageTitle: 'Todo'}
    });
}).controller('TodoControllerCtrl', ['$log', '$scope', '$state', '$modal', 'todoServices',
        function TodoControllerCtrl($log, $scope, $state, $modal, todoServices) {
            //define
            $scope.check = {
                is_edit: false
            };
            $scope.todo = {
                title: '',
                description: '',
                is_complete: 0,
                category_id: ''
            };
            $scope.listCategories=[];
            $scope.todoList = [];

            $scope.loadCategory = function () {
                todoServices.getListCategory().success(function (data) {
                    $scope.listCategories = data.data;
                }).error(function (err) {
                });
            };

            $scope.loadCategory();

            //get todolist
            todoServices.getListTodo().success(function (data) {
                $scope.todoList = data.data;
            }).error(function (err) {
            });

            //create todo item
            $scope.add = function (formTodo) {
                if (!$scope.check.is_edit) {//add new
                    todoServices.createTodo($scope.todo).success(function (data) {
                        $state.go($state.current, {}, {reload: true});
                    }).error(function (err) {
                    });
                }
                else {
                    todoServices.updateTodo($scope.todo).success(function (data) {
                        $state.go($state.current, {}, {reload: true});
                    }).error(function (err) {
                    });
                }

            };
            //update
            $scope.edit = function (item) {
                $scope.check.is_edit = true;
                $scope.todo = item;
            };
            //delete
            $scope.delete = function (item) {
                todoServices.deleteTodo(item.id).success(function (data) {
                    $state.go($state.current, {}, {reload: true});
                }).error(function (err) {
                });
            };

            // call modal add categories
            $scope.goCategory = function (item) {
                $modal.open({
                    templateUrl: 'todo/categories/categories.tpl.html',
                    controller: 'newCategoriesCtrl',
                    backdrop: true,
                    windowClass: "add-new-admin-modal",
                    size: "sm",
                    resolve: {
                        item: function () {
                            return item;
                        },
                        scope: function () {
                            return $scope;
                        }
                    }
                });
            };
        }
    ])
    .controller("newCategoriesCtrl", ["$log", "$scope", "$state", "todoServices", "$modalInstance", "item", "$modal",
        function newCategoriesCtrl($log, $scope, $state, todoServices, $modalInstance, item, $modal) {
            $scope.cancel = function () {
                $modalInstance.close('close');
            };

            $scope.category = {
                category: ''
            };
            $scope.addCategory = function (formCategory) {
                todoServices.createCategory($scope.category).success(function (data) {
                    $modalInstance.close('close');
                }).error(function (err) {
                });
            };
        }])
;
