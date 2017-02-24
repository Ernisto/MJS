'use strict';
const angular = require('angular');

export class ArchivesComponent {
  /*@ngInject*/
  constructor(archiveSvr) {
    'ngInject';

    this.archiveSvr = archiveSvr;
    this.config = {
      "columns": [
        null,
        null,
        null,
        {"orderData": 4},
        {"visible": false},
        {"orderable": false},
        {"orderable": false}
      ],
      "initComplete": () => {
        this.dtRendered = true;
      }
    };

    archiveSvr.getArchives()
      .then((res) => {
        this.archives = res.data;
      });
  }
}

export default angular.module('mjsApp.admin.archives', [])
  .component('adminArchives', {
    template: require('./archives.html'),
    controller: ArchivesComponent,
    controllerAs: 'archivesCtrl'
  })
  .name;
