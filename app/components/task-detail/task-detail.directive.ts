module app.components {
    
    angular
        .module('angulartodo')
        .directive('taskDetail', function() {
            return {
                scope: {},
                controller: 'taskDetailController',
                controllerAs: 'vm',
                templateUrl: 'app/components/task-detail/task-detail.html'
        };
    });    
}