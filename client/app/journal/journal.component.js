'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './journal.routes';

export class JournalComponent {
  /*@ngInject*/
  constructor($stateParams, $http, $state) {
    'ngInject';
    $http.get('/api/journals/abbreviation/' + $stateParams.journal)
      .then(response => {
        this.journal = response.data;
      }, response => {
        if(response.status == 404) {
          $state.go('main');
        }
      });
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
