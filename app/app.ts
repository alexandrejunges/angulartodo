module app {
    var module = angular.module('angulartodo', 
                                    ["ngRoute",
                                     "ngMaterial",
                                     "todoResourceMock"]);
                                     
    module.config(routeConfig);
   
    routeConfig.$inject = ["$routeProvider"];
    function routeConfig($routeProvider: ng.route.IRouteProvider): void {
        $routeProvider
            .when("/",
                {
                    controller: "taskListController",
                    controllerAs: "vm",
                    templateUrl: "app/todo/task-list.html"
                    //template: "teste 123"
                })
            .when("/taskDetail/:taskId",
                {
                    templateUrl: "app/todo/task-detail.html",
                    controller: "taskDetailController",
                    controllerAs: 'vm'
                })
            .otherwise("/");
    }
}