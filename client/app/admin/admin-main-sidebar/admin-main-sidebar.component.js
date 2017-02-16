'use strict';
const angular = require('angular');

export class adminMainSidebarComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'World';
  }
}

export default angular.module('mjsApp.admin-main-sidebar', [])
  .component('adminMainSidebar', {
    template: require('./admin-main-sidebar.html'),
    controller: adminMainSidebarComponent
  })
  .name;
