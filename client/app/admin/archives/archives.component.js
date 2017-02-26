'use strict';
const angular = require('angular');
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/sortable';

export class ArchivesComponent {
  /*@ngInject*/
  constructor(archiveSvr, journalSvr, $uibModal, $rootScope, $timeout) {
    'ngInject';

    this.$uibModal = $uibModal;
    this.$timeout = $timeout;
    this.$rootScope = $rootScope;
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

    journalSvr.getJournals()
      .then((res) => this.journals = res.data);
  }

  edit(archive) {
    var currentArchive = angular.copy(archive);
    var modalScope = this.$rootScope.$new();

    currentArchive.date = new Date(currentArchive.date);
    angular.extend(modalScope, {
      archive: currentArchive,
      journals: this.journals,
      remove: (item, collection) => {
        var index = collection.indexOf(item);
        collection.splice(index, 1);
      },
      editItem: item => console.log(item),
      add: (item, collection) => {
        if(item) {
          collection.indexOf(item) > -1 ? null : collection.push(item);
        }
      },
      submit: archive => {
        console.log(archive);
      },
      title: 'Edit Archive'
    });

    this.$uibModal.open({
      animation: true,
      template: require('./edit.html'),
      windowClass: 'modal-default',
      appendTo: angular.element(document.querySelector('.modal-parent')),
      size: 'lg',
      scope: modalScope
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
