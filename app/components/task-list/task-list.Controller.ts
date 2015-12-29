module app.todo {
       
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
                this.taskList = data;
            });
        }
        
        filter (term) {
            var deferred = this.$q.defer<any>();
            deferred.resolve(this.searchService.search(this.taskList, term,  "title"));           
            return deferred.promise;
        }        
                
        // deleteTask () {
        //     dlg = $dialogs.confirm('Please Confirm','Is this awesome or what?');
        //     dlg.result.then(function(btn){
        //         $scope.confirmed = 'You thought this quite awesome!';
        //     },function(btn){
        //         $scope.confirmed = 'Shame on you for not thinking this is awesome!';
        //     });
        //}
    }
    
    angular
        .module('angulartodo')
        .controller('taskListController', TaskListController);
}