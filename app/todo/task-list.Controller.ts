module app.todo {
    
    // export class TaskListController {
    //     
    //     taskList: app.models.Task[];
    //     
    //     static $inject = ["dataAccessService"];
    //     constructor(private dataAccessService: app.services.DataAccessService) {
    //         
    //         this.taskList = [];
    //         
    //         var todoResource = dataAccessService.getTodoResource();
    //         todoResource.query((data: app.models.Task[]) => {
    //             this.taskList = data;
    //         });
    //     }
    // }
    
    export class TaskListController {
        
        taskList: app.models.Task[];
        
        //static $inject = ["dataAccessService"];
        constructor() {
            
            this.taskList = [];
            this.taskList.push(new app.models.Task(1, 'Teste1', '', new Date(2015,1,1)));
            this.taskList.push(new app.models.Task(2, 'Teste2', '', new Date(2015,1,1)));
            this.taskList.push(new app.models.Task(3, 'Teste3', '', new Date(2015,1,1)));
        }
    }
    
    angular
        .module('angulartodo')
        .controller('taskListController', TaskListController);
}