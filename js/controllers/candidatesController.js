
// inject the Candidates service into our controller
app.controller('candidatesController', function ($scope, $http, Candidates) {

   $scope.candidateData = {};

    $scope.loading = true;


    Candidates.get()
            .success(function (data) {
                $scope.candidates = data;
                $scope.loading = false;
            })
            .error(function (data) {
                console.log(data)
            });


    $scope.submitCandidates = function () {
        $scope.loading = true;

        Candidates.save($scope.candidateData)
                .success(function (data) {
                    // if successful, we'll need to refresh the comment list
                    $scope.candidateData = {};
                    Candidates.get()
                            .success(function (getData) {
                                $scope.candidates = getData;
                                $scope.loading = false;
                            });

                })
                .error(function (data) {
                    console.log(data)
                });
    };


    $scope.deleteCandidate = function (id) {
        $scope.loading = true;

        Candidates.destroy(id)
                .success(function (data) {
                    Candidates.get()
                            .success(function (getData) {
                                $scope.candidates = getData;
                                $scope.loading = false;
                            });

                })
                .error(function (data) {
                    console.log(data);
                });
    };

});