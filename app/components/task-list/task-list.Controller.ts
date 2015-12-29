module app.todo {
    
    export class TaskListController {
        
        taskList: app.models.Task[];
        
        static $inject = ["dataAccessService"];
        constructor(private dataAccessService: app.services.DataAccessService) {
            
            this.taskList = [];
            
            var todoResource = dataAccessService.getTodoResource();
            todoResource.query((data: app.models.Task[]) => {
                this.taskList = data;
            });
        }
    }
    
    angular
        .module('angulartodo')
        .controller('taskListController', TaskListController);
}