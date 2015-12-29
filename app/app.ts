module app {
    var module = angular.module('angulartodo', 
                                    ["ngRoute",
                                     "ngMaterial",
                                     "ngResource",
                                     "todoResourceMock"]);
                                     
    module.config(routeConfig);
   
    routeConfig.$inject = ["$routeProvider"];
    function routeConfig($routeProvider: ng.route.IRouteProvider): void {
        $routeProvider
            .when("/",
                {
                    templateUrl: "/app/todo/task-list.html",
                    controllerAs: "vm",
                    controller: "taskListController"
                })
            .when("/taskDetail/:taskId",
                {
                    templateUrl: "/app/todo/task-detail.html",
                    controllerAs: 'vm',
                    controller: "taskDetailController"                   
                })
            .otherwise("/");
    }
}