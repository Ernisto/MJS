'use strict';
const angular = require('angular');

export class adminNavbarComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'World';
  }
}

export default angular.module('mjsApp.admin-navbar', [])
  .component('adminNavbar', {
    template: require('./admin-navbar.html'),
    controller: adminNavbarComponent
  })
  .name;
