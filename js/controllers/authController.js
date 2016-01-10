app.controller('authController', function ($auth, $http, $rootScope, $scope, $location, Candidates, Experience, AuthService, SessionService) {

    $scope.email = '';
    $scope.password = '';
    $scope.newUser = {};
    $scope.loginError = false;
    $scope.loginErrorText = '';


    var setLoggedData = function (credentials)
    {
        console.log(credentials);
        AuthService.login(credentials)
                .success(function (result) {
                    if (result.success)
                    {
                        SessionService.set('user', JSON.stringify(result.data.user))
                        SessionService.set('user.role', result.data.user.role);
                        AuthService.setUser(result.data.user);
                        $scope.candidate = result.data.user;
                        $scope.loginError = false;
                        $scope.loginErrorText = '';
                        if (result.data.user.role == 1)
                            $location.path('/jobofferslist');
                        else {
                            $location.path('/joboffers');
                        }
                    } else {
                        $scope.loginError = true;
                        $scope.loginErrorText = 'Yps, somthing went wrong! Invalid user name or passwod';
                        $location.path('/login');
                    }
                    // Session.set('user'=>result.data.user);
                    //console.log(Session);
                })
                .error(function () {
                    AuthService.setUser(false)
                    SessionService.set('user', false);
                    $scope.loginError = true;
                    $scope.loginErrorText = 'Yps, somthing went wrong! Invalid user name or passwod';
                    $location.path('/login');
                });
    }
    
    
    $scope.login = function () {
        console.log("login");
        var credentials = {
            email: $scope.email,
            password: $scope.password
        }
        setLoggedData(credentials)

    }



    $scope.submitCandidate = function () {
        $scope.loading = true;
        Candidates.save($scope.candidateData)
                .success(function (result) {
                    if (result.success)
                    {
                        credentials = {
                            email: $scope.candidateData.email,
                            password: $scope.candidateData.password
                        }
                        console.log(credentials)
                        setLoggedData(credentials)
                    }
                    else
                    {
                        $scope.loginError = true;
                        $scope.loginErrorText = "User already exists";
                        $scope.loading = false;
                        $location.path('/register');
                    }
                })
                .error(function (result) {
                    console.log(result)
                });

    };

    $scope.loggedIn = function ()
    {
        if (user)
        {
            $scope.loggedIn = user;
            console.log($scope.loggedIn);
        }
        else
            $scope.loggedIn = false;
    }

    $scope.logout = function ()
    {
        console.log("logout");
        SessionService.unset('user');
        AuthService.setUser(false);
        $scope.loggedIn = false;
        $scope.loggedIn.role = false;
        $location.path('/login');
    }
});