module app.services {
    
     interface IDataAccessService {
         
     }
    
    interface ITodoResource extends ng.resource.IResource<app.models.Task> {
        
    }
    
    export class DataAccessService implements IDataAccessService {
        
        static $inject = ["$resource"];
        constructor(private $resource: ng.resource.IResourceService) {
    
        }
        
        getTodoResource() : ng.resource.IResourceClass<ITodoResource> {
            return this.$resource("/api/todo/:taskId");
        }
    }
    
    angular
        .module("angulartodo")
        .service("dataAccessService", DataAccessService);
}