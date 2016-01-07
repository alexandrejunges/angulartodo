module app.components {
    
    angular
        .module('angulartodo')
        .directive('taskList', function() {
            return {
                scope: {},
                controller: 'taskListController',
                controllerAs: 'vm',
                bindToController: true,
                templateUrl: 'app/components/task-list/task-list.html'
        };
    });    
}