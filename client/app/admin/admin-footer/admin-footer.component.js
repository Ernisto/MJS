'use strict';
const angular = require('angular');

export class adminFooterComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'World';
  }
}

export default angular.module('mjsApp.admin-footer', [])
  .component('adminFooter', {
    template: require('./admin-footer.html'),
    controller: adminFooterComponent
  })
  .name;
