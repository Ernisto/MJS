'use strict';

describe('Directive: progressBar', function() {
  // load the directive's module and view
  beforeEach(module('mjsApp.progressBar'));
  beforeEach(module('components/progress-bar/progress-bar.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<progress-bar></progress-bar>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the progressBar directive');
  }));
});
