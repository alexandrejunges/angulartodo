module app.components {
       
    export class TaskListController {
        
        taskList: app.models.Task[];
        searchText: string;
        
        static $inject = ["dataAccessService", "searchService", "$q", "$mdToast"];
        constructor(private dataAccessService: app.services.DataAccessService,
                    private searchService: app.services.SearchService,
                    private $q: ng.IQService,
                    private $mdToast: any) {
            
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
        
        isDoneChanged (editedTask : app.models.Task) {
            var self = this;
            
            var todoResource = this.dataAccessService.getTodoResource();         
             todoResource.save({ taskId: editedTask.id }, function() {
                self.$mdToast.showSimple("Task marked as " +  (editedTask.isDone ? "done" : "undone") + " successfully");
             });  
        }
                
        deleteTask (taskToDelete) {
           
            var deletedTask;
            this.taskList.forEach(function(task, index, array) {
                if (taskToDelete.id == task.id) {
                    deletedTask = task;
                    array.splice(index, 1);
                }
            });
            
            var self = this;
            
            var todoResource = this.dataAccessService.getTodoResource();         
             todoResource.delete({ taskId: deletedTask.id }, function() {
                self.$mdToast.showSimple('Task removed successfully');
             });
        }
    }
    
    angular
        .module('angulartodo')
        .controller('taskListController', TaskListController);
}