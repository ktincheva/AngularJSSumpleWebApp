
// inject the Candidates service into our controller
app.controller('candidatesController', function ($scope, $http, Candidates) {

    $scope.candidateData = {};
    $scope.loading = true;
    var getCandidateData = function () {
        Candidates.get()
                .success(function (data) {
                    $scope.candidates = data;
                    $scope.loading = false;
                })
                .error(function (data) {
                    console.log(data)
                });
        ;
    }


    getCandidateData()
    $scope.submitCandidates = function () {
        $scope.loading = true;
        Candidates.save($scope.candidateData)
                .success(function (data) {
                    $scope.candidateData = {};
                    getCandidateData();
                })
                .error(function (data) {
                    console.log(data)
                });
    };


    $scope.deleteCandidate = function (id) {
        $scope.loading = true;

        Candidates.destroy(id)
                .success(function (data) {
                    getCandidateData();
                })
                .error(function (data) {
                    console.log(data);
                });
    };

    
});

app.controller('editCandidatesController', function ($scope, $rootScope, $location, $routeParams, Candidates) {
    var candidateId = ($routeParams.id) ? parseInt($routeParams.id) : 0;
    console.log(candidateId);
    $rootScope.title = (candidateId > 0) ? 'Edit' : 'Add';
    $scope.buttonText = (candidateId > 0) ? 'Update' : 'Add New';
   
    $scope.editCandidate = function (id) {
        $scope.loading = true;
        Candidates.getById(id)
                .success(function (data) {
                   
                    $scope.candidate = data;
                    $scope.loading = false;
                })
                .error(function (data) {
                    console.log(data)
                });
    };
     $scope.editCandidate(candidateId);
     
     $scope.deleteCandidate = function (candidate) {
        if (confirm("Are you sure to delete joboffer number: " + candidate.id) == true)
            Candidates.destroy(candidate.id)
           .success(function (data) {
                    $scope.candidate = data;
                    $scope.loading = false;
                    $location.path('/candidates');
                });
       
    };

    $scope.saveCandidate = function (candidate) {
        Candidates.save(candidate);
        $location.path('/candidates');
    };
});