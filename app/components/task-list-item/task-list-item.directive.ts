module app.components {
    
    angular
        .module('angulartodo')
        .directive('taskListItem', function() {
            return {
                scope: {},
                controller: 'taskListController',
                controllerAs: 'vm',
                bindToController: {
                    task: '=', 
                    onIsDoneChanged: '@',
                    onEdit: '@',
                    onDelete: '@'
                },
                templateUrl: 'app/components/task-list-item/task-list-item.html'
        };
    });    
}