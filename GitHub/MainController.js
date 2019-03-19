// Immediately Invoked Function Expression (IIFE)
(function() {

    // reference to module
    var app = angular.module("githubViewer");

    // controller - MainController
    var MainController = function($scope, $interval, $location) {

        var decrementCountdown = function() {
            $scope.countdown -= 1;
            if($scope.countdown < 1) {
                $scope.search($scope.username);
            }

        }

        var countdownInterval = null;
        var startCountdown = function() {
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        }

        $scope.search = function(username) {
            if(countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
            $location.path("/user/" + username);
        };

        // default search
        $scope.username = "angular";
        $scope.countdown = 5;
        startCountdown();

    };

    // register controller in module
    app.controller("MainController", MainController);

    // Minify Syntax
    // app.controller("MainController", ["$scope", "$http", "$interval", MainController]);


}());
