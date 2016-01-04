module app.components {
       
    export class TaskListController {
        
        taskList: app.models.Task[];
        searchText: string;
        hideDoneTasks: boolean;
        
        static $inject = ["dataAccessService", "searchService", "$q", "$mdToast", "$mdDialog", "$mdMedia", "$scope"];
        constructor(private dataAccessService: app.services.DataAccessService,
                    private searchService: app.services.SearchService,
                    private $q: ng.IQService,
                    private $mdToast: any,
                    private $mdDialog: any,
                    private $mdMedia: any,
                    private $scope: any) {
            
            this.taskList = [];
            
            this.searchText = '';
            this.hideDoneTasks = false;
            
            this.loadTasks();
        }
               
        loadTasks() {
            var todoResource = this.dataAccessService.getTodoResource();
            todoResource.query((data: app.models.Task[]) => {
                this.taskList = data.map(function(item) {
                    // hack to treat the date the same way
                    return new app.models.Task(item.id, item.title, new Date(item.dueDate.toString()), item.isDone);
                });
            });
        }
        
        addTask() {
            var self = this;
            var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
            
            this.$mdDialog.show({
                locals: { currentTask: null },
                controller: TaskDetailController,
                controllerAs: 'vm',
                templateUrl: '/app/components/task-detail/task-detail.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: true
            }).then(function(answer) {
                if(answer) {
                    self.loadTasks();
                    self.$mdToast.showSimple("Task added successfully");
                }
            });
        }
        
         editTask(task: app.models.Task) {
            var self = this;
            var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
            
            this.$mdDialog.show({
                locals: { currentTask: task },
                controller: TaskDetailController,
                controllerAs: 'vm',
                templateUrl: '/app/components/task-detail/task-detail.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            }).then(function(answer) {
                if(answer) {
                    self.loadTasks();
                    self.$mdToast.showSimple("Task added successfully");
                }
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
                    self.loadTasks();
                    self.$mdToast.showSimple('Done tasks removed successfully');
                });
            }
        }
        
        isDoneChanged (editedTask : app.models.Task) {
            var self = this;
            
            var todoResource = this.dataAccessService.getTodoResource();         
             todoResource.update({ taskId: editedTask.id }, editedTask, function() {
                self.$mdToast.showSimple("Task marked as " +  (editedTask.isDone ? "done" : "undone") + " successfully");
             });
        }
        
        filter (term) {
            var deferred = this.$q.defer<any>();                                  
            deferred.resolve(this.searchService.search(this.taskList, term,  "title"));                    
            return deferred.promise;
        }
        
        // Deprecated
        getColor(task : app.models.Task) {
            return task.isDone ? 'transparent' : task.isDueToday() ? '#E6E66A' : task.isDelayed() ? 'rgba(245, 32, 32, 0.55)' : 'transparent';
        }
    }
    
    angular
        .module('angulartodo')
        .controller('taskListController', TaskListController);
}