(function(){
  angular.module('Rails5')
    .controller('rails5Controller', rails5Controller);


  function rails5Controller($http){
    var self = this;
    self.names = ["Emil", "Tobias", "Linus"];

    var server = "https://rails5-api-wdir2-demo-backend.herokuapp.com/api";

      $http.get(`${server}/doctors`)
      .then(function(response) {
          self.doctors = response.data;
          console.log(self.doctors[0].name);
      });

      $http.get(`${server}/patients`)
      .then(function(response) {
          self.patients = response.data;
          console.log(self.patients);
      });

    // this.addAppt = function(){
    //   console.log("aadPapt");
    //   self.newAppt =
    //     {
    //       location: self.newAppt.location,
    //       reason: self.newAppt.reason,
    //       day: self.newAppt.day
    //     };
    //     console.log(self.newAppt);
    //
    //   self.newAppt = '';
    // }

    // $http.get("https://rails5-api-wdir2-demo-backend.herokuapp.com/api/appointments")
      $http.get(`${server}/appointments`)
      .then(function(response) {
          self.appointments = response.data;
          console.log(self.appointments);
      });

    this.addAppt = function(){
      console.log("aadPapt");
       var newAppt = {
        location: self.newAppt.location,
        reason: self.newAppt.reason,
        day: self.newAppt.day,
        doctor_id: self.newAppt.doctor_id,
        patient_id: self.newAppt.patient_id
      }
      console.log(newAppt);

      // $http.post("https://rails5-api-wdir2-demo-backend.herokuapp.com/api/appointments", {data: self.newAppt})

      $http({
          method  : 'POST',
          url     : `${server}/appointments`,
          data    : newAppt
       })
      .then(function(response) {
          self.appointments = response.data;
          console.log(self.appointments);
      });
    }
  }
})()
