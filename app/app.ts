module app {
    var module = angular.module('angulartodo', 
                                    ["ngRoute",
                                     "ngMaterial",
                                     "ngResource",
                                     "todoResourceMock"]);
                                     
    module.config(routeConfig);
    module.config(themeConfig);
   
    // Configure app routes
    routeConfig.$inject = ["$routeProvider"];
    function routeConfig($routeProvider: ng.route.IRouteProvider): void {
        $routeProvider
            .when("/",
                {
                    templateUrl: "/app/components/task-list/task-list.html",
                    controllerAs: "vm",
                    controller: "taskListController"
                })
            .when("/taskDetail/:taskId",
                {
                    templateUrl: "/app/components/task-detail/task-detail.html",
                    controllerAs: 'vm',
                    controller: "taskDetailController"
                })
            .otherwise("/");
    }
    
    function themeConfig($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('green')
            .warnPalette('red')
            .backgroundPalette('blue-grey');
    }
}