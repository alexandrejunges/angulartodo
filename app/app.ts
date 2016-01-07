module app {
    // Define the module an its dependencies
    var module = angular.module('angulartodo', 
                                    ["ngRoute",
                                     "ngMaterial",
                                     "ngResource",
                                     "todoResourceMock"]);

    module.config(routeConfig);
    module.config(themeConfig);
   
    // Configure app routes - $routeProvider is injected
    routeConfig.$inject = ["$routeProvider"];
    function routeConfig($routeProvider: ng.route.IRouteProvider): void {
        $routeProvider
            .when("/",
                {
                    template: "<task-list></task-list>",
                })
            .when("/taskDetail/:taskId",
                {
                    template: "<task-detail></task-detail>",
                })
            .otherwise("/");
    }
 
    // Change the default theme's palettes   
    function themeConfig($mdThemingProvider) {
         $mdThemingProvider.theme('default')
             .accentPalette('green')
             .backgroundPalette('blue-grey');
    }
}