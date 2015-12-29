module app.todo {
 
    var mockResouce = angular.module("todoResourceMock", ["ngMockE2E"]);
    
    mockResouce.run(mockRun);
    
    mockRun.$inject = ["$httpBackend"]
    function mockRun($httpBackend: ng.IHttpBackendService) : void {
         
        var apiUrl = "/api/todo";
        
        // Create mocked up list of tasks  
        var todoList = CreateTodoList();
        
        // When the API url is hit, the list of tasks is returned. 
        $httpBackend.whenGET(apiUrl).respond(todoList);
        
        // Endpoint to return a specific task by its ID. 
        var editingRegex = new RegExp(apiUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(function(method, url, data) {
            var todo = { "id" : 0 };
            var parameters = url.split('/');
            var length = parameters.length;
            var id = +parameters[length - 1];
            
            if (id > 0) {
                for (var i = 0; i < todoList.length; i++) {
                    if (todoList[i].id == id) {
                        todo = todoList[i];
                        break;
                    }
                }
            }
            
            return [200, todo, {}];
        });
        
        $httpBackend.whenGET('/api').respond(function(method, url, data) {
            return [200, todoList, {}]; 
        });
        
        // When the url has 'app', the request pass
        $httpBackend.whenGET(/^\/app\//).passThrough();
        
        $httpBackend.whenGET(/^\/images\//).passThrough();
    }
    
    function CreateTodoList() : app.models.Task[] {
        
        var todoList : app.models.Task[] = [];
        
        todoList.push(new app.models.Task(1,"Mandar carro para a revisão", new Date(2015, 12, 29), true));        
        todoList.push(new app.models.Task(2, "Encher o tanque", new Date(2015, 12, 30), false));       
        todoList.push(new app.models.Task(3, "Calibrar os pneus", new Date(2015, 12, 30), false));       
        todoList.push(new app.models.Task(4, "Fazer as malas", new Date(2015, 12, 30), false));      
        todoList.push(new app.models.Task(5, "Hit the road", new Date(2015, 12, 31), false));
        
        return todoList;
    }
}