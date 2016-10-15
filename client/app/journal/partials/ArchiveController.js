'use strict';

export default class ArchiveController {
  /*@ngInject*/
  constructor(SweetAlert, $filter, $http, $stateParams, $rootScope) {
    this.SweetAlert = SweetAlert;
    this.$filter = $filter;
    this.$http = $http;

    if ($rootScope.archive && $rootScope.archive._id == $stateParams.id) {
      this.archive = $rootScope.archive;
      this.fileExtension = this.archive.file.split('.').pop();
    } else {
      $http.get('/api/archives/' + $stateParams.id)
        .then(response => {
          this.archive = response.data;
          this.fileExtension = this.archive.file.split('.').pop();
        }, response => {
          if (response.status == 404) {
            $state.go('main');
          }
        });
    }
  }
}
