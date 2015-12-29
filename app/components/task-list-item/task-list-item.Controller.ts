   module app.todo {
    
    export class TaskListItemController {
        
        taskList: app.models.Task[];
        
        static $inject = ["dataAccessService"];
        constructor(private dataAccessService: app.services.DataAccessService) {
            
            
        }
    }
    
    angular
        .module('angulartodo')
        .controller('taskListItemController', TaskListItemController);
}