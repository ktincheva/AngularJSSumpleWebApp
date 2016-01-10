
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
            console.log(candidateData);
            return $http({
                method: 'POST',
                url: myConfig.apiUrl+'candidates',
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                data: $.param(candidateData)
            });
        },
        apply : function(jobid, id) {
           
            return $http({
                method: 'POST',
                url: myConfig.apiUrl+'apply',
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                data: $.param({'jobid': jobid, 'id':id})
            });
        },
        // destroy a comment
        destroy : function(id) {
            return $http.delete(myConfig.apiUrl+'candidates/' + id);
        }
    }
});

