module app.services {
    export class SearchService {
        search (items: any[], searchText: string, propertyToFilter?: string): any[] {
            var filtered = [];
            
            if (!searchText) { 
                return items; 
            }
            
            angular.forEach(items, function (item) {
                if (typeof item == 'object') {
                    if (propertyToFilter) {
                        if (angular.lowercase(item[propertyToFilter]).indexOf(angular.lowercase(searchText)) != -1) {
                            filtered.push(item);
                        }
                    }
                    else {
                        
                    }
                }
                else {
                    if (angular.lowercase(item).indexOf(angular.lowercase(searchText)) != -1) {
                        filtered.push(item);
                    }
                }
            });
            
            return filtered;
        }
    }
    
    // Register the service
    angular.module('angulartodo')
        .service("searchService", SearchService);
}