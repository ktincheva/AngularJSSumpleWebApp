
 app.factory('Candidates', function($http) {

    return {
        // get all the comments
        get : function() {
            
            return $http.get(myConfig.apiUrl+'candidates');
        },
        getById : function(id) {
            
            return $http.get(myConfig.apiUrl+'candidates/'+id);
        },
        

        // save a comment (pass in comment data)
        save : function(candidateData) {
           
            return $http({
                method: 'POST',
                url: myConfig.apiUrl+'candidates',
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                data: $.param(candidateData)
            });
        },

        // destroy a comment
        destroy : function(id) {
            return $http.delete(myConfig.apiUrl+'candidates/' + id);
        }
    }
});

