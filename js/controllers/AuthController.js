app.controller('AuthController', function ($auth, $http, $rootScope, $scope, $location, Candidates) {

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

        $auth.login(credentials).then(function () {

            return $http.get('api/authenticate/user');

        }, function (error) {
            $scope.loginError = true;
            $scope.loginErrorText = error.data.error;

        }).then(function (response) {
            $rootScope.currentUser = response.data.user;
            $scope.loginError = false;
            $scope.loginErrorText = '';           
        });
    }



    $scope.submitCandidate = function () {
        $scope.loading = true;
        Candidates.save($scope.candidateData)
                .success(function (data) {

                    // if successful, we'll need to refresh the comment list
                    $scope.joboffer = {};
                    $rootScope.candidate = data.data;
                    console.log($rootScope.candidate);
                    $scope.loading = false;
                    $location.path('/jobofferslist');
                })
                .error(function (data) {
                    console.log(data)
                });

    };
});