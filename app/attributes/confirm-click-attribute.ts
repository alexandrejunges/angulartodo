// Reference: http://stackoverflow.com/questions/22915006/custom-delete-confirm-in-angularjs/23718694#23718694

module app.directives {
    
    angular.module("angulartodo")
        .directive('confirmClick', ['$mdDialog', function ($mdDialog) {            
            return {
                priority: 1,
                restrict: 'A',
                link: {
                    pre: function (scope, element, attrs) {                        
                               
                        var clickAction = attrs.ngClick;
                               
                        var confirm = $mdDialog.confirm()
                            .title(attrs.dialogTitle || "Are you sure?")
                            .textContent(attrs.dialogMessage || "")
                            .targetEvent(event)
                            .ok(attrs.dialogOk || "Yes")
                            .cancel(attrs.dialogCancel || "No")
                            .openFrom({
                                top: -50,
                                width: 30,
                                height: 80
                            })
                                .closeTo({
                                left: 1500
                            }); 
                                                        
                        element.bind('click', function (event) {
                                        
                            event.stopImmediatePropagation();
                            event.preventDefault();
                                                            
                            $mdDialog.show(confirm).then(function() {
                                if(clickAction) {
                                    scope.$eval(clickAction)
                                }
                            }, function() {
                                
                            });
                        });
                    }
                }
            };
        }]);
}