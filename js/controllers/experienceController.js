/*
 * Controller return experince options
 */
app.controller('ExperienceController', function ($scope, $rootScope, $http, Experience) {
    $scope.data = {
        repeatSelect: null,
        availableOptions: [],
    };
    $scope.loading = true;

    Experience.getExperience()
            .success(function (data) {
                console.log(data)
                $rootScope.availableOptions = data;
                $scope.loading = false;
            })
            .error(function (data) {
                console.log(data)
            });
});
