'use strict';
const angular = require('angular');

/*@ngInject*/
export function archiveService($http, $stateParams) {
  var archivesCache = {};

  return {
    getArchives() {
      return $http.get(`/api/archives`);
    },
    getArchivesByJournalId(journalId, fromCache) {
      return fromCache ? archivesCache[journalId] : $http.get(`/api/archives/journals/${journalId}`);
    },
    setJournalArchives(journalId, archives) {
      archivesCache[journalId] = archives;
    },
    getArchiveById(archiveId, fromCache) {
      if (fromCache) {
        return archivesCache[$stateParams.journal] ?
          archivesCache[$stateParams.journal]
            .filter((archive => archive._id == archiveId))[0] : null;
      } else {
        return $http.get(`/api/archives/${archiveId}`);
      }
    },
    setArchive(archive) {
      archivesCache[archive._id] = archive;
    }
  };
}


export default angular.module('mjsApp.archiveService', [])
  .factory('archiveSvr', archiveService)
  .name;
