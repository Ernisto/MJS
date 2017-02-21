'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './logs.routes';

import moment from 'moment';

export class LogsComponent {
  /*@ngInject*/
  constructor(SweetAlert, $filter, adminSvr, journalSvr, $sce, $uibModal, $rootScope) {
    this.SweetAlert = SweetAlert;
    this.$uibModal = $uibModal;
    this.$filter = $filter;
    this.$sce = $sce;
    this.$rootScope = $rootScope;
    this.adminSvr = adminSvr;
    this.journalSvr = journalSvr;
    this.config = {
      "columns": [
        null,
        null,
        null,
        null,
        {"orderData": 5},
        {"visible": false},
        {"orderable": false},
        {"orderable": false}
      ]
    };

    adminSvr.getJournalPropertyLogs()
      .then((res) => {
        this.logs = res.data;
        if (!res.fromCache) {
          this.adminSvr.setJournalPropertyLogs(this.logs)
        }
      });
  }

  $onInit() {

  }

  $onDestroy() {
    this.adminSvr.setJournalPropertyLogs(undefined);
  }

  getNormalDate(date) {
    return `
      <div class="journal-property__date">${moment(date).format('D MMM YYYY')}</div>
      <div class="journal-property__time">${moment(date).format('HH:mm:ss')}</div>`;
  }

  previewLogContent(logId) {
    this.adminSvr.getLogById(logId)
      .then(res => {

        var log = res.data;
        if (!res.fromCache) {
          this.adminSvr.setLog(log)
        }

        var modalScope = this.$rootScope.$new();
        angular.extend(modalScope, {
          content: this.$sce.trustAsHtml(log.content)
        });

        this.$uibModal.open({
          animation: true,
          template: require('./preview.html'),
          windowClass: 'modal-default',
          appendTo: angular.element(document.querySelector('.modal-parent')),
          size: 'lg',
          scope: modalScope
        });
      });
  }

  rollback(logId) {
    this.SweetAlert.swal({
      title: this.$filter('translate')('CONFIRMATION'),
      text: this.$filter('translate')('ROLLBACK_WARN'),
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: this.$filter('translate')('ROLLBACK_AGREE'),
      cancelButtonText: this.$filter('translate')('CANCEL'),
      closeOnConfirm: false
    }, (isConfirmed) => {
      if (isConfirmed) {
        this.adminSvr.getLogById(logId)
          .then(res => {
            var log = res.data;

            this.journalSvr.updateJournalProperty(log.property._id, {
              lang: log.language,
              value: log.content
            }).then((response) => {
              response.data.sameContent ?
                this.SweetAlert.swal(this.$filter('translate')('CHOOSE_ANOTHER_ROLLBACK_POINT'), this.$filter('translate')('CONTENT_NOT_CHANGED'), "error") :
                this.SweetAlert.swal(this.$filter('translate')('ROLLED_BACK'), this.$filter('translate')('ROLLED_BACK_SUCCESS'), "success");
            })
          });
      }
    })
  }
}

export default angular.module('mjsApp.logs', [uiRouter])
  .config(routes)
  .component('logs', {
    template: require('./logs.html'),
    controller: LogsComponent,
    controllerAs: 'logsCtrl'
  })
  .name;
