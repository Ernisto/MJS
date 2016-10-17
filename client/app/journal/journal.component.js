'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './journal.routes';

export class JournalComponent {
  /*@ngInject*/
  constructor($stateParams, $http, $state, $translate, $rootScope, $sce, Auth) {
    'ngInject';
    $http.get('/api/journals/abbreviation/' + $stateParams.journal)
      .then(response => {
        this.journal = response.data;
        if($state.current.name == 'journal') {
          $state.go('journal.about');
        }
      }, response => {
        if(response.status == 404) {
          $state.go('main');
        }
      });

    $http.get('/api/archives/journals/' + $stateParams.journal)
      .then(response => {
        this.archives = response.data;
      }, response => {
        if(response.status == 404) {
          $state.go('main');
        }
      });

    $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams, options) => {
      if(toState.name == 'journal') {
        $state.go('journal.about');
      }
      this.editingProperty = null;
      CKEDITOR.instances = {};
    });

    $rootScope.$on('$translateChangeSuccess', (event, data) => {
      if(this.editingProperty) {
        CKEDITOR.instances['journal-editor'].setData(this.journal[this.editingProperty.property][this.$translate.use()]);
      }
    });

    this.$translate = $translate;
    this.$rootScope = $rootScope;
    this.$http= $http;
    this.$state = $state;
    this.$sce = $sce;
    this.isAdmin = Auth.isAdminSync;
  }

  showPage(title){
    this.currentPage = title;
  }

  setCurrentArchive(archive) {
    this.$rootScope.archive = archive;
  }

  renderHTML(html) {
    return this.$sce.trustAsHtml(html);
  }

  editProperty(property) {
    this.editingProperty = {
      property: property,
      content: this.journal[property][this.$translate.use()]
    };
    if(!CKEDITOR.instances['journal-editor']) {
      CKEDITOR.replace( 'journal-editor', {
        language: 'ru'
      });
    }
  }

  updateProperty(property) {
    this.journal[property][this.$translate.use()] = CKEDITOR.instances['journal-editor'].getData();
    this.$http.put('/api/journals/' + this.journal._id, this.journal)
      .then(response => {
        this.editingProperty = null;
      }, response => {
        if(response.status == 404) {
          this.editingProperty = null;
        }
      });
  }
}

export default angular.module('mjsApp.journal', [uiRouter])
  .config(routes)
  .component('journal', {
    template: require('./journal.html'),
    controller: JournalComponent,
    controllerAs: 'journalCtrl'
  })
  .name;
