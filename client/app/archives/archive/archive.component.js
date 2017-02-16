'use strict';
const angular = require('angular');

export class archiveComponent {
  /*@ngInject*/
  constructor() {
    this.fileExtension = this.archive.file.split('.').pop();
  }
}

export default angular.module('mjsApp.archive', [])
  .component('archive', {
    template: require('./archive.html'),
    bindings: { archive: '<' },
    controller: archiveComponent,
    controllerAs: 'archiveCtrl'
  })
  .name;
