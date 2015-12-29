module app.components {
    
     export class TaskListItemController {
         
    }
    
    angular.module("angulartodo")
        .directive('taskListItem', [function () {
            return {
                restrict: 'E',
                scope: {
                    title: '@',
                    dueDate: '@',
                    isDone: '@'
                },
                templateUrl: 'task-list-item.html',
                controller: TaskListItemController,
                controllerAs: 'vm',
                bindToController: true
            };
        }]);
}