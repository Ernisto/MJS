'use strict';

describe('Component: archive', function() {
  // load the component's module
  beforeEach(module('mjsApp.archive'));

  var archiveComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    archiveComponent = $componentController('archive', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
