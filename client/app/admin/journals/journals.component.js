'use strict';
const angular = require('angular');

export class JournalsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('mjsApp.admin.journals', [])
  .component('adminJournals', {
    template: require('./journals.html'),
    controller: JournalsComponent,
    controllerAs: 'journalsCtrl'
  })
  .name;
