'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './department.routes';

export class DepartmentComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('mjsApp.department', [uiRouter])
  .config(routes)
  .component('department', {
    template: require('./department.html'),
    controller: DepartmentComponent,
    controllerAs: 'departmentCtrl'
  })
  .name;
