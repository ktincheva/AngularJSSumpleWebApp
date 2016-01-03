
/*
 * Repo (model)  tnat support experince data 
 */
app.factory('Experience', function ($http) {
    return {
        getExperience: function () {
            return $http.get(myConfig.apiUrl+'experience')
        }
    }
});
