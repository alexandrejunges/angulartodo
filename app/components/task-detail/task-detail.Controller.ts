module app.components {
    
    interface ITodoParams extends ng.route.IRouteParamsService {
        taskId: number;
    }
    
    export class TaskDetailController {
        
        task: app.models.Task;
        
        static $inject = ["$routeParams", "dataAccessService"]
        constructor (private $routeParams : ITodoParams,
                     private dataAccessService: app.services.DataAccessService) {
            
            if($routeParams.taskId) {
                var todoResource = dataAccessService.getTodoResource();
                todoResource.get({taskId: $routeParams.taskId}, 
                    (data: app.models.Task) => {
                    this.task = data;
                    });            
            }
            else {
                task = new app.models.Task(null, "")
            }
        }
    }
    
    angular
        .module('angulartodo')
        .controller('taskDetailController', TaskDetailController);
}