module app.components {
    
     export class TaskListItemController {

         constructor (id, title, dueDate, isDone) {
             
         }
    }
    
    angular.module("angulartodo")
        .directive('taskListItem', [function () {
            return {
                restrict: 'E',
                //replace: true,
                scope: {
                    id: '@',
                    title: '@',
                    dueDate: '@',
                    isDone: '@'
                },
                templateUrl: '/app/components/task-list-item/task-list-item.html',
                // controller: TaskListItemController,
                // controllerAs: 'vm',
                //bindToController: true
            };
        }]);
        
    angular
        .module('angulartodo')
        .controller('taskListItemController', TaskListItemController);
}