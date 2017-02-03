'use strict';
const angular = require('angular');

export default angular.module('mjsApp.wysiwygEditor', [])
  .directive('wysiwygEditor', function () {
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

        scope.hideEditor = function () {
          scope.onCancel();
        };

        scope.updateProperty = function () {
          scope.processing = true;
          var content = CKEDITOR.instances['wysiwyg-editor'].getData();
          scope.onSave({content: content});
        };

        scope.$watchCollection('content', function (newValue, oldValue) {
          CKEDITOR.instances['wysiwyg-editor'].setData(newValue);
        }, true);

        CKEDITOR.replace('wysiwyg-editor', {
          language: 'en'
        });

        CKEDITOR.instances['wysiwyg-editor'].on('instanceReady', function () {
          scope.isReady = true;
          scope.initialContent = CKEDITOR.instances['wysiwyg-editor'].getData();
          scope.contentChanged = false;
          scope.$apply();
        });

        CKEDITOR.instances['wysiwyg-editor'].on('change', function () {
          scope.contentChanged =
            CKEDITOR.instances['wysiwyg-editor'].getData() === scope.initialContent ?
              false : true;
          scope.$apply();
        });
      }
    };
  })
  .name;
