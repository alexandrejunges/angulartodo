module app.todo {
 
    var mockResouce = angular.module("todoResourceMock", ["ngMockE2E"]);
    
    mockResouce.run(mockRun);
    
    mockRun.$inject = ["$httpBackend"]
    function mockRun($httpBackend: ng.IHttpBackendService) : void {
         
        var todoList : app.models.Task[] = [];
        var todoItem : app.models.Task;
        
        todoItem = new app.models.Task(1, "Mandar carro para a revisão", "", new Date(2015, 12, 29));
        todoList.push(todoItem);
        
        todoItem = new app.models.Task(2, "Encher o tanque", "", new Date(2015, 12, 30));
        todoList.push(todoItem);
        
        todoItem = new app.models.Task(3, "Calibrar os pneus", "", new Date(2015, 12, 30));
        todoList.push(todoItem);
        
        todoItem = new app.models.Task(4, "Fazer as malas", "", new Date(2015, 12, 30));
        todoList.push(todoItem);
        
        todoItem = new app.models.Task(5, "Hit the road", "", new Date(2015, 12, 31));
        todoList.push(todoItem);
        
        var apiUrl = "/api/todo/";
        
        $httpBackend.whenGET(apiUrl).respond(todoList);
        
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
        
        $httpBackend.whenGET('/api/').respond(function(method, url, data) {
            return [200, todoList, {}]; 
        });
        
        $httpBackend.whenGET('/app/').passThrough();
    }
}