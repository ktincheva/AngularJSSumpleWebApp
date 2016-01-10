/*
 * Services to manage Joboffers
 * @param @jobofferId 
 * @param jobOfferData data which comming from joboffers form
 */

app.factory("jobOffers", ['$http', function ($http) {
        var obj = {};
        obj.getJoboffers = function () {
            return $http.get(myConfig.apiUrl + 'joboffers');
        }
        obj.getJoboffer = function (id) {
            return $http.get(myConfig.apiUrl + 'joboffers/' + id);
        }
        obj.saveJoboffer = function (id, jobofferData) {
            return $http({
                method: 'POST',
                url: myConfig.apiUrl+'joboffers',
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                data:  $.param(jobofferData)
         
            });
            
        };

        obj.deleteJoboffer = function (id) {
            return $http.delete(myConfig.apiUrl + 'joboffers/' + id).then(function (status) {
                return status.data;
            });
        };
        
        obj.getApplied = function(id)
        {
            return $http({
                method: 'POST',
                url: myConfig.apiUrl+'applied',
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                data:  $.param({'jobid':id})
            });
        }
        obj.selectCandidate = function(applicationid, statusid, jobofferid)
        {
            console.log(applicationid, statusid, jobofferid);
            return $http({
                method: 'POST',
                url: myConfig.apiUrl+'selectCandidate',
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                data:  $.param({'jobid':jobofferid, 'appid':applicationid, 'statusid':statusid})
            });
        }
        return obj;
    }]);
 