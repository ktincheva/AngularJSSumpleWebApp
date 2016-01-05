
// inject the Candidates service into our controller
app.controller('candidatesController', function ($scope, $http, Candidates) {

    $scope.candidateData = {};
    $scope.loading = true;
    var getCandidateData = function () {
        Candidates.get()
                .success(function (getData) {
                    console.log(getData);
                    $scope.candidates = getData;
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