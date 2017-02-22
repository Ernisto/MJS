'use strict';
const angular = require('angular');

export class UsersComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('mjsApp.admin.users', [])
  .component('adminUsers', {
    template: require('./users.html'),
    controller: UsersComponent,
    controllerAs: 'usersCtrl'
  })
  .name;
