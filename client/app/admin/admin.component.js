'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './admin.routes';

import './config';

export class AdminComponent {
  /*@ngInject*/
  constructor(User, SweetAlert, $filter, $state, adminSvr, $timeout) {
    // Use the User $resource to fetch all users

    this.users = User.query();
    this.SweetAlert = SweetAlert;
    this.$filter = $filter;
    this.$state = $state;
    adminSvr.getJournalPropertyLogs()
      .then(function (response) {
      });

    /** Apply layout fixes on load **/
    angular.element(document).ready(function () {
      $timeout(function () {
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
      });
    });
  }

  $onInit() {
    this.isReady = true;
  }

  $onDestroy() {
    this.isReady = false;
  }

  delete(user) {
    this.SweetAlert.swal({
      title: this.$filter('translate')('CONFIRMATION'),
      text: this.$filter('translate')('USER_WARNING'),
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: this.$filter('translate')('DELETE_AGREE'),
      cancelButtonText: this.$filter('translate')('CANCEL'),
      closeOnConfirm: false
    }, (isConfirmed) => {
      if (isConfirmed) {

        user.$remove();
        this.users.splice(this.users.indexOf(user), 1);
        this.SweetAlert.swal(this.$filter('translate')('DELETED'), this.$filter('translate')('ACCOUNT_DELETED'), "success");
      }
    });
  }

}

export default angular.module('mjsApp.admin', [uiRouter])
  .config(routes)
  .component('admin', {
    template: require('./admin.html'),
    controller: AdminComponent,
    controllerAs: 'adminCtrl'
  })
  .name;
