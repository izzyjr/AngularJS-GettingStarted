(function(){

    var github = function($http) {

        var getUser = function(username) {
            return $http.get("https://api.github.com/users/" + username)
                .then(function(response) {
                    return response.data;
            });
        };

        var getRepos = function(user) {
            return $http.get(user.repos_url)
                .then(function(response) {
                    return response.data;
                });
        }

        return {
            getUer: getUser,
            getRepos: getRepos
        };

    };


    // give me a reference to a module called "githubViewer"
    // reference not creation of module (reason for no [] as a second parameter)
    var module = angular.module("githubViewer");

    // registering github service with Angular
    module.factory("github", github);

}());