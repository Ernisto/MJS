'use strict';
const angular = require('angular');

/*@ngInject*/
export function adminServiceService($http, $q) {
  let journalPropertyLogs = undefined;

  // Public API here
  return {
    setJournalPropertyLogs(logs) {
      journalPropertyLogs = logs;
    },
    getJournalPropertyLogs() {
      return journalPropertyLogs ?
        $q(resolve => resolve({data: journalPropertyLogs, fromCache: true})) :
        $http.get(`/api/logs`).then(response => ({data: response.data, fromCache: false}));
    },
    setLog(log) {
      journalPropertyLogs.forEach(jPLog => {
        if (log._id == jPLog._id) {
          jPLog.content = log.content;
        }
      })
    },
    getLogById(logId) {
      var log = journalPropertyLogs.filter(log => (log._id == logId && log.content))[0];
      return log ?
        $q(resolve => resolve({data: log, fromCache: true})) :
        $http.get(`/api/logs/${logId}`).then(response => {
          let log = response.data;

          var cachedLog = journalPropertyLogs.filter(jPLog => log._id == jPLog._id)[0];
          cachedLog.content = log.content;

          return {
            data: cachedLog,
            fromCache: false
          }
        });
    }
  };
}

export default angular.module('mjsApp.adminService', [])
  .factory('adminSvr', adminServiceService)
  .name;
