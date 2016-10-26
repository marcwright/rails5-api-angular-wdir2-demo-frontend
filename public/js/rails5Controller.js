(function(){
  angular.module('Rails5')
    .controller('rails5Controller', rails5Controller);


  function rails5Controller($http){

    var self = this;

    $http.get("https://boiling-savannah-76512.herokuapp.com/api/appointments")
    .then(function(response) {
        self.appointments = response.data;
        console.log(self.appointments);
    });
  }
})()
