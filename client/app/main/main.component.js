import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('journal');
    });
  }

  $onInit() {
    this.$http.get('/api/journals')
      .then(response => {
        this.journals = response.data;
        this.socket.syncUpdates('journal', this.journals);
      });
  }
}

export default angular.module('mjsApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
