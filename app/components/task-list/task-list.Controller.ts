module app.components {
       
    export class TaskListController {
        
        taskList: app.models.Task[];
        searchText: string;
        
        static $inject = ["dataAccessService", "searchService", "$q"];
        constructor(private dataAccessService: app.services.DataAccessService,
                    private searchService: app.services.SearchService,
                    private $q: ng.IQService) {
            
            this.taskList = [];
            this.searchText = null;
            
            var todoResource = dataAccessService.getTodoResource();
            todoResource.query((data: app.models.Task[]) => {
                this.taskList = data.sort(function (a, b) { return a.dueDate.getDate() - b.dueDate.getDate() });
            });
        }
        
        getColor(task : app.models.Task) {
            return task.isDone ? '#72d572' : task.isDelayed() ? '#DE4545' : task.isDueToday() ? '#E6E66A' : 'transparent'
        }
        
        filter (term) {
            var deferred = this.$q.defer<any>();                                  
            deferred.resolve(this.searchService.search(this.taskList, term,  "title"));                    
            return deferred.promise;
        }
                
        deleteTask (taskToDelete) {           
            // TODO - Adicionar confirmação
            
            var deletedTask;
            this.taskList.forEach(function(task, index, array) {
                if (taskToDelete.id == task.id) {
                    deletedTask = task;
                    array.splice(index, 1);
                }
            });
            
            debugger;
            //deletedTask.$delete();
            var todoResource = this.dataAccessService.getTodoResource();         
             todoResource.delete({ taskId: deletedTask.id }, function() {
                 // callback
             });
        }
        
        // $scope.$watch('todos', function () {
        //     todoService.refresh($scope.todos);
        // }, true);
    }
    
    angular
        .module('angulartodo')
        .controller('taskListController', TaskListController);
}