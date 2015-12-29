module app.todo {
       
    export class TaskListController {
        
        taskList: app.models.Task[];
        
        static $inject = ["dataAccessService", "searchService", "$q"];
        constructor(private dataAccessService: app.services.DataAccessService,
                    private searchService: app.services.SearchService,
                    private $q: ng.IQService) {
            
            this.taskList = [];
            
            var todoResource = dataAccessService.getTodoResource();
            todoResource.query((data: app.models.Task[]) => {
                this.taskList = data;
            });
        }
        
        search(term) {
            var deferred = this.$q.defer<any>();
            deferred.resolve(this.searchService.search(this.taskList, term,  "title"));           
            return deferred.promise;
        }
    }
    
    angular
        .module('angulartodo')
        .controller('taskListController', TaskListController);
}