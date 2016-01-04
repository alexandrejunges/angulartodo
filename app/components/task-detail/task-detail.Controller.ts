module app.components {
    
    interface ITodoParams extends ng.route.IRouteParamsService {
        taskId: number;
    }
    
    export class TaskDetailController {
        
        task: app.models.Task;
        
        actionName: string;
        isEdition: boolean;
        
        taskId: number;
        taskTitle: string;
        taskDueDate: Date;
        
        static $inject = ["$routeParams", "dataAccessService", "$mdDialog", "$scope", 'currentTask']
        constructor (private $routeParams : ITodoParams,
                     private dataAccessService : app.services.DataAccessService,
                     private $mdDialog : ng.material.IDialogService,
                     private $scope : ng.IScope,
                     currentTask : app.models.Task) {
            
            if (currentTask) {
                this.isEdition = true;
                
                // Creates a copy of the original task. This is important in case the user cancel the edition.
                this.task = new app.models.Task(
                    currentTask.id, 
                    currentTask.title, 
                    currentTask.dueDate, 
                    currentTask.isDone);
            }
            else {
                this.isEdition = false;
                this.task = new app.models.Task(null, "")
            }
            
            this.actionName = this.isEdition ? "Update" : "Create";
        }
        
        save() {
            var self = this;
            
            if (this.$scope.taskForm.$valid) {
                var todoResource = this.dataAccessService.getTodoResource();
                
                if (this.isEdition) {         
                    todoResource.update({ taskId: this.task.id }, this.task, function() {
                        self.$mdDialog.hide(true);
                    });
                } else {
                    todoResource.save({}, this.task, function() {
                        self.$mdDialog.hide(true);
                    });
                }
            } else {
                //  self.$mdDialog.alert()
                //     .parent(angular.element(document.querySelector('#taskDetailContainer')))
                //     .clickOutsideToClose(true)
                //     .title('Há campos não informados.')
                //     .textContent('Revise os campos e tente novamente.')
                //     .ok('Ok');
            }
        }
        
        cancel() {
            this.$mdDialog.cancel();
        }
    }
    
    angular
        .module('angulartodo')
        .controller('taskDetailController', TaskDetailController);
}