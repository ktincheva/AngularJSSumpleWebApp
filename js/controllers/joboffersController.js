'use strict';

app.controller('joboffersController', function ($scope, $rootScope, $location, jobOffers) {
    $scope.joboffersData = {};
    $scope.loading = true;
    console.log($rootScope);
    jobOffers.getJoboffers()
            .success(function (data) {
                $scope.joboffers = data;
                $scope.candidate = $rootScope.candidate
                $scope.availableOptions = $rootScope.availableOptions;
                $scope.loading = false;
            })
            .error(function (data) {
                console.log(data)
            });
});

app.controller('editJoboffersController', function ($scope, $rootScope, $location, $routeParams, jobOffers) {
    console.log($routeParams);
    var jobofferId = ($routeParams.id) ? parseInt($routeParams.id) : 0;
    console.log(jobofferId);
    $rootScope.jobofferId
    $rootScope.joboffer = new Object();
    $rootScope.title = (jobofferId > 0) ? 'Edit' : 'Add';
    $scope.buttonText = (jobofferId > 0) ? 'Update' : 'Add New';
    if (jobofferId > 0)
    {
        jobOffers.getJoboffer(jobofferId)
                .success(function (data) {
                    console.log(data);
                    $rootScope.joboffer = data;
                    $scope.loading = false;
                })
                .error(function (data) {
                    console.log(data)
                });
    } else {
        $rootScope.joboffer.id = 0;
    }
    $scope.deleteJoboffer = function (joboffer) {
        if (confirm("Are you sure to delete joboffer number: " + $scope.joboffer.id) == true)
            jobOffers.deleteJoboffer(joboffer.id);
        $location.path('/joboffers');
    };

    $scope.saveJoboffer = function (joboffer) {
        $location.path('/joboffers');

        jobOffers.saveJoboffer(joboffer.id, $scope.joboffer);
    };
});

app.controller('appliedJoboffersController', function ($scope, $rootScope, $location, $routeParams, jobOffers, Candidates) {

    var jobofferId = ($routeParams.id) ? parseInt($routeParams.id) : 0;
    var candidateId = ($routeParams.candidateid) ? parseInt($routeParams.candidateid) : 0;
    console.log($rootScope);
    jobOffers.getJoboffer(jobofferId)
            .success(function (data) {
                console.log($rootScope.candidate);
                $rootScope.joboffer = data;
                $scope.loading = false;
            })
            .error(function (data) {
                console.log(data)
            });

    Candidates.getById(candidateId)
            .success(function (data) {
                console.log(data);
                $rootScope.candidate = data;
                $scope.loading = false;
            })
            .error(function (data) {
                console.log(data)
            });
F
    $scope.applyJoboffer = function () {

    };
});
