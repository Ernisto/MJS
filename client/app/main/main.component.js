import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  /*@ngInject*/
  constructor($http, $scope, $translate, socket, journalSvr) {
    this.$http = $http;
    this.$translate = $translate;
    this.socket = socket;
    this.layout = 'main';
    this.journalSvr = journalSvr;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('journal');
    });
  }

  $onInit() {
    this.journalSvr.getJournals(true) == null ?
      this.journalSvr.getJournals(false)
        .then(response => {
          this.journalSvr.setJournals(response.data);
          this.journals = response.data;
        }) :
      this.journals = this.journalSvr.getJournals(true);
  }
}

export default angular.module('mjsApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
