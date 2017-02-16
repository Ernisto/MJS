'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './journal.routes';

export class JournalComponent {
  /*@ngInject*/
  constructor($state, $scope, $translate, $rootScope, $sce, Auth, Modal, journalSvr) {
    'ngInject';

    this.backgroundStyle = this.getBackgroundStyle(this.journal.color);

    this.$translate = $translate;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$sce = $sce;
    this.isAdmin = Auth.isAdminSync;
    this.Modal = Modal;
    this.$scope = $scope;
    this.property = this.getProperty(this.$state.current.stateName);
    this.journalSvr = journalSvr;

    $rootScope.$on('$translateChangeSuccess', (event, data) => {
      this.editorContent = undefined;
    });
  }

  setPropertyByTitle(propertyTitle) {
    this.property = this.getProperty(propertyTitle);
    this.editorContent = null;
  }

  editCurrentProperty() {
    this.editorContent = this.property.content[this.$translate.use()];
  }

  getProperty(propertyTitle) {
    let props = this.journal['journal-properties'];

    for (let prop in props) {
      if (props[prop].title == propertyTitle) {
        return props[prop];
      }
    }
  }

  getTrustedHTML(html) {
    return this.$sce.trustAsHtml(html);
  }

  hideEditor() {
    this.editorContent = undefined;
  }

  updateProperty(content) {
    var update = {
      patches: [{
        op: "replace",
        path: `/content/${this.$translate.use()}`,
        value: content
      }]
    };
    this.journalSvr.updateJournalProperty(this.property._id, update)
      .then(response => {
        let property = response.data;
        this.journal['journal-properties'].forEach((prop) => {
          if(prop._id == property._id) {
            prop.content = property.content;
          }
        });
        this.editorContent = null;
      }, response => {

      });
  }

  getBackgroundStyle(color) {
    const rightColor = shadeColor(color, 0.1);
    const leftColor = shadeColor(color, 0.3);

    function shadeColor(color, percent) {
      var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
      return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
    }

    return `
      background: ${color};
      background: -webkit-linear-gradient(to left, ${rightColor} , ${leftColor});
      background: linear-gradient(to left, ${rightColor} , ${leftColor});
    `;
  }
}

export default angular.module('mjsApp.journal', [uiRouter])
  .config(routes)
  .component('journal', {
    template: require('./journal.html'),
    controller: JournalComponent,
    controllerAs: 'journalCtrl',
    bindings: {journal: '<'}
  })
  .name;
