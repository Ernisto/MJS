'use strict';

export default function ($stateProvider) {
  'ngInject';

  const journalProperty = require('./journal-property.html');
  const oldArchives = require('./partials/old-archives.html');
  const lastVolumeCover = require('./partials/last-volume-cover.html');

  $stateProvider
    .state('journal', {
      url: '/journal/:journal',
      template: '<journal journal="$resolve.journal"></journal>',
      resolve: {
        journal: function ($state, $stateParams, journalSvr) {
          let cachedJournal = journalSvr.getJournal($stateParams.journal);

          if (cachedJournal) {
            return cachedJournal;
          } else {
            return journalSvr.getJournalByAbbreviation($stateParams.journal)
              .then(response => {
                journalSvr.setJournal(response);
                return response;
              }, response => {
                $state.go('main');
              });
          }
        }
      },
      redirectTo: 'journal.about',
      data: {
        layout: 'default',
        bodyClass: ''
      }
    })
    .state('journal.about', {
      url: '/about',
      stateName: 'about',
      template: journalProperty
    })
    .state('journal.aim-scope', {
      url: '/aim-scope',
      stateName: 'aim-scope',
      template: journalProperty
    })
    .state('journal.terms-conditions', {
      url: '/terms-conditions',
      stateName: 'terms-conditions',
      template: journalProperty
    })
    .state('journal.abstract-index', {
      url: '/abstract-index',
      stateName: 'abstract-index',
      template: journalProperty
    })
    .state('journal.editorial-board', {
      url: '/editorial-board',
      stateName: 'editorial-board',
      template: journalProperty
    })
    .state('journal.last-volume-cover', {
      url: '/last-volume-cover',
      stateName: 'last-volume-cover',
      template: lastVolumeCover
    })
    .state('journal.archives', {
      url: '/archives',
      stateName: 'archives',
      template: '<archives archives="$resolve.archives"></archives>',
      resolve: {
        archives: function ($state, $stateParams, archiveSvr, journal) {
          let cachedArchives = archiveSvr.getArchivesByJournalId($stateParams.journal, true);

          if (cachedArchives) {
            return cachedArchives;
          } else {
            return archiveSvr.getArchivesByJournalId(journal._id, false)
              .then(response => {
                archiveSvr.setJournalArchives($stateParams.journal, response.data);
                return response.data;
              }, response => {
                $state.go('journal');
              });
          }
        }
      }
    })
    .state('journal.archive', {
      url: '/archives/:id',
      template: '<archive archive="$resolve.archive"></archive>',
      resolve: {
        archive: function ($state, $stateParams, archiveSvr) {
          let archiveFromCache = archiveSvr.getArchiveById($stateParams.id, true);

          if(archiveFromCache) {
            return archiveFromCache;
          } else {
            return archiveSvr.getArchiveById($stateParams.id, false)
              .then(response => {
                archiveSvr.setArchive(response.data);
                return response.data;
              }, response => {
                if (response.status == 404) {
                  $state.go('main');
                }
              });
          }
        }
      }
    })
    .state('journal.old-archives', {
      url: '/old-archives',
      stateName: 'old-archives',
      template: oldArchives
    })
    .state('journal.rules', {
      url: '/rules',
      stateName: 'rules',
      template: journalProperty
    })
    .state('journal.instructions', {
      url: '/instructions',
      stateName: 'instructions',
      template: journalProperty
    });
}
