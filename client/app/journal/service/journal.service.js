'use strict';
const angular = require('angular');

/*@ngInject*/
export function journalService($http) {
  var journalsCache = {};

  return {
    getJournal(abbreviation) {
      return journalsCache[abbreviation];
    },
    setJournal(journal) {
      journalsCache[journal.abbreviation] = journal;
    },
    getJournalByAbbreviation(abbreviation) {
      return $http.get(`/api/journals/abbreviation/${abbreviation}`)
        .then((response) => {
          return response.data;
        });
    },
    updateJournalProperty(journalPropertyId, update) {
      return $http.patch(`/api/journal-properties/${journalPropertyId}`, update);
    },
    getJournals(fromCache) {
      return fromCache ? journalsCache['main-page'] : $http.get(`/api/journals`);
    },
    setJournals(journals) {
      journalsCache['main-page'] = journals;
    }
  };
}


export default angular.module('mjsApp.journalService', [])
  .factory('journalSvr', journalService)
  .name;
