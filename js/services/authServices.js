app.factory('AuthService', function ($http, $rootScope) {
    var authService = {};
    var user;
    authService.login = function (credentials) {
        return $http({
            method: 'POST',
            url: myConfig.apiUrl + 'login',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param(credentials)
        });
    };
    authService.isAuthenticated = function () {
        // 
        if (!user) user =  JSON.parse(sessionStorage.getItem('user'));
        if(user) return user;
        else return false;
       
    };

    authService.isAuthorized = function (authorizedRoles) {
        //
    };
    
    authService.setUser = function(aUser)
    {
        console.log(aUser)
        user = aUser;
    };

    return authService;
})

