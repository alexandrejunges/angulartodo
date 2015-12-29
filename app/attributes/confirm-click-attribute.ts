module app.directives {
    angular.module("angulartodo")
        .directive('confirmClick', [function () {
            return {
                priority: 1,
                restrict: 'A',
                link: {
                    pre: function (scope, element, attrs) {
                        var message = attrs.confirmClick || "Are you sure?";
                        element.bind('click', function (event) {
                            if (!confirm(message)) {
                                event.stBopImmediatePropagation();
                                event.preventDefault;
                            }
                        });
                    }
                }
            };
        }]);
}