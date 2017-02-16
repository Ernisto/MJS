'use strict';
const angular = require('angular');

export class archiveComponent {
  /*@ngInject*/
  constructor($state, $stateParams, archiveSvr) {
    'ngInject';
    this.years = [];
    this.archives.forEach((archive) => {
      let year = new Date(archive.date).getFullYear();
      this.years.indexOf(year) == -1 ? this.years.push(year) : null;
    });
  }
}

export default angular.module('mjsApp.archives', [])
  .component('archives', {
    template: require('./archives.html'),
    controller: archiveComponent,
    controllerAs: 'archiveCtrl',
    bindings: {archives: '<'}
  })
  .name;
