'use strict';
const angular = require('angular');

/*@ngInject*/
export function adminServiceService($http) {
  // Service logic
  // ...

  var meaningOfLife = 42;

  // Public API here
  return {
    getJournalPropertyLogs() {
      return $http.get(`/api/logs`);
    }
  };
}


export default angular.module('mjsApp.adminService', [])
  .factory('adminSvr', adminServiceService)
  .name;
