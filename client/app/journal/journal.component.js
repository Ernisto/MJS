'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './journal.routes';

export class JournalComponent {
  /*@ngInject*/
  constructor($stateParams, $http, $state, $translate, $rootScope) {
    'ngInject';
    $http.get('/api/journals/abbreviation/' + $stateParams.journal)
      .then(response => {
        this.journal = response.data;
      }, response => {
        if(response.status == 404) {
          $state.go('main');
        }
      });

    $http.get('/api/archives/journals/' + $stateParams.journal)
      .then(response => {
        this.archives = response.data;
      }, response => {
        if(response.status == 404) {
          $state.go('main');
        }
      });
    this.$translate = $translate;
    this.$rootScope = $rootScope;
  }

  showPage(title){
    this.currentPage = title;
  }

  setCurrentArchive(archive) {
    this.$rootScope.archive = archive;
  }
}

export default angular.module('mjsApp.journal', [uiRouter])
  .config(routes)
  .component('journal', {
    template: require('./journal.html'),
    controller: JournalComponent,
    controllerAs: 'journalCtrl'
  })
  .name;
