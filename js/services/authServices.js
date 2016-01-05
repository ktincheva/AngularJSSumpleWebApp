app.factory('AuthService', function ($http) {
    var authService = {};
    console.log("login")
    authService.login = function (credentials) {
        return $http({
            method: 'POST',
            url: myConfig.apiUrl + 'login',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param(credentials)
        });
    };
    authService.isAuthenticated = function () {
        return !!Session.userId;
    };

    authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
                authorizedRoles.indexOf(Session.userRole) !== -1);
    };

    return authService;
})

