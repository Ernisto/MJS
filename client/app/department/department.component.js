'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './department.routes';

export class DepartmentComponent {

  constructor($stateParams) {
    'ngInject';

    this.department = $stateParams.department;
  }
}

export default angular.module('mjsApp.department', [uiRouter])
  .config(routes)
  .component('department', {
    template: require('./department.html'),
    controller: DepartmentComponent,
    controllerAs: 'deptCtrl'
  })
  .name;
