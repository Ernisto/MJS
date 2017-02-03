'use strict';

describe('Directive: wysiwygEditor', function() {
  // load the directive's module and view
  beforeEach(module('mjsApp.wysiwygEditor'));
  beforeEach(module('components/wysiwyg-editor/wysiwyg-editor.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<wysiwyg-editor></wysiwyg-editor>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the wysiwygEditor directive');
  }));
});
