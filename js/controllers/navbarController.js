'use strict';

app.controller('navbarController', function ($scope, $rootScope, $location, AuthService, SessionService) {

    var user = JSON.parse(SessionService.get('user'));
    //$scope.loggedIn = false;
    if (!user)
    {
        $scope.loggedIn = {"role": -1};
        $scope.loginError = true;
        $scope.loginErrorText = 'Yps, somthing went wrong! Invalid user name or passwod';
    } else {
        $scope.loggedIn = user;
    }
});
