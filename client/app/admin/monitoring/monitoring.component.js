'use strict';
const angular = require('angular');

export class MonitoringComponent {
  /*@ngInject*/
  constructor() {
    'ngInject';
    this.message = 'Hello';
  }
}

export default angular.module('mjsApp.admin.monitoring', [])
  .component('adminMonitoring', {
    template: require('./monitoring.html'),
    controller: MonitoringComponent,
    controllerAs: 'monitoringCtrl'
  })
  .name;
