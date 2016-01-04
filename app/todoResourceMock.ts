/*  $httpBackend is a service provided by Angular to mock server requests.
    $httpBackend intercepts http requests and enable developers to use $http and $resource services without a real backend service. 
*/ 

module app.mock {
 
    // Defines the mock module
    var mockResouce = angular.module("todoResourceMock", ["ngMockE2E"]);    
    
    mockResouce.run(mockRun);
    
    mockRun.$inject = ["$httpBackend"]
    function mockRun($httpBackend: ng.IHttpBackendService) : void {
         
        var apiTodoUrl = "/api/todo";
        var apiTodoUrlWithIDRegEx = new RegExp(apiTodoUrl + "/[0-9][0-9]*", '');
        
        // Create mocked up list of tasks
        var taskList = createTodoList();

        // When the url '/api/todo' is hit, the list of tasks is returned
        $httpBackend.whenGET(apiTodoUrl).respond(taskList);
        
        // When an ID is passed in the url (ie: /api/todo/1) the specific task is returned
        $httpBackend.whenGET(apiTodoUrlWithIDRegEx).respond(function(method, url, data) {
            
            var todo = { id: 0 };
            var id = getIdFromUrl(url);
            
            if (id > 0) {
                for (var i = 0; i < taskList.length; i++) {
                    if (taskList[i].id == id) {
                        todo = taskList[i];
                        break;
                    }
                }
            }
            
            return [200, todo, {}];
        });
        
        // GET /api/todo
        $httpBackend.whenGET('/api').respond(function(method, url, data) {
            return [200, taskList, {}]; 
        });
                
        // POST /api/todo 
        $httpBackend.whenPOST(apiTodoUrl).respond(function(method, url, data: string, headers){
            
            // Deserialize the task passed in the request body and set its Id
            var newTask = angular.fromJson(data);            
            newTask.id = getLastTaskId() + 1;
            
            taskList.push(newTask);
            return [200, {}, {}];
        });
        
        // PUT api/todo 
        $httpBackend.whenPUT(apiTodoUrlWithIDRegEx).respond(function(method, url, data: string, headers) {
            
            var id = getIdFromUrl(url);
            var editedTask = angular.fromJson(data);            
            
            taskList.forEach(function(task, index, array) {
                if (task.id == id) {
                    // The old task is removed from the list and the new one is added
                    array.splice(index, 1);
                    array.push(new app.models.Task(editedTask.id, editedTask.title, new Date(editedTask.dueDate), editedTask.isDone));
                    return [200, {}, {}];
                }
            });
            
            return [200, {}, {}];
        });
        
        // DELETE /api/todo
        $httpBackend.whenDELETE(apiTodoUrlWithIDRegEx).respond(function(method, url, data, headers) {

            var id = getIdFromUrl(url);
            
            // Delete the task from the list
            taskList.forEach(function(task, index, array) {
                if (task.id == id) {
                    array.splice(index, 1);
                    return [200, {}, {}];
                }
            });

            return [200, {}, {}];
        });        
        
        // When the url has 'app', the request pass
        $httpBackend.whenGET(/^\/app\//).passThrough();
        
        // When the url has 'images', the request pass
        $httpBackend.whenGET(/^\/images\//).passThrough();
        
        // Returns the last task Id
        function getLastTaskId() : number {
            var lastId = 0;
            var length = taskList.length;
                
            for (var i = 0; i < length; ++i) {
                if (taskList[i].id > lastId) {
                    lastId = taskList[i].id;
                }
            }
            
            return lastId;
        }
    }
    
    // Returns mocked up list of tasks
    function createTodoList() : app.models.Task[] {
        
        var todoList : app.models.Task[] = [];
        
        todoList.push(new app.models.Task(2, "Encher o tanque", new Date(2015, 11, 29, 0, 0, 0, 0), false));       
        todoList.push(new app.models.Task(3, "Calibrar os pneus", new Date(2015, 11, 30, 0, 0, 0, 0), false));       
        todoList.push(new app.models.Task(4, "Fazer as malas", new Date(2015, 11, 30, 0, 0, 0, 0), false));
        todoList.push(new app.models.Task(1, "Mandar carro para a revisão", new Date(2015, 11, 28, 0, 0, 0, 0), true));              
        todoList.push(new app.models.Task(5, "Hit the road", new Date(2015, 11, 31, 0, 0, 0, 0), false));
        
        return todoList;
    }
    
    // Returns the ID passed in the URL 
    function getIdFromUrl(url: string) : number {
        var parameters = url.split('/');
        var length = parameters.length;
        return +parameters[length - 1];
    }
}