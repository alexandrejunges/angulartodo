module app.services {

    interface ITodoResource extends ng.resource.IResource<app.models.Task> {
        
    }
    
     interface IDataAccessService {
         getTodoResource() : ng.resource.IResourceClass<ITodoResource>;
     }
    
    // Service to return/persist data from/into the server
    export class DataAccessService implements IDataAccessService {
        
        static $inject = ["$resource"];
        constructor(private $resource: ng.resource.IResourceService) {
    
        }
        
        getTodoResource() : ng.resource.IResourceClass<ITodoResource> {
            return this.$resource("/api/todo/:taskId");
        }
    }
    
    // Register the service
    angular
        .module("angulartodo")
        .service("dataAccessService", DataAccessService);
}