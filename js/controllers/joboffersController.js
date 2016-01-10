'use strict';

app.controller('joboffersController', function ($scope, $rootScope, $location, jobOffers, AuthService, Candidates) {
    var user = AuthService.isAuthenticated();
    if (!user) {
        console.log("Disconnect");
        $location.path('/login');
    }
    else {
        console.log("Connect");
        //Do something when the user is connected
        $scope.joboffersData = {};
        $scope.loading = true;
        jobOffers.getJoboffers()
                .success(function (data) {
                    console.log(user);
                    console.log(user.id);
                    $scope.loggedIn = user.name;
                    $scope.joboffers = data;
                    $scope.candidate = user;
                    $scope.availableOptions = $rootScope.availableOptions;
                    $scope.loading = false;
                })
                .error(function (data) {
                    console.log(data)
                });
    }
});

app.controller('editJoboffersController', function ($scope, $rootScope, $location, $routeParams, jobOffers) {

    var jobofferId = ($routeParams.id) ? parseInt($routeParams.id) : 0;
    $rootScope.joboffer = new Object();
    $rootScope.title = (jobofferId > 0) ? 'Edit' : 'Add';
    $scope.buttonText = (jobofferId > 0) ? 'Update' : 'Add New';
    if (jobofferId > 0)
    {
        jobOffers.getJoboffer(jobofferId)
                .success(function (data) {
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
        jobid
    };

    $scope.saveJoboffer = function (joboffer) {
        $location.path('/joboffers');

        jobOffers.saveJoboffer(joboffer.id, $scope.joboffer);
    };
});

app.controller('applyJoboffersController', function ($scope, $rootScope, $location, $routeParams, jobOffers, Candidates) {
    $scope.Error = false;
    $scope.ErrorText = '';
    var jobofferId = ($routeParams.id) ? parseInt($routeParams.id) : 0;
    var candidateId = ($routeParams.candidateid) ? parseInt($routeParams.candidateid) : 0;
    jobOffers.getJoboffer(jobofferId)
            .success(function (data) {
                $scope.joboffer = data;
                $scope.loading = false;
                Candidates.getById(candidateId)
                        .success(function (data) {
                            console.log(data);
                            $scope.candidate = data;
                            $scope.loading = false;

                        })
                        .error(function (data) {
                            console.log(data)
                        });
            })
            .error(function (data) {
                console.log(data)
            });




    $scope.applyJoboffer = function (jobid, id) {
        Candidates.apply(jobid, id)
                .success(function (data) {
                    console.log(data);
                    $scope.Error = true;
                    $scope.ErrorText = "Application was successfully";
                    if (data.success)
                    {
                        $scope.ErrorText = "Application was successfully";

                    } else {
                        $scope.ErrorText = "Application was not successfully";
                    }
                })
                .error(function () {
                    $scope.Error = true;
                    $scope.ErrorText = "Applcation faild";
                });


    };
});

app.controller('appliedJoboffersController', function ($scope, $rootScope, $location, $routeParams, jobOffers) {
    $scope.Error = false;
    $scope.ErrorText = '';

    var jobofferId = ($routeParams.id) ? parseInt($routeParams.id) : 0;

    jobOffers.getApplied(jobofferId)
            .success(function (data) {
                $scope.data = data;
                $scope.loading = false;

            })
            .error(function (data) {
                console.log(data)
            });

    $scope.selectCandidate = function (id, statusid, jobid) {
        jobOffers.selectCandidate(id, statusid, jobid)
                .success(function (data) {
                    $scope.Error = true;
                    $scope.ErrorText = "Selection was successfully";
                    if (data.success)
                    {
                        jobOffers.getApplied(jobid)
                                .success(function (result) {
                                    $scope.data = result;
                                })
                        $scope.ErrorText = "Selection was successfully";

                    } else {
                        $scope.ErrorText = "Selection was not successfully";
                    }
                })
                .error(function () {
                    $scope.Error = true;
                    $scope.ErrorText = "Selection faild";
                });
    };
});


