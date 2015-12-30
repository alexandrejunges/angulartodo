module app.mock {
 
    var mockResouce = angular.module("todoResourceMock", ["ngMockE2E"]);
    
    mockResouce.run(mockRun);
    
    mockRun.$inject = ["$httpBackend"]
    function mockRun($httpBackend: ng.IHttpBackendService) : void {
         
        var apiUrl = "/api/todo";
        
        // Create mocked up list of tasks  
        var taskList = CreateTodoList();

        // When the API url is hit, the list of tasks is returned. 
        $httpBackend.whenGET(apiUrl).respond(taskList);
        
        // Endpoint to return a specific task by its ID. 
        var editingRegex = new RegExp(apiUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(function(method, url, data) {
            
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
        
        // Get
        $httpBackend.whenGET('/api').respond(function(method, url, data) {
            return [200, taskList, {}]; 
        });
                
        // Post
        $httpBackend.whenPOST(apiUrl).respond(function(method, url, data: string, headers){
            var newTask = angular.fromJson(data);
            
            var lastId = 0;
            var n = taskList.length;
            
            for (var i = 0; i != n; ++i) {
                if (taskList[i].id > lastId) {
                    lastId = taskList[i].id;
                }
            }

            newTask.id = lastId + 1;
            
            new app.models.Task(newTask.id, newTask.title, new Date(newTask.dueDate), newTask.isDone)
            taskList.push(newTask);
            return [200, {}, {}];
        });
        
        // Put
        $httpBackend.whenPUT(editingRegex).respond(function(method, url, data: string, headers){                       
            var id = getIdFromUrl(url);
            var editedTask = angular.fromJson(data);            
            
            taskList.forEach(function(task, index, array) {
                if (task.id == id) {
                    array.splice(index, 1);
                    array.push(new app.models.Task(editedTask.id, editedTask.title, new Date(editedTask.dueDate), editedTask.isDone));
                    return [200, {}, {}];
                }
            });
            
            return [200, {}, {}];
        });
        
        // Delete
        $httpBackend.whenDELETE(editingRegex).respond(function(method, url, data, headers) {

            var id = getIdFromUrl(url);
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
    }
    
    function CreateTodoList() : app.models.Task[] {
        
        var todoList : app.models.Task[] = [];
        
        todoList.push(new app.models.Task(2, "Encher o tanque", new Date(2015, 11, 29, 0, 0, 0, 0), false));       
        todoList.push(new app.models.Task(3, "Calibrar os pneus", new Date(2015, 11, 30, 0, 0, 0, 0), false));       
        todoList.push(new app.models.Task(4, "Fazer as malas", new Date(2015, 11, 30, 0, 0, 0, 0), false));
        todoList.push(new app.models.Task(1, "Mandar carro para a revisão", new Date(2015, 11, 28, 0, 0, 0, 0), true));              
        todoList.push(new app.models.Task(5, "Hit the road", new Date(2015, 11, 31, 0, 0, 0, 0), false));
        
        return todoList;
    }
    
    function getIdFromUrl(url: string) : number {
        var parameters = url.split('/');
        var length = parameters.length;
        return +parameters[length - 1];
    }
}