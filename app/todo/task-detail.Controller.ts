module app.todo {
    
    interface ITodoParams extends ng.route.IRouteParamsService {
        taskId: number;
    }
    
    export class TaskDetailController {
        
        task: app.models.Task;
        
        static $inject = ["$routeParams", "dataAccessService"]
        constructor (private $routeParams : ITodoParams,
                     private dataAccessService: app.services.DataAccessService) {
            
            var todoResource = dataAccessService.getTodoResource();
            todoResource.get({taskId: $routeParams.taskId}, 
                (data: app.models.Task) => {
                   this.task = data;
                });            
        }
    }
    
    angular
        .module('angulartodo')
        .controller('taskDetailController', TaskDetailController);
}