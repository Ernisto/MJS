'use strict';
const angular = require('angular');

export class ArchivesComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('mjsApp.admin.archives', [])
  .component('adminArchives', {
    template: require('./archives.html'),
    controller: ArchivesComponent,
    controllerAs: 'archivesCtrl'
  })
  .name;
