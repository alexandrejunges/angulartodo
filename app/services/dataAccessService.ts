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
            var resource = this.$resource("/api/todo/:taskId", {}, {
                save: {
                    method: 'POST'
                },
                update: {
                    method: 'PUT'
                }
            });
            
            resource.prototype.$save = function() {
                if (!this.id) {
                    return this.$create();
                } else {
                    return this.$update({taskId: this.id});
                }
            };
            
            return resource;
        }
    }
    
    // Register the service
    angular.module('angulartodo')
        .service("dataAccessService", DataAccessService);
}