app.controller('AuthController', function ($auth, $http, $rootScope, $scope, $location, Candidates, Experience, AuthService) {

    $scope.email = '';
    $scope.password = '';
    $scope.newUser = {};
    $scope.loginError = false;
    $scope.loginErrorText = '';



    $scope.login = function () {

        var credentials = {
            email: $scope.email,
            password: $scope.password
        }

        AuthService.login(credentials)
                .success(function (result) {
                    console.log(result);
                    $scope.currentUser = result.data.user;
                    $scope.loginError = false;
                    $scope.loginErrorText = '';
                    $location.path('/jobofferslist');
                    Session.create(result.data.user, result.data.user.id, result.data.user.role);
                })
                .error(function () {
                    $scope.loginError = true;
                    $scope.loginErrorText = 'Yps, somthing went wrong! Invalid user name or passwod';
                    $location.path('/login');
                });
    }



    $scope.submitCandidate = function () {
        $scope.loading = true;
        Candidates.save($scope.candidateData)
                .success(function (result) {
                    if (result.success)
                    {
                        // if successful, we'll need to refresh the comment list
                        $scope.joboffer = {};
                        $rootScope.candidate = result.data;
                        $scope.loading = false;
                        $location.path('/jobofferslist');
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
});