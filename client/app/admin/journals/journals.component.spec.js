'use strict';

describe('Component: JournalsComponent', function() {
  // load the controller's module
  beforeEach(module('mjsApp.admin.journals'));

  var JournalsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    JournalsComponent = $componentController('journals', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
