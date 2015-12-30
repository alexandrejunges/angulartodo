module app.components {
       
    export class TaskListController {
        
        taskList: app.models.Task[];
        searchText: string;
        showDoneTasks: boolean;
        
        static $inject = ["dataAccessService", "searchService", "$q", "$mdToast"];
        constructor(private dataAccessService: app.services.DataAccessService,
                    private searchService: app.services.SearchService,
                    private $q: ng.IQService,
                    private $mdToast: any) {
            
            this.taskList = [];
            this.searchText = '';
            this.showDoneTasks = true;
            
            this.loadTasks();
        }
               
        loadTasks() {
            var todoResource = this.dataAccessService.getTodoResource();
            todoResource.query((data: app.models.Task[]) => {
                this.taskList = data.sort(function (a, b) { return a.dueDate.getDate() - b.dueDate.getDate() });
            });
        }       
        
        isDoneChanged (editedTask : app.models.Task) {
            var self = this;
            
            var todoResource = this.dataAccessService.getTodoResource();         
             todoResource.update({ taskId: editedTask.id }, editedTask, function() {
                self.$mdToast.showSimple("Task marked as " +  (editedTask.isDone ? "done" : "undone") + " successfully");
             });
        }
                
        deleteTask (taskToDelete) {
            var self = this;           
            var deletedTask;
            
            this.taskList.forEach(function(task, index, array) {
                if (taskToDelete.id == task.id) {
                    deletedTask = task;
                    array.splice(index, 1);
                }
            });
            
            var todoResource = this.dataAccessService.getTodoResource();         
             todoResource.delete({ taskId: deletedTask.id }, function() {
                self.$mdToast.showSimple('Task removed successfully');
             });
        }
        
        deleteAllDoneTasks() {
            var self = this;
            var promises = [];

            debugger;
            
            var todoResource = this.dataAccessService.getTodoResource();

            this.taskList.forEach(function(task, index, array) {
                if (task.isDone) {                   
                    var promise = todoResource.delete({ taskId: task.id });
                    promises.push(promise.$promise);                  
                }
            });
            
            if (promises.length == 0) {
                self.$mdToast.showSimple('There is no task done to be deleted.');
            } else {
                this.$q.all(promises).then(function() {
                    self.$mdToast.showSimple('Done tasks removed successfully');                                
                    self.loadTasks();
                });
            }
        }
        
        getColor(task : app.models.Task) {
            return task.isDone ? '#72d572' : task.isDelayed() ? '#DE4545' : task.isDueToday() ? '#E6E66A' : 'transparent'
        }
        
        filter (term) {
            var deferred = this.$q.defer<any>();                                  
            deferred.resolve(this.searchService.search(this.taskList, term,  "title"));                    
            return deferred.promise;
        }
    }
    
    angular
        .module('angulartodo')
        .controller('taskListController', TaskListController);
}