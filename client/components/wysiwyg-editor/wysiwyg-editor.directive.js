'use strict';
const angular = require('angular');

export default angular.module('mjsApp.wysiwygEditor', [])
  .directive('wysiwygEditor', function ($q, $translate) {
    return {
      template: require('./wysiwyg-editor.html'),
      restrict: 'EA',
      scope: {
        content: '=',
        onSave: '&',
        onCancel: '&'
      },
      link: function (scope, element, attrs) {
        scope.isReady = false;
        scope.newValue = null;

        scope.hideEditor = function () {
          scope.onCancel();
        };

        scope.updateProperty = function () {
          scope.processing = true;
          var content = CKEDITOR.instances['wysiwyg-editor'].getData();
          scope.onSave({content: content});
        };

        CKEDITOR.replace('wysiwyg-editor', {
          language: $translate.use() != 'kg' ? $translate.use() : 'ru'
        });

        CKEDITOR.instances['wysiwyg-editor'].on('instanceReady', function () {
          scope.embeddingContent = $q(function (resolve, reject) {
            const initialContent = CKEDITOR.instances['wysiwyg-editor'].getData();
            scope.isReady = true;
            scope.contentChanged = false;
            scope.$apply();
            resolve(initialContent);
          });
        });

        CKEDITOR.instances['wysiwyg-editor'].on('change', function () {
          scope.embeddingContent.then(function (initialContent) {
            scope.contentChanged =
              CKEDITOR.instances['wysiwyg-editor'].getData() === initialContent ? false : true;
          }, function (reason) {
            console.log('Failed: ' + reason);
          });
        });
      }
    };
  })
  .name;
