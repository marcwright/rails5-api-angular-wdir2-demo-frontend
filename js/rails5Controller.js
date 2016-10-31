(function(){
  angular.module('Rails5')
    .controller('rails5Controller', rails5Controller);


  function rails5Controller($http){
    var self = this;

    var server = "https://rails5-api-wdir2-demo-backend.herokuapp.com/api"
    // var server = "https://enigmatic-garden-65625.herokuapp.com/api";
    // var server = "http://localhost:3000/api"

    // Combining 3 data calls into one action from api/get_all
    // Don't need the individual functions to get all of each

    self.getData = function(){
      $http.get(`${server}/get_all`)
      .then(function(response) {
          self.doctors = response.data.doctors;
          self.patients = response.data.patients;
          self.appointments = response.data.appointments;
          // console.log(self.patients);
      });
    }

    // self.getDoctors = function(){
    //   $http.get(`${server}/doctors`)
    //   .then(function(response) {
    //       self.doctors = response.data;
    //       // console.log(self.doctors[0].name);
    //   });
    // }
    //
    // self.getPatients = function(){
    //   $http.get(`${server}/patients`)
    //   .then(function(response) {
    //       self.patients = response.data;
    //       // console.log(self.patients);
    //       return self.patients;
    //   });
    // }
    //
    // self.getAppts = function(){
    //   $http.get(`${server}/appointments`)
    //   .then(function(response) {
    //     self.appointments = response.data;
    //     console.log("Appointments: ", self.appointments);
    //     return self.appointments;
    //   });
    // }

    self.getData();
    // self.getDoctors();
    // self.getPatients();
    // self.getAppts();

    self.getPatientName = function(appt){
      // console.log(self.patients);
      // console.log(appt);
      // console.log("line 43", appt.patient_id);
      for (var i = 0; i < self.patients.length; i++){
        if (appt.patient_id == self.patients[i].id){
          return self.patients[i].name;
        }
      }
    }

    self.addAppt = function(){
       var newAppt = {
        location: self.newAppt.location,
        reason: self.newAppt.reason,
        day: self.newAppt.day,
        doctor_id: self.newAppt.doctor_id,
        patient_id: self.newAppt.patient_id
      }
      console.log(newAppt);

      $http({
          method  : 'POST',
          url     : `${server}/appointments`,
          data    : newAppt
       })
      .then(function(response) {
          self.newAppt = '';
          console.log(self.appointments);
          self.getData();
      });
    }

    self.addPatient = function(){
      var newPatient = {
        name: self.newPatient.name,
        insurance_co: self.newPatient.insurance_co,
        gender: self.newPatient.gender
      }
      console.log(self.patients);
      self.patients.push(newPatient);
      console.log(self.patients);

      $http({
          method  : 'POST',
          url     : `${server}/patients`,
          data    : newPatient
       })
      .then(function(response) {
          self.newPatient = '';
          self.getPatients();
          console.log(self.appointments);
      });
    }

    self.deleteAppt = function(appt){
      var appointment = appt;
      console.log(appt.id);
      $http({
          method  : 'DELETE',
          url     : `${server}/appointments/${appt.id}`
       })
      .then(function(response) {
        console.log("deleted");
        self.getData();
      });
    }
  }
})()
